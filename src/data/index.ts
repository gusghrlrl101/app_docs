// 공통 정보
export const CONTACT_EMAIL = 'gusghrlrl101@gmail.com';

export interface AppConfig {
  path: string;
  privacyUpdated: string;
  termsUpdated: string;
  icon?: string;
  storeLinks?: {
    ios?: string;
    android?: string;
  };
}

// 새 앱 추가 시 여기에 추가하면 됩니다
export const apps: AppConfig[] = [
  {
    path: 'pocket-ai',
    privacyUpdated: '2026-01-06',
    termsUpdated: '2026-01-06',
    icon: '/icons/pocket-ai.png',
    storeLinks: {
      ios: 'https://apps.apple.com/us/app/pocket-ai-pocket-offline-ai/id6756994400',
      android: 'https://play.google.com/store/apps/details?id=kr.hyunho.pocket_ai',
    },
  },
  // {
  //   path: 'after-taste',
  //   privacyUpdated: '2025-12-27',
  //   termsUpdated: '2025-12-27',
  // },
];
