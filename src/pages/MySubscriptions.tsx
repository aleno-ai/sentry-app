import React from 'react';
import { Typography } from '@mui/material';
import MetricTable from '../components/MetricTable';
import { Metric, SubscriptionState } from '../misc/types';
import utils from '../misc/utils';

function MySubscriptions(props: {
  subscriptionState: SubscriptionState,
  onSelectMetric: (metric: Metric) => void,
  onClickUpdateSubscriptions: (updateSubscriptionData: { metricKey: string, threshold: number }[]) => Promise<void>
}) {
  const metricWithThreshold = utils.getMetricsWithThresholds(props.subscriptionState.associatedMetrics, props.subscriptionState.subscriptions);
  console.log('Render', metricWithThreshold.length);
  return (
    <>
      <Typography variant="h4" gutterBottom>Active subscriptions</Typography>
      <MetricTable onSelectMetric={props.onSelectMetric} metricWithThresholds={metricWithThreshold} isLoading={props.subscriptionState.isLoading} onClickUpdateSubscriptions={props.onClickUpdateSubscriptions} />
    </>
  );
}

export default MySubscriptions;
