import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLangParam } from '../hooks/useLangParam';
import { apps } from '../data';
import styles from '../components/PrivacyPolicy.module.css';

export function Home() {
  const { t } = useTranslation();
  const { getLangQuery } = useLangParam();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.langSelector}>
          <LanguageSelector />
        </div>
        <h1>{t('common.appList')}</h1>
      </header>

      <main>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {apps.map((app) => (
            <Link
              key={app.path}
              to={`/${app.path}${getLangQuery()}`}
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
              <div style={{ fontWeight: 600 }}>{t(`apps.${app.path}.name`)}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: 4 }}>
                {t(`apps.${app.path}.description`)}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
