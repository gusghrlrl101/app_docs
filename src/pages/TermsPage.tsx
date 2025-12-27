import { useParams, Navigate } from 'react-router-dom';
import { TermsOfService } from '../components/TermsOfService';
import { useLangParam } from '../hooks/useLangParam';
import { apps, CONTACT_EMAIL } from '../data';

export function TermsPage() {
  const { appId } = useParams<{ appId: string }>();
  useLangParam();

  const app = apps.find((a) => a.path === appId);

  if (!app) {
    return <Navigate to="/" replace />;
  }

  return (
    <TermsOfService
      appId={app.path}
      contactEmail={CONTACT_EMAIL}
      lastUpdated={app.termsUpdated}
    />
  );
}
