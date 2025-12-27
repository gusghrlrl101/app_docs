// 공통 정보
export const CONTACT_EMAIL = 'gusghrlrl101@gmail.com';
export const LAST_UPDATED = '2025-12-25';

export interface AppConfig {
  path: string;
}

// 새 앱 추가 시 여기에 추가하면 됩니다
export const apps: AppConfig[] = [
  { path: 'after-taste' },
  { path: 'pocket-ai' },
];
