import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLangParam } from '../hooks/useLangParam';
import { apps } from '../data';

export function Home() {
  const { t, i18n } = useTranslation();
  useLangParam();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <LanguageSelector />
      </div>
      <h1 style={{ textAlign: 'center', marginBottom: 40 }}>{t('common.privacyPolicy')}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {apps.map((app) => (
          <Link
            key={app.path}
            to={`/${app.path}?lang=${i18n.language}`}
            style={{
              padding: '16px 24px',
              background: '#f5f5f5',
              borderRadius: 8,
              textDecoration: 'none',
              color: '#333',
              fontSize: '1.1rem',
            }}
          >
            {t(`apps.${app.path}.name`)}
          </Link>
        ))}
      </div>
    </div>
  );
}
