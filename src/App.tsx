import { useState } from 'react';
import LoginPage from './components/LoginPage';
import OfficerFlow from './components/OfficerFlow';
import OfficialDashboard from './components/OfficialDashboard';

type AppState =
  | { view: 'login' }
  | { view: 'officer'; id: string; name: string }
  | { view: 'official'; id: string; name: string };

export default function App() {
  const [state, setState] = useState<AppState>({ view: 'login' });

  if (state.view === 'officer') {
    return (
      <OfficerFlow
        officer={{ id: state.id, name: state.name }}
        onLogout={() => setState({ view: 'login' })}
      />
    );
  }

  if (state.view === 'official') {
    return (
      <OfficialDashboard
        official={{ id: state.id, name: state.name }}
        onLogout={() => setState({ view: 'login' })}
      />
    );
  }

  return (
    <LoginPage
      onLogin={(type, creds) =>
        setState({ view: type, id: creds.id, name: creds.name })
      }
    />
  );
}
