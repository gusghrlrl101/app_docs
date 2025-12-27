import { useParams, Navigate } from 'react-router-dom';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import { useLangParam } from '../hooks/useLangParam';
import { apps, CONTACT_EMAIL, LAST_UPDATED } from '../data';

export function PrivacyPage() {
  const { appId } = useParams<{ appId: string }>();
  useLangParam();

  const app = apps.find((a) => a.path === appId);

  if (!app) {
    return <Navigate to="/" replace />;
  }

  return (
    <PrivacyPolicy
      appId={app.path}
      contactEmail={CONTACT_EMAIL}
      lastUpdated={LAST_UPDATED}
    />
  );
}
