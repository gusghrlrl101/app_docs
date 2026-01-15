import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { apps } from '../src/data';

const DIST_DIR = join(process.cwd(), 'dist');
const PORT = 4173;

// Pre-render할 경로 생성
function getRoutes(): string[] {
  const routes: string[] = ['/'];
  
  for (const app of apps) {
    routes.push(`/${app.path}`);
    routes.push(`/${app.path}/privacy`);
    routes.push(`/${app.path}/terms`);
  }
  
  return routes;
}

// 간단한 정적 파일 서버
function createStaticServer() {
  return createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url || '/');
    
    // SPA fallback: 파일이 없으면 index.html 반환
    if (!existsSync(filePath) || !filePath.includes('.')) {
      filePath = join(DIST_DIR, 'index.html');
    }
    
    try {
      const content = readFileSync(filePath);
      const ext = filePath.split('.').pop();
      const contentTypes: Record<string, string> = {
        html: 'text/html',
        js: 'application/javascript',
        css: 'text/css',
        svg: 'image/svg+xml',
        json: 'application/json',
      };
      res.writeHead(200, { 'Content-Type': contentTypes[ext || 'html'] || 'text/plain' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function prerender() {
  const routes = getRoutes();
  console.log(`\n🚀 Pre-rendering ${routes.length} pages...\n`);

  // 정적 서버 시작
  const server = createStaticServer();
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  console.log(`📡 Server running at http://localhost:${PORT}`);

  // Puppeteer 브라우저 시작 (CI 환경에서는 sandbox 비활성화 필요)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`  Rendering: ${route}`);

    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // 렌더링 완료 대기 (i18n 로딩 등)
    await page.waitForSelector('#root > *', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 500));

    // HTML 추출
    const html = await page.content();

    // 파일 저장
    const outputPath = route === '/'
      ? join(DIST_DIR, 'index.html')
      : join(DIST_DIR, route, 'index.html');
    
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    
    writeFileSync(outputPath, html);
  }

  await browser.close();
  server.close();

  console.log(`\n✅ Pre-rendering complete! ${routes.length} pages generated.\n`);
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
