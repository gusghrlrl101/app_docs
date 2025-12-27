import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';
import { useLangParam } from '../hooks/useLangParam';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { changeLanguage } = useLangParam();

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid #ddd',
        fontSize: '0.9rem',
        cursor: 'pointer',
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
