import { Metric, Subscription } from '../misc/types';

const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const getMetricsWithThresholds = (metrics: Metric[], subscriptions: Subscription[]) => {
  const subMap = new Map(subscriptions.map((s) => ([s.metricKey, s])));
  const withThresholdMetrics = new Map(metrics.map((metric) => ([metric.key, { metric, threshold: subMap.has(metric.key) ? subMap.get(metric.key)!.threshold : 0 }])));
  return Array.from(withThresholdMetrics.values());
};

export default {
  sleep,
  getMetricsWithThresholds,
};
