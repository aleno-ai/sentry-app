import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchMetrics from './pages/SearchMetrics';
import MySubscriptions from './pages/MySubscriptions';
import LoginPage from './components/LoginPage';
import { AppState, Metric } from './misc/types';
import QUERIES from './misc/queries';
import AppSnackBar from './components/AppSnackBar';
import AppMenu from './components/AppMenu';
import MyAlerts from './pages/MyAlerts';
import SelectedMetricDialog from './components/SelectedMetricDialog';

const initialAppState: AppState = {
  loginState: { isLoading: false, authData: null, apiKey: '' },
  navState: { tabIndex: 0 },
  subscriptionState: { subscriptions: [], associatedMetrics: [], isLoading: false },
  metricState: { metrics: [], isLoading: false },
  selectedMetricState: { metric: null, isLoading: false, dataPoints: [] },
  metricAlertState: { metricAlerts: [], isLoading: false },
  appSnackBarState: { message: null },
};

function App() {
  const [loginState, setLoginState] = useState(initialAppState.loginState);
  const [navState, setNavState] = useState(initialAppState.navState);
  const [subscriptionState, setSubscriptionState] = useState(initialAppState.subscriptionState);
  const [metricState, setMetricState] = useState(initialAppState.metricState);
  const [selectedMetricState, setSelectedMetricState] = useState(initialAppState.selectedMetricState);
  const [metricAlertState, setMetricAlertState] = useState(initialAppState.metricAlertState);
  const [appSnackBarState, setAppSnackBarState] = useState(initialAppState.appSnackBarState);
  const { authData } = loginState;

  const onClickLogin = async (providedApiKey: string) => {
    setLoginState({ ...loginState, isLoading: true });
    setSubscriptionState({ ...subscriptionState, isLoading: true });
    setMetricAlertState({ ...metricAlertState, isLoading: true });

    setAppSnackBarState({ ...appSnackBarState, message: 'Connecting to Sentry...' });
    const authDataResult = await QUERIES.login(providedApiKey);

    setAppSnackBarState({ ...appSnackBarState, message: 'Fetching subscriptions...' });
    const { subscriptions, associatedMetrics } = authDataResult ? (await QUERIES.getSubscriptions(providedApiKey)) : { subscriptions: [], associatedMetrics: [] };

    setAppSnackBarState({ ...appSnackBarState, message: 'Fetching alert history...' });
    const metricAlerts = await QUERIES.getAlertHistory(providedApiKey, authDataResult.user.id);

    setSubscriptionState({ ...subscriptionState, subscriptions, associatedMetrics, isLoading: false });
    setMetricAlertState({ ...metricAlertState, metricAlerts, isLoading: false });
    setLoginState({ ...loginState, authData: authDataResult, apiKey: providedApiKey, isLoading: false });

    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  if (!authData) return (<LoginPage appSnackBarState={appSnackBarState} loginState={loginState} onClickLogin={onClickLogin} />);

  const onClickSearchMetrics = async (searchMode: string, textInput: string) => {
    setMetricState({ ...metricState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Searching metrics...' });
    const toUseFunction = { TOKEN_ADDRESSES: QUERIES.searchMetricsByTokenAddresses, POOL_ADDRESSES: QUERIES.searchMetricsByPoolAddresses, USER_ADDRESSES: QUERIES.searchMetricsByUserAddresses }[searchMode];
    if (!toUseFunction) throw new Error('Invalid search mode provided');
    const metrics = await toUseFunction(loginState.apiKey, textInput);
    setMetricState({ ...metricState, metrics, isLoading: false });
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  const onClickUpdateSubscriptions = async (updateSubscriptionData: { metricKey: string, threshold: number }[]) => {
    setSubscriptionState({ ...subscriptionState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: `Updating ${updateSubscriptionData.length} subscriptions...` });
    const response = await QUERIES.updateSUbscriptions(loginState.apiKey, authData.user.id, updateSubscriptionData);
    setSubscriptionState({ ...subscriptionState, isLoading: false, subscriptions: response.currentUserSubscriptions, associatedMetrics: response.associatedMetrics });
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  const onSelectMetric = async (metric: Metric) => {
    setSelectedMetricState({ ...selectedMetricState, metric, isLoading: true });
    setAppSnackBarState({ message: 'Loading data points' });
    const dataPoints = await QUERIES.getMetricDataPoints(loginState.apiKey, metric.key);
    setSelectedMetricState({ ...selectedMetricState, isLoading: false, dataPoints, metric });
    setAppSnackBarState({ message: null });
  };

  const onCloseSelectedMetric = () => {
    setSelectedMetricState({ ...selectedMetricState, metric: null, dataPoints: [] });
  };

  const onRefreshMetricDataPoints = async () => {
    const selectedMetric = selectedMetricState.metric;
    if (!selectedMetric) return;
    setSelectedMetricState({ ...selectedMetricState, dataPoints: [], isLoading: true });
    setAppSnackBarState({ message: 'Loading data points' });
    const dataPoints = await QUERIES.getMetricDataPoints(loginState.apiKey, selectedMetric.key);
    setSelectedMetricState({ ...selectedMetricState, dataPoints, isLoading: false });
    setAppSnackBarState({ message: null });
  };

  const onRefreshMetricAlerts = async () => {
    setMetricAlertState({ ...metricAlertState, isLoading: true });
    setAppSnackBarState({ message: 'Refreshing metric alerts...' });
    const metricAlerts = await QUERIES.getAlertHistory(loginState.apiKey, authData.user.id);
    setMetricAlertState({ ...metricAlertState, metricAlerts, isLoading: false });
    setAppSnackBarState({ message: null });
  };

  return (
    <div>
      <AppMenu navState={navState} onClickTab={(tabIndex) => setNavState({ ...navState, tabIndex })} />
      <Box sx={{ p: 3 }}>
        { navState.tabIndex === 0 ? <SearchMetrics onSelectMetric={onSelectMetric} metricState={metricState} subscriptionState={subscriptionState} onClickSearch={onClickSearchMetrics} onClickUpdateSubscriptions={onClickUpdateSubscriptions} /> : null }
        { navState.tabIndex === 1 ? <MySubscriptions onSelectMetric={onSelectMetric} subscriptionState={subscriptionState} onClickUpdateSubscriptions={onClickUpdateSubscriptions} /> : null }
        { navState.tabIndex === 2 ? <MyAlerts metricAlertState={metricAlertState} onViewChart={onSelectMetric} onClickRefresh={onRefreshMetricAlerts} /> : null }
      </Box>
      <SelectedMetricDialog onClose={onCloseSelectedMetric} selectedMetricState={selectedMetricState} onRefreshMetricDataPoints={onRefreshMetricDataPoints} />
      <AppSnackBar appSnackBarState={appSnackBarState} />
    </div>
  );
}

export default App;
