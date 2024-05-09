import axios from 'axios';
import { Account, Subscription, User, Metric, Point, MetricAlert } from '../misc/types';
import mockData from './mockData';
import utils from './utils';

interface SentryApiInterface {
    getAccountAndUser: (apiKey: string) => Promise<{ account: Account, user: User } | null>
    getSubscriptions: (apiKey: string, userId: string) => Promise<{ subscriptions: Subscription[], associatedMetrics: Metric[] } | null>
    searchMetricsByPoolAddresses: (apiKey: string, addresses: string) => Promise<Metric[]| null>
    searchMetricsByTokenAddresses: (apiKey: string, addresses: string) => Promise<Metric[]| null>
    searchMetricsByUserAddresses: (apiKey: string, addresses: string) => Promise<Metric[]| null>
    updateSubscriptions: (apiKey: string, userId: string, subscriptionUpdateData: { metricKey: string, threshold: number }[]) => Promise<{ currentUserSubscriptions: Subscription[], associatedMetrics: Metric[] } | null>
    getMetricDataPoints: (apiKey: string, metricKey: string) => Promise<Point[] | null>
    getAlertHistory: (apiKey: string, userId: string) => Promise<MetricAlert[] | null>
 | null}

// ---------------------------------------- fake API (used in dev) ----------------------------------------

const FAKE_SLEEP_MS = 500;

const fakeApi: SentryApiInterface = {
  getAccountAndUser: async (apiKey: string) => {
    await utils.sleep(FAKE_SLEEP_MS);
    return { account: mockData.account, user: mockData.user };
  },
  getSubscriptions: async (apiKey: string, userId: string): Promise<{ subscriptions: Subscription[], associatedMetrics: Metric[] }> => {
    await utils.sleep(FAKE_SLEEP_MS);
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
  },
  searchMetricsByPoolAddresses: async (apiKey: string, addresses: string): Promise<Metric[]> => {
    await utils.sleep(FAKE_SLEEP_MS);
    return [...mockData.metrics];
  },
  searchMetricsByTokenAddresses: async (apiKey: string, addresses: string): Promise<Metric[]> => {
    await utils.sleep(FAKE_SLEEP_MS);
    return [...mockData.metrics];
  },
  searchMetricsByUserAddresses: async (apiKey: string, addresses: string): Promise<Metric[]> => {
    await utils.sleep(FAKE_SLEEP_MS);
    return [...mockData.metrics];
  },
  updateSubscriptions: async (apiKey: string, userId: string, subscriptionUpdateData: { metricKey: string, threshold: number }[]) => {
    await utils.sleep(FAKE_SLEEP_MS);
    const shuffled = [...mockData.metrics].sort(() => 0.5 - Math.random());
    const selectedMetrics = shuffled.slice(0, 4);
    const currentUserSubscriptions: Subscription[] = selectedMetrics.map((m, index) => ({ id: `${m.key}_${index}`, metricKey: m.key, startWindowTimestamp: 0, threshold: Math.floor(Math.random() * 10), userId }));
    return { currentUserSubscriptions, associatedMetrics: selectedMetrics };
  },
  getMetricDataPoints: async (apiKey: string, metricKey: string) => {
    await utils.sleep(FAKE_SLEEP_MS);
    const currentTimestamp = Math.floor(Date.now() / 1_000);
    const dataPoints: { timestamp: number, value: number }[] = [];
    for (let index = 0; index < 100; index += 1) {
      const timestamp = currentTimestamp - (100 - index) * 12;
      const value = 30 + (index / 10) + Math.floor(Math.random() * 5);
      dataPoints.push({ timestamp, value });
    }
    return dataPoints;
  },
  getAlertHistory: async (apiKey: string, userId: string) => {
    await utils.sleep(FAKE_SLEEP_MS);
    return [...mockData.fakeAlertHistory];
  },
};

// ---------------------------------------- Real API ----------------------------------------

const BASE_URL = 'https://sentry.aleno.ai';

const realApi: SentryApiInterface = {
  getAccountAndUser: async (apiKey: string) => {
    try {
      const accountRes = await axios.get(`${BASE_URL}/account`, { headers: { Authorization: apiKey } });
      const account = <Account>accountRes.data;
      const usersRes = await axios.get(`${BASE_URL}/users`, { headers: { Authorization: apiKey } });
      const users = <User[]>usersRes.data.data;
      if (users.length === 0) return null;
      users.sort((user0, user1) => ((user0.id > user1.id) ? 1 : -1));
      const user = users[0];
      return { account, user };
    } catch (error) {
      return null;
    }
  },
  getSubscriptions: async (apiKey: string, userId: string): Promise<{ subscriptions: Subscription[], associatedMetrics: Metric[] } | null> => {
    try {
      const subRes = await axios.get(`${BASE_URL}/subscriptions?userIds=${userId}`, { headers: { Authorization: apiKey } });
      const subscriptionWithMetrics = <{ subscription: Subscription, metric: Metric }[]>subRes.data.data;
      const subscriptions = subscriptionWithMetrics.map((x) => x.subscription);
      const associatedMetrics = subscriptionWithMetrics.map((x) => x.metric);
      return { subscriptions, associatedMetrics };
    } catch (error) {
      return null;
    }
  },
  searchMetricsByPoolAddresses: async (apiKey: string, addresses: string): Promise<Metric[] | null> => {
    if (addresses.length === 0) return null;
    try {
      const metricRes = await axios.get(`${BASE_URL}/metrics?chainId=eth&page=1&poolAddresses=${addresses}`, { headers: { Authorization: apiKey } });
      const metrics = metricRes.data.data;
      return metrics;
    } catch {
      return null;
    }
  },
  searchMetricsByTokenAddresses: async (apiKey: string, addresses: string): Promise<Metric[] | null> => {
    if (addresses.length === 0) return null;
    try {
      const metricRes = await axios.get(`${BASE_URL}/metrics?chainId=eth&page=1&tokenAddresses=${addresses}`, { headers: { Authorization: apiKey } });
      const metrics = metricRes.data.data;
      return metrics;
    } catch {
      return null;
    }
  },
  searchMetricsByUserAddresses: async (apiKey: string, addresses: string): Promise<Metric[] | null> => {
    if (addresses.length === 0) return null;
    try {
      const metricRes = await axios.get(`${BASE_URL}/suggestions?addresses=${addresses}`, { headers: { Authorization: apiKey } });
      const metrics = <Metric[]>metricRes.data.data.metrics;
      return metrics;
    } catch {
      return null;
    }
  },
  updateSubscriptions: async (apiKey: string, userId: string, subscriptionUpdateData: { metricKey: string, threshold: number }[]) => {
    try {
      const postData = subscriptionUpdateData.map((u) => ({ metricKey: u.metricKey, threshold: u.threshold, userId }));
      await axios.post(`${BASE_URL}/subscriptions`, { subscriptions: postData }, { headers: { Authorization: apiKey } });
      const subRes = await axios.get(`${BASE_URL}/subscriptions?userIds=${userId}`, { headers: { Authorization: apiKey } });
      const subscriptionWithMetrics = <{ subscription: Subscription, metric: Metric }[]>subRes.data.data;
      const currentUserSubscriptions = subscriptionWithMetrics.map((x) => x.subscription);
      const associatedMetrics = subscriptionWithMetrics.map((x) => x.metric);
      return { currentUserSubscriptions, associatedMetrics };
    } catch (error) {
      return null;
    }
  },
  getMetricDataPoints: async (apiKey: string, metricKey: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/metrics/records/range?key=${metricKey}`, { headers: { Authorization: apiKey } });
      const dataPoints = <Point[]>res.data.data.points;
      return dataPoints.slice(-100);
    } catch (error) {
      return null;
    }
  },
  getAlertHistory: async (apiKey: string, userId: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/alertHistory?userId=${userId}&pageSize=100`, { headers: { Authorization: apiKey } });
      const alertHistory = <MetricAlert[]>res.data.data;
      return alertHistory;
    } catch (error) {
      return null;
    }
  },
};

const SENTRY_API = fakeApi;

export default SENTRY_API;
