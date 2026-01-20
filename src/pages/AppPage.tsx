import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLangParam } from '../hooks/useLangParam';
import { apps } from '../data';
import styles from '../components/PrivacyPolicy.module.css';

export function AppPage() {
  const { appId } = useParams<{ appId: string }>();
  const { t } = useTranslation();
  const { getLangQuery } = useLangParam();

  const app = apps.find((a) => a.path === appId);

  if (!app) {
    return <Navigate to="/" replace />;
  }

  const appName = t(`apps.${appId}.name`);
  const description = t(`apps.${appId}.description`);

  const links = [
    { path: 'privacy', label: t('common.privacyPolicy') },
    { path: 'terms', label: t('common.termsOfService') },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.langSelector}>
          <LanguageSelector />
        </div>
        <h1>{appName}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.developer}>{t('common.developer')}: {t('common.developerName')}</p>
      </header>

      <main>
        {/* 앱 아이콘 및 스토어 링크 */}
        {(app.icon || app.storeLinks) && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            marginBottom: 32,
            padding: 24,
            background: '#f9f9f9',
            borderRadius: 16,
          }}>
            {app.icon && (
              <img 
                src={app.icon} 
                alt={appName} 
                style={{ 
                  width: 120, 
                  height: 120, 
                  borderRadius: 24,
                  marginBottom: 16,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }} 
              />
            )}
            {app.storeLinks && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                {app.storeLinks.ios && (
                  <a 
                    href={app.storeLinks.ios} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      background: '#000',
                      color: '#fff',
                      borderRadius: 8,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                )}
                {app.storeLinks.android && (
                  <a 
                    href={app.storeLinks.android} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      background: '#01875f',
                      color: '#fff',
                      borderRadius: 8,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.04c-.35-.58-.18-1.32.38-1.67l15.97-9.22c.56-.32 1.28-.13 1.63.43.35.56.18 1.3-.38 1.62L4.81 23.42c-.56.32-1.28.13-1.63-.38zm.38-20.41L19.53 11.85c.56.32.73 1.06.38 1.62-.35.56-1.07.75-1.63.43L2.31 4.68c-.56-.35-.73-1.09-.38-1.67.35-.51 1.07-.7 1.63-.38zM1.5 3.17v17.66c0 .65.53 1.17 1.18 1.17.65 0 1.18-.52 1.18-1.17V3.17c0-.65-.53-1.17-1.18-1.17-.65 0-1.18.52-1.18 1.17z"/>
                    </svg>
                    Google Play
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={`/${appId}/${link.path}${getLangQuery()}`}
              style={{
                padding: '16px 24px',
                background: '#f5f5f5',
                borderRadius: 8,
                textDecoration: 'none',
                color: '#333',
                fontSize: '1.1rem',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#eee')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer} style={{ marginTop: 40 }}>
        <Link
          to={`/${getLangQuery()}`}
          style={{ color: '#666', textDecoration: 'none' }}
        >
          ← {t('common.backToList')}
        </Link>
      </footer>
    </div>
  );
}
