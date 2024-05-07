import mockData from './mockData';
import { Metric, Subscription } from './types';
import utils from './utils';

const login = async (apiKey: string) => {
  await utils.sleep(2_000);
  return { account: mockData.account, user: mockData.user };
};

const getSubscriptions = async (apiKey: string): Promise<Subscription[]> => {
  await utils.sleep(2_000);
  const shuffled = [...mockData.subscriptions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 4);
  return selected;
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

const QUERIES = {
  login,
  getSubscriptions,
  searchMetricsByPoolAddresses,
  searchMetricsByTokenAddresses,
  searchMetricsByUserAddresses,
};

export default QUERIES;
