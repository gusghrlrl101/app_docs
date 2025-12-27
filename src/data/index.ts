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
    path: 'after-taste',
    privacyUpdated: '2025-12-27',
    termsUpdated: '2025-12-27',
  },
  {
    path: 'pocket-ai',
    privacyUpdated: '2025-12-27',
    termsUpdated: '2025-12-27',
  },
];
