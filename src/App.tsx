import React, { useState } from 'react';
import SearchMetrics from './pages/SearchMetrics';
import MySubscriptions from './pages/MySubscriptions';
import LoginDialog from './components/LoginDialog';
import { AppState } from './misc/types';
import QUERIES from './misc/queries';
import AppSnackBar from './components/AppSnackBar';
import AppMenu from './components/AppMenu';
import MyAlerts from './pages/MyAlerts';

const initialAppState: AppState = {
  loginState: { apiKey: '', connected: false, isLoading: false },
  navState: { tabIndex: 0 },
  subscriptionState: { subscriptions: [], isLoading: false },
  metricState: { metrics: [], isLoading: false },
  selectedMetricState: { metric: null },
  appSnackBarState: { message: null },
};

console.log(initialAppState);

function App() {
  const [loginState, setLoginState] = useState(initialAppState.loginState);
  const [navState, setNavState] = useState(initialAppState.navState);
  // const [subscriptionState, setSubscriptionState] = useState(initialAppState.subscriptionState);
  // const [metricState, setMetricState] = useState(initialAppState.metricState);
  // const [selectedMetricState, setSelectedMetricState] = useState(initialAppState.selectedMetricState);
  const [appSnackBarState, setAppSnackBarState] = useState(initialAppState.appSnackBarState);

  const onClickLogin = async (providedApiKey: string) => {
    setLoginState({ ...loginState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Connecting to Sentry...' });
    const success = await QUERIES.login(providedApiKey);
    if (success) {
      setLoginState({ ...loginState, apiKey: providedApiKey, isLoading: false, connected: true });
    } else {
      setLoginState({ ...loginState, apiKey: '', isLoading: false, connected: false });
    }
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  return (
    <div>
      <AppMenu navState={navState} onClickTab={(tabIndex) => setNavState({ ...navState, tabIndex })} />
      { navState.tabIndex === 0 ? <SearchMetrics /> : null }
      { navState.tabIndex === 1 ? <MySubscriptions /> : null }
      { navState.tabIndex === 2 ? <MyAlerts /> : null }
      <LoginDialog loginState={loginState} onClickLogin={onClickLogin} />
      <AppSnackBar appSnackBarState={appSnackBarState} />
    </div>
  );
}

export default App;
