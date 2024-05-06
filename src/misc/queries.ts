import { Metric, Subscription } from './types';
import utils from './utils';

const login = async (apiKey: string) => {
  await utils.sleep(2_000);
  return true;
};

const getSubscriptions = async (apiKey: string): Promise<Subscription[]> => {
  await utils.sleep(2_000);
  return [];
};

const searchMetricsByPoolAddresses = async (apiKey: string, addresses: string): Promise<Metric[]> => {
  await utils.sleep(2_000);
  return [];
};

const searchMetricsByTokenAddresses = async (apiKey: string, addresses: string): Promise<Metric[]> => {
  await utils.sleep(2_000);
  return [];
};

const searchMetricsByUserAddresses = async (apiKey: string, addresses: string): Promise<Metric[]> => {
  await utils.sleep(2_000);
  return [];
};

const QUERIES = {
  login,
  getSubscriptions,
  searchMetricsByPoolAddresses,
  searchMetricsByTokenAddresses,
  searchMetricsByUserAddresses,
};

export default QUERIES;
