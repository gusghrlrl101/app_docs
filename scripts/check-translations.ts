/**
 * 번역 키 누락 검증 스크립트
 * 실행: npx tsx scripts/check-translations.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '../src/i18n/locales');

// 모든 키를 플랫하게 추출 (nested object → dot notation)
function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// 메인 검증 로직
function checkTranslations() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  const translations: Record<string, string[]> = {};
  
  // 각 언어 파일의 키 추출
  for (const file of files) {
    const lang = file.replace('.json', '');
    const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf-8'));
    translations[lang] = flattenKeys(content).sort();
  }
  
  // 기준 언어 (한국어)
  const baseLang = 'ko';
  const baseKeys = new Set(translations[baseLang]);
  
  let hasError = false;
  const errors: string[] = [];
  
  console.log(`\n🔍 번역 키 검증 시작 (기준: ${baseLang})\n`);
  console.log(`📁 검사 대상: ${files.join(', ')}\n`);
  
  for (const [lang, keys] of Object.entries(translations)) {
    if (lang === baseLang) continue;
    
    const langKeys = new Set(keys);
    
    // 기준 언어에는 있지만 해당 언어에 없는 키
    const missing = [...baseKeys].filter(k => !langKeys.has(k));
    
    // 해당 언어에는 있지만 기준 언어에 없는 키
    const extra = [...langKeys].filter(k => !baseKeys.has(k));
    
    if (missing.length > 0 || extra.length > 0) {
      hasError = true;
      console.log(`❌ ${lang}.json:`);
      
      if (missing.length > 0) {
        console.log(`   누락된 키 (${missing.length}개):`);
        missing.forEach(k => {
          console.log(`     - ${k}`);
          errors.push(`[${lang}] 누락: ${k}`);
        });
      }
      
      if (extra.length > 0) {
        console.log(`   불필요한 키 (${extra.length}개):`);
        extra.forEach(k => {
          console.log(`     + ${k}`);
          errors.push(`[${lang}] 불필요: ${k}`);
        });
      }
      console.log('');
    } else {
      console.log(`✅ ${lang}.json: 모든 키 일치`);
    }
  }
  
  console.log('');
  
  if (hasError) {
    console.log(`\n❌ 총 ${errors.length}개의 문제가 발견되었습니다.\n`);
    process.exit(1);
  } else {
    console.log(`\n✅ 모든 번역 파일이 동기화되어 있습니다!\n`);
    process.exit(0);
  }
}

checkTranslations();
