import { Metric, MetricAlert, Subscription } from '../misc/types';

const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const getCurrentTimestamp = () => {
  const currentDate = new Date();
  const currentTimestamp = Math.floor(currentDate.getTime() / 1000);
  return currentTimestamp;
};

const getMetricsWithThresholds = (metrics: Metric[], subscriptions: Subscription[]) => {
  const subMap = new Map(subscriptions.map((s) => ([s.metricKey, s])));
  const withThresholdMetrics = new Map(metrics.map((metric) => ([metric.key, { metric, threshold: subMap.has(metric.key) ? subMap.get(metric.key)!.threshold : 0 }])));
  return Array.from(withThresholdMetrics.values());
};

const durationString = (fromTimestamp: number, toTimestamp: number) => {
  const seconds = toTimestamp - fromTimestamp;

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};

function getTimeAgo(timestamp: number) {
  const currentTimestamp = getCurrentTimestamp();
  return durationString(timestamp, currentTimestamp);
}

function formatNumber(inputValue: number, withSign: boolean = false) {
  if (inputValue === 0) return '0';
  let sign = '';
  if (withSign) sign = (inputValue >= 0) ? '+' : '-';
  const value = Math.abs(inputValue);

  // Format very high numbers
  if (value >= 10 ** 15) return `${sign}${value.toExponential(2)}`;

  // Format very small numbers
  if (value <= 1e-3) return `${sign}${value.toExponential(2)}`;
  if (value <= 1e-2) return `${sign}${value.toFixed(4).replace(/\.?0+$/, '')}`;
  if (value <= 1e-1) return `${sign}${value.toFixed(4).replace(/\.?0+$/, '')}`;
  if (value <= 1) return `${sign}${value.toFixed(3).replace(/\.?0+$/, '')}`;

  // Format other numbers
  const s = ['', 'k', 'M', 'B', 'T'];
  const e = Math.floor(Math.log(value) / Math.log(1_000));
  const unit = e > 0 ? ` ${s[e]}` : '';
  return `${sign}${(value / 1_000 ** e).toFixed(2)}${unit}`.replace('.00', '');
}

const isFloat = (value: string): boolean => /^\d*\.?\d+$/.test(value);

const getMetricAlertInfo = (metricAlert: MetricAlert) => {
  const { fromPoint, toPoint, metricPercentVariation, metric } = metricAlert;
  const timeAgo = getTimeAgo(toPoint.timestamp);
  const withinTime = durationString(fromPoint.timestamp, toPoint.timestamp);
  const percentVariation = Math.abs(metricPercentVariation).toFixed(2);
  const percentVariationString = `${metricPercentVariation > 0 ? '+' : '-'}${percentVariation} %`;
  const varColor = metricPercentVariation > 0 ? 'rgb(39, 174, 96)' : 'rgb(231, 76, 60)';
  return {
    timeAgo,
    withinTime,
    percentVariation,
    percentVariationString,
    varColor,
  };
};

export default {
  sleep,
  durationString,
  getMetricsWithThresholds,
  getTimeAgo,
  formatNumber,
  isFloat,
  getCurrentTimestamp,
  getMetricAlertInfo,
};
