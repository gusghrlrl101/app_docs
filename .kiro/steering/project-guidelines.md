# App Docs 프로젝트 가이드라인

## 프로젝트 개요

여러 앱의 문서를 관리합니다. 다국어를 지원합니다.
- 개인정보처리방침
- 이용약관

## 기술 스택

- React 19 + TypeScript
- Vite (빌드 도구)
- react-router-dom (라우팅)
- i18next + react-i18next (다국어 지원)
- CSS Modules (스타일링)

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트
├── pages/          # 라우트별 페이지 컴포넌트
├── data/           # 앱 설정 및 공통 데이터
├── hooks/          # 커스텀 React 훅
├── i18n/           # 다국어 설정 및 번역 파일
│   └── locales/    # 언어별 JSON 번역 파일
└── App.tsx         # 라우팅 설정
```

## 코딩 규칙

### 컴포넌트 작성

- 함수형 컴포넌트 사용 (function 키워드)
- Props는 interface로 정의
- 파일명과 컴포넌트명 일치 (PascalCase)

```typescript
interface Props {
  appId: string;
  contactEmail: string;
}

export function ComponentName({ appId, contactEmail }: Props) {
  // ...
}
```

### 스타일링

- CSS Modules 사용 (`*.module.css`)
- 클래스명은 camelCase
- 공통 스타일은 `PrivacyPolicy.module.css` 참조

```typescript
import styles from './Component.module.css';
// 사용: className={styles.container}
```

### 다국어 (i18n)

- 모든 텍스트는 번역 키 사용
- `useTranslation` 훅으로 접근
- 번역 파일: `src/i18n/locales/{lang}.json`

```typescript
const { t } = useTranslation();
// 사용: t('common.privacyPolicy')
```

### 번역 파일 구조

```json
{
  "common": { /* 공통 UI 텍스트 */ },
  "apps": {
    "{app-id}": {
      "name": "앱 이름",
      "description": "앱 설명"
    }
  },
  "privacy": {
    "{app-id}": {
      "sections": [{ "title": "...", "content": "..." }]
    }
  },
  "terms": {
    "{app-id}": {
      "sections": [{ "title": "...", "content": "..." }]
    }
  }
}
```

## 새 앱 추가 방법

1. `src/data/index.ts`에 앱 설정 추가:
```typescript
{
  path: 'app-id',
  privacyUpdated: 'YYYY-MM-DD',
  termsUpdated: 'YYYY-MM-DD',
}
```

2. 모든 번역 파일(`src/i18n/locales/*.json`)에 추가:
   - `apps.{app-id}` - 앱 이름/설명
   - `privacy.{app-id}` - 개인정보처리방침 섹션
   - `terms.{app-id}` - 이용약관 섹션

## 라우팅 구조

- `/` - 앱 목록 (Home)
- `/:appId` - 앱 상세 페이지
- `/:appId/privacy` - 개인정보처리방침
- `/:appId/terms` - 이용약관

쿼리 파라미터 `?lang=ko`로 언어 지정 가능

## 지원 언어

ko, en, ja, zh, es, fr, it, ru, pt, de (총 10개)

## 빌드 & 배포

```bash
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 (번역 검증 포함)
npm run check:i18n # 번역 파일 검증
```

## 주의사항

- 새 번역 키 추가 시 모든 10개 언어 파일에 추가 필요
- `npm run check:i18n`으로 누락된 번역 확인
- 앱 ID는 kebab-case 사용 (예: `after-taste`)
