import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import styles from './PrivacyPolicy.module.css';

interface Props {
  appId: string;
  contactEmail: string;
  lastUpdated: string;
}

interface Section {
  title: string;
  content: string | string[];
}

export function TermsOfService({ appId, contactEmail, lastUpdated }: Props) {
  const { t } = useTranslation();

  const appName = t(`apps.${appId}.name`);
  const description = t(`apps.${appId}.description`);
  const sections = t(`terms.${appId}.sections`, { returnObjects: true }) as Section[];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.langSelector}>
          <LanguageSelector />
        </div>
        <h1>{appName}</h1>
        <p className={styles.description}>{description}</p>
        <h2>{t('common.termsOfService')}</h2>
        <p className={styles.updated}>{t('common.lastUpdated')}: {lastUpdated}</p>
      </header>

      <main className={styles.content}>
        {sections.map((section, index) => (
          <section key={index} className={styles.section}>
            <h3>{section.title}</h3>
            {Array.isArray(section.content) ? (
              <ul>
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{section.content}</p>
            )}
          </section>
        ))}

        <section className={styles.section}>
          <h3>{t('common.contact')}</h3>
          <p>{t('common.email')}: {contactEmail}</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {appName}. {t('common.allRightsReserved')}</p>
      </footer>
    </div>
  );
}
