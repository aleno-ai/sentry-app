import React, { useState } from 'react';
import SearchMetrics from './pages/SearchMetrics';
import MySubscriptions from './pages/MySubscriptions';
import LoginDialog from './components/LoginDialog';
import { AppState } from './misc/types';
import QUERIES from './misc/queries';

const initialAppState: AppState = {
  loginState: { apiKey: '', connected: false, isLoading: false },
  navState: { tabIndex: 0 },
  subscriptionState: { subscriptions: [], isLoading: false },
  metricState: { metrics: [], isLoading: false },
  selectedMetricState: { metric: null },
};

console.log(initialAppState);

function App() {
  const [loginState, setLoginState] = useState(initialAppState.loginState);
  // console.log(loginState, setLoginState);

  // const [navState, setNavState] = useState(initialAppState.navState);
  // const [subscriptionState, setSubscriptionState] = useState(initialAppState.subscriptionState);
  // const [metricState, setMetricState] = useState(initialAppState.metricState);
  // const [selectedMetricState, setSelectedMetricState] = useState(initialAppState.selectedMetricState);

  const onClickLogin = async (providedApiKey: string) => {
    setLoginState({ ...loginState, isLoading: true });
    const success = await QUERIES.login(providedApiKey);
    if (success) {
      setLoginState({ ...loginState, apiKey: providedApiKey, isLoading: false, connected: true });
    } else {
      setLoginState({ ...loginState, apiKey: '', isLoading: false, connected: false });
    }
  };

  return (
    <div>
      <h1>APP</h1>
      <LoginDialog loginState={loginState} onClickLogin={onClickLogin} />
      <SearchMetrics />
      <MySubscriptions />
      <MySubscriptions />
    </div>
  );
}

export default App;
