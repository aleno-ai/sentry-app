import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchMetrics from './pages/SearchMetrics';
import MySubscriptions from './pages/MySubscriptions';
import LoginPage from './components/LoginPage';
import { AppState } from './misc/types';
import QUERIES from './misc/queries';
import AppSnackBar from './components/AppSnackBar';
import AppMenu from './components/AppMenu';
import MyAlerts from './pages/MyAlerts';
import mockData from './misc/mockData';

const initialAppState: AppState = {
  loginState: { isLoading: false, authData: null },
  navState: { tabIndex: 0 },
  subscriptionState: { subscriptions: mockData.subscriptions, isLoading: false },
  metricState: { metrics: mockData.metrics, isLoading: false },
  selectedMetricState: { metric: null },
  appSnackBarState: { message: null },
};

console.log(initialAppState);

function App() {
  const [loginState, setLoginState] = useState(initialAppState.loginState);
  const [navState, setNavState] = useState(initialAppState.navState);
  const [subscriptionState, setSubscriptionState] = useState(initialAppState.subscriptionState);
  const [metricState, setMetricState] = useState(initialAppState.metricState);
  const [selectedMetricState, setSelectedMetricState] = useState(initialAppState.selectedMetricState);
  const [appSnackBarState, setAppSnackBarState] = useState(initialAppState.appSnackBarState);
  const { authData } = loginState;

  const onClickLogin = async (providedApiKey: string) => {
    setLoginState({ ...loginState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Connecting to Sentry...' });
    const authDataResult = await QUERIES.login(providedApiKey);
    const subscriptions = authDataResult ? (await QUERIES.getSubscriptions(providedApiKey)) : [];
    setLoginState({ ...loginState, authData: authDataResult, isLoading: false });
    setSubscriptionState({ ...subscriptionState, subscriptions, isLoading: false });
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  if (!authData) return (<LoginPage appSnackBarState={appSnackBarState} loginState={loginState} onClickLogin={onClickLogin} />);

  const onClickSearchMetrics = async (searchMode: string, textInput: string) => {
    setMetricState({ ...metricState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Searching metrics...' });
    const toUseFunction = { TOKEN_ADDRESSES: QUERIES.searchMetricsByTokenAddresses, POOL_ADDRESSES: QUERIES.searchMetricsByPoolAddresses, USER_ADDRESSES: QUERIES.searchMetricsByUserAddresses }[searchMode];
    if (!toUseFunction) throw new Error('Invalid search mode provided');
    const metrics = await toUseFunction(authData.account.apiKeyHash, textInput);
    setMetricState({ ...metricState, metrics, isLoading: false });
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  const onClickUpdateSubscriptions = (updateSubscriptionData: { metricKey: string, threshold: string }) => {

  };

  return (
    <div>
      <AppMenu navState={navState} onClickTab={(tabIndex) => setNavState({ ...navState, tabIndex })} />
      <Box sx={{ p: 3 }}>
        { navState.tabIndex === 0 ? <SearchMetrics metricState={metricState} subscriptionState={subscriptionState} onClickSearch={onClickSearchMetrics} /> : null }
        { navState.tabIndex === 1 ? <MySubscriptions /> : null }
        { navState.tabIndex === 2 ? <MyAlerts /> : null }
        <AppSnackBar appSnackBarState={appSnackBarState} />
      </Box>
    </div>
  );
}

export default App;
