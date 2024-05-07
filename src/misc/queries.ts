import mockData from './mockData';
import { Metric, Subscription } from './types';
import utils from './utils';

const login = async (apiKey: string) => {
  await utils.sleep(2_000);
  return { account: mockData.account, user: mockData.user };
};

const getSubscriptions = async (apiKey: string): Promise<{ subscriptions: Subscription[], associatedMetrics: Metric[] }> => {
  await utils.sleep(2_000);
  const shuffled = [...mockData.metrics].sort(() => 0.5 - Math.random());
  const selectedMetrics = shuffled.slice(0, 4);
  const subscriptions: Subscription[] = selectedMetrics.map((metric, index) => ({
    id: `${metric.key}_${index}`,
    metricKey: metric.key,
    startWindowTimestamp: 0,
    threshold: Math.floor(Math.random() * 10),
    userId: mockData.user.id,
  }));

  return { subscriptions, associatedMetrics: selectedMetrics };
};

const searchMetricsByPoolAddresses = async (apiKey: string, addresses: string): Promise<Metric[]> => {
  await utils.sleep(2_000);
  return [...mockData.metrics];
};

const searchMetricsByTokenAddresses = async (apiKey: string, addresses: string): Promise<Metric[]> => {
  await utils.sleep(2_000);
  return [...mockData.metrics];
};

const searchMetricsByUserAddresses = async (apiKey: string, addresses: string): Promise<Metric[]> => {
  await utils.sleep(2_000);
  return [...mockData.metrics];
};

const updateSUbscriptions = async (apiKey: string, userId: string, subscriptionUpdateData: { metricKey: string, threshold: number }[]) => {
  await utils.sleep(2_000);
  const shuffled = [...mockData.metrics].sort(() => 0.5 - Math.random());
  const selectedMetrics = shuffled.slice(0, 4);
  const currentUserSubscriptions: Subscription[] = selectedMetrics.map((m, index) => ({
    id: `${m.key}_${index}`,
    metricKey: m.key,
    startWindowTimestamp: 0,
    threshold: Math.floor(Math.random() * 10),
    userId,
  }));
  return {
    inserted: [],
    updated: [],
    deleted: [],
    currentUserSubscriptions,
    associatedMetrics: selectedMetrics,
  };
};

const QUERIES = {
  login,
  getSubscriptions,
  updateSUbscriptions,
  searchMetricsByPoolAddresses,
  searchMetricsByTokenAddresses,
  searchMetricsByUserAddresses,
};

export default QUERIES;
