type Account = {
    id: string;
    accountName: string;
    alertOutputs: { telegramChannelId?: string, webhookUrl?: string };
    apiKeyHash: string;
    apiKeyExpirationTimestamp: number;
  };

type User = {
    id: string
    accountId: string
    userName: string | null
    userContext: string | null
}

type Subscription = {
    id: string;
    userId: string;
    metricKey: string;
    threshold: number;
    startWindowTimestamp: number;
};

type Metric = {
    key: string
    chainId: string
    type: string
    name: string
    info: any
};

type MetricAlert = {
    id: string
    chainId: string
    accountId: string
    userId: string
    userContext: string | null
    message: string
    sendTimestamp: number
    sendWebhookUrl: string
    subscriptionId: string
    subscriptionThreshold: number
    metric: Metric
    block: { number: number, timestamp: number }
    fromPoint: { timestamp: number, value: number }
    toPoint: { timestamp: number, value: number }
    metricDelta: number
    metricPercentVariation: number
    createdAt: string
    updatedAt: string
};

type AuthState = {
    isLoading: boolean
    authData: { apiKey: string, account: Account, user: User } | null
}

type NavState = {
    tabIndex: number
}

type SubscriptionState = {
    subscriptions: Subscription[],
    associatedMetrics: Metric[],
    isLoading: boolean
}

type MetricState = {
    metrics: Metric[]
    isLoading: boolean
}

type Point = { timestamp: number, value: number }

type SelectedMetricState = {
    metric: Metric | null
    isLoading: boolean
    dataPoints: Point[]
}

type AppSnackBarState = {
    message: string | null
}

type MetricAlertState = {
    metricAlerts: MetricAlert[],
    isLoading: boolean
}

type AlertOutputsState = {
    isLoading: boolean,
    alertOutputs: { telegramChannelId?: string, webhookUrl?: string }
}

type AppState = {
    authState: AuthState
    navState: NavState
    subscriptionState: SubscriptionState
    metricState: MetricState
    selectedMetricState: SelectedMetricState
    appSnackBarState: AppSnackBarState
    metricAlertState: MetricAlertState
    alertOutputsState: AlertOutputsState
}

export type {
  Account,
  User,
  Subscription,
  Metric,
  AuthState,
  NavState,
  SubscriptionState,
  MetricState,
  SelectedMetricState,
  AppState,
  AppSnackBarState,
  MetricAlert,
  MetricAlertState,
  Point,
  AlertOutputsState,
};
