import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLangParam } from '../hooks/useLangParam';
import { apps } from '../data';
import styles from '../components/PrivacyPolicy.module.css';

export function AppPage() {
  const { appId } = useParams<{ appId: string }>();
  const { t, i18n } = useTranslation();
  useLangParam();

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
      </header>

      <main>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={`/${appId}/${link.path}?lang=${i18n.language}`}
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
          to={`/?lang=${i18n.language}`}
          style={{ color: '#666', textDecoration: 'none' }}
        >
          ← {t('common.backToList')}
        </Link>
      </footer>
    </div>
  );
}
