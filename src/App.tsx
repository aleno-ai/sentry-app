import React, { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import SearchMetrics from './pages/SearchMetrics';
import MySubscriptions from './pages/MySubscriptions';
import Login from './pages/Login';
import { AppState, AuthState, Metric, MetricAlert } from './misc/types';
import SENTRY_API from './misc/sentryApi';
import AppSnackBar from './components/AppSnackBar';
import AppMenu from './components/AppMenu';
import MyAlerts from './pages/MyAlerts';
import SelectedMetricDialog from './components/SelectedMetricDialog';
import utils from './misc/utils';
import AlertSettings from './pages/AlertSettings';

const initialAppState: AppState = {
  authState: { isLoading: false, authData: null },
  navState: { tabIndex: 0 },
  subscriptionState: { subscriptions: [], associatedMetrics: [], isLoading: false },
  metricState: { metrics: [], isLoading: false },
  selectedMetricState: { metric: null, isLoading: false, dataPoints: [], metricAlert: null },
  metricAlertState: { metricAlerts: [], isLoading: false },
  appSnackBarState: { message: null },
  alertOutputsState: { isLoading: false, alertOutputs: {} },
};

function App() {
  const [authState, setAuthState] = useState(initialAppState.authState);
  const [navState, setNavState] = useState(initialAppState.navState);
  const [subscriptionState, setSubscriptionState] = useState(initialAppState.subscriptionState);
  const [metricState, setMetricState] = useState(initialAppState.metricState);
  const [selectedMetricState, setSelectedMetricState] = useState(initialAppState.selectedMetricState);
  const [metricAlertState, setMetricAlertState] = useState(initialAppState.metricAlertState);
  const [appSnackBarState, setAppSnackBarState] = useState(initialAppState.appSnackBarState);
  const [alertOutputsState, setAlertOutputsState] = useState(initialAppState.alertOutputsState);

  // ----------------------------------- LOADERS -----------------------------------

  const loadAuthState = async (providedApiKey: string): Promise<AuthState> => {
    setAuthState({ ...authState, isLoading: true });
    setAlertOutputsState({ ...alertOutputsState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Connecting to Sentry' });
    const authResult = await SENTRY_API.getAccountAndUser(providedApiKey);
    if (authResult) {
      const { account, user } = authResult;
      const newAuthState = { ...authState, isLoading: false, authData: { account, user, apiKey: providedApiKey } };
      setAuthState(newAuthState);
      setAlertOutputsState({ ...alertOutputsState, isLoading: false, alertOutputs: newAuthState.authData.account.alertOutputs });
      return newAuthState;
    }
    const initialAuthState = { ...initialAppState.authState };
    setAuthState(initialAuthState);
    setAlertOutputsState({ ...initialAppState.alertOutputsState });
    setAppSnackBarState({ ...appSnackBarState, message: null });
    return initialAuthState;
  };

  const loadUserSubscriptions = async (providedAuthState: AuthState) => {
    if (!providedAuthState.authData) return;
    setSubscriptionState({ ...subscriptionState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Loading subscriptions' });
    const subData = await SENTRY_API.getSubscriptions(providedAuthState.authData.apiKey, providedAuthState.authData.user.id);
    if (subData) {
      const { associatedMetrics, subscriptions } = subData;
      setSubscriptionState({ ...subscriptionState, isLoading: false, associatedMetrics, subscriptions });
    } else {
      setSubscriptionState({ ...initialAppState.subscriptionState });
    }
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  const loadUserMetricAlerts = async (providedAuthState: AuthState) => {
    if (!providedAuthState.authData) return;
    setMetricAlertState({ ...metricAlertState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Loading alert history' });
    const metricAlerts = await SENTRY_API.getAlertHistory(providedAuthState.authData.apiKey, providedAuthState.authData.user.id);
    if (metricAlerts) {
      setMetricAlertState({ ...metricAlertState, metricAlerts, isLoading: false });
    } else {
      setMetricAlertState({ ...initialAppState.metricAlertState });
    }
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  const loadMetrics = async (providedAuthState: AuthState, searchMode: string, textInput: string) => {
    if (!providedAuthState.authData) return;
    setMetricState({ ...metricState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: 'Loading metrics...' });
    const toUseFunction = { TOKEN_ADDRESSES: SENTRY_API.searchMetricsByTokenAddresses, POOL_ADDRESSES: SENTRY_API.searchMetricsByPoolAddresses, USER_ADDRESSES: SENTRY_API.searchMetricsByUserAddresses }[searchMode];
    if (!toUseFunction) throw new Error('Invalid search mode provided');
    const metrics = await toUseFunction(providedAuthState.authData.apiKey, textInput);
    if (metrics) {
      setMetricState({ ...metricState, metrics, isLoading: false });
    } else {
      setMetricState({ ...initialAppState.metricState });
    }
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  // ----------------------------------- INTERACTIONS -----------------------------------

  const onClickLogin = async (providedApiKey: string) => {
    const newAuthState = await loadAuthState(providedApiKey);
    await loadUserSubscriptions(newAuthState);
    await loadUserMetricAlerts(newAuthState);
  };

  const onClickSearchMetrics = async (searchMode: string, textInput: string) => {
    await loadMetrics(authState, searchMode, textInput);
  };

  const onClickUpdateSubscriptions = async (updateSubscriptionData: { metricKey: string, threshold: number }[]) => {
    if (!authState.authData) return;
    setSubscriptionState({ ...subscriptionState, isLoading: true });
    setAppSnackBarState({ ...appSnackBarState, message: `Updating ${updateSubscriptionData.length} subscriptions...` });
    const response = await SENTRY_API.updateSubscriptions(authState.authData.apiKey, authState.authData.user.id, updateSubscriptionData);
    if (response) {
      setSubscriptionState({ ...subscriptionState, isLoading: false, subscriptions: response.currentUserSubscriptions, associatedMetrics: response.associatedMetrics });
    } else {
      setSubscriptionState({ ...initialAppState.subscriptionState });
    }
    setAppSnackBarState({ ...appSnackBarState, message: null });
  };

  const onSelectMetric = async (metric: Metric, metricAlert: MetricAlert | null) => {
    if (!authState.authData) return;
    setSelectedMetricState({ ...selectedMetricState, metric, metricAlert, isLoading: true });
    setAppSnackBarState({ message: 'Loading data points' });
    const dataPoints = await SENTRY_API.getMetricDataPoints(authState.authData.apiKey, metric.key);
    if (dataPoints) {
      setSelectedMetricState({ ...selectedMetricState, metric, metricAlert, dataPoints, isLoading: false });
    } else {
      setSelectedMetricState({ ...initialAppState.selectedMetricState });
    }
    setAppSnackBarState({ message: null });
  };

  const onCloseSelectedMetric = () => {
    setSelectedMetricState({ ...initialAppState.selectedMetricState });
  };

  const onRefreshMetricDataPoints = async () => {
    if (!authState.authData) return;
    const selectedMetric = selectedMetricState.metric;
    if (!selectedMetric) return;
    setSelectedMetricState({ ...selectedMetricState, dataPoints: [], isLoading: true });
    setAppSnackBarState({ message: 'Loading data points' });
    const dataPoints = await SENTRY_API.getMetricDataPoints(authState.authData.apiKey, selectedMetric.key);
    if (dataPoints) {
      setSelectedMetricState({ ...selectedMetricState, dataPoints, isLoading: false });
    } else {
      setSelectedMetricState({ ...initialAppState.selectedMetricState });
    }
    setAppSnackBarState({ message: null });
  };

  const onRefreshMetricAlerts = async () => {
    if (!authState.authData) return;
    setMetricAlertState({ ...metricAlertState, isLoading: true });
    setAppSnackBarState({ message: 'Refreshing metric alerts...' });
    const metricAlerts = await SENTRY_API.getAlertHistory(authState.authData.apiKey, authState.authData.user.id);
    if (metricAlerts) {
      setMetricAlertState({ ...metricAlertState, metricAlerts, isLoading: false });
    } else {
      setMetricAlertState({ ...initialAppState.metricAlertState });
    }
    setAppSnackBarState({ message: null });
  };

  const onClickUpdateAlertOutputs = async (data: { telegramChannelId?: string, webhookUrl?: string }) => {
    if (!authState.authData) return;
    setAlertOutputsState({ ...alertOutputsState, isLoading: true });
    setAppSnackBarState({ message: 'Updating alert settings...' });
    const payload: { telegramChannelId: string | null, webhookUrl: string | null } = { telegramChannelId: null, webhookUrl: null };
    if (data.telegramChannelId && data.telegramChannelId !== '') payload.telegramChannelId = data.telegramChannelId;
    if (data.webhookUrl && data.webhookUrl !== '') payload.webhookUrl = data.webhookUrl;
    const res = await SENTRY_API.updateAlertOutputs(authState.authData.apiKey, payload);
    if (res) {
      setAlertOutputsState({ alertOutputs: data, isLoading: false });
    } else {
      setAlertOutputsState({ ...alertOutputsState, alertOutputs: { ...alertOutputsState.alertOutputs }, isLoading: false });
    }
    setAppSnackBarState({ message: null });
  };

  return (
    <div>
      {
        authState.authData ? (
          <>
            <AppMenu navState={navState} onClickTab={(tabIndex) => setNavState({ ...navState, tabIndex })} />
            <div style={{ height: 50 }} />
            <Box sx={{ p: 3 }}>
              { navState.tabIndex === 0 ? <SearchMetrics onSelectMetric={onSelectMetric} metricState={metricState} subscriptionState={subscriptionState} onClickSearch={onClickSearchMetrics} onClickUpdateSubscriptions={onClickUpdateSubscriptions} /> : null }
              { navState.tabIndex === 1 ? <MySubscriptions onSelectMetric={onSelectMetric} subscriptionState={subscriptionState} onClickUpdateSubscriptions={onClickUpdateSubscriptions} /> : null }
              { navState.tabIndex === 2 ? <MyAlerts metricAlertState={metricAlertState} onViewChart={onSelectMetric} onClickRefresh={onRefreshMetricAlerts} /> : null }
              { navState.tabIndex === 3 ? <AlertSettings onUpdate={onClickUpdateAlertOutputs} isLoading={alertOutputsState.isLoading} alertOutputs={alertOutputsState.alertOutputs} /> : null }
            </Box>
          </>
        ) : (
          <Login authState={authState} onClickLogin={onClickLogin} />
        )
      }
      <SelectedMetricDialog onClose={onCloseSelectedMetric} selectedMetricState={selectedMetricState} onRefreshMetricDataPoints={onRefreshMetricDataPoints} />
      <AppSnackBar appSnackBarState={appSnackBarState} />
    </div>
  );
}

export default App;
