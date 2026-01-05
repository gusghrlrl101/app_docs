import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

const validCodes = languages.map((l) => l.code) as string[];

export function useLangParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const langParam = searchParams.get('lang');

  useEffect(() => {
    if (langParam && validCodes.includes(langParam) && langParam !== i18n.language) {
      i18n.changeLanguage(langParam);
    }
  }, [langParam, i18n]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setSearchParams({ lang: code });
  };

  // lang 파라미터가 있을 때만 쿼리스트링 반환
  const getLangQuery = () => (langParam ? `?lang=${langParam}` : '');

  return { changeLanguage, getLangQuery };
}
