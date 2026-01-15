// 공통 정보
export const CONTACT_EMAIL = 'gusghrlrl101@gmail.com';

export interface AppConfig {
  path: string;
  privacyUpdated: string;
  termsUpdated: string;
}

// 새 앱 추가 시 여기에 추가하면 됩니다
export const apps: AppConfig[] = [
  {
    path: 'pocket-ai',
    privacyUpdated: '2026-01-06',
    termsUpdated: '2026-01-06',
  },
  {
    path: 'after-taste',
    privacyUpdated: '2025-12-27',
    termsUpdated: '2025-12-27',
  },
];
