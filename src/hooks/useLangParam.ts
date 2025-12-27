import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

const validCodes = languages.map((l) => l.code) as string[];

export function useLangParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang && validCodes.includes(lang) && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, i18n]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setSearchParams({ lang: code });
  };

  return { changeLanguage };
}
