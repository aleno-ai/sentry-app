type Account = {
    id: string
    accountName: string
    webhookUrl: string | null
    apiKeyHash: string
    apiKeyExpirationTimestamp: number
}

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

type LoginState = {
    isLoading: boolean
    apiKey: string
    authData: { account: Account, user: User } | null
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

type SelectedMetricState = {
    metric: Metric | null
    isLoading: boolean
    dataPoints: { timestamp: number, value: number }[]
}

type AppSnackBarState = {
    message: string | null
}

type MetricAlertState = {
    metricAlerts: MetricAlert[],
    isLoading: boolean
}

type AppState = {
    loginState: LoginState
    navState: NavState
    subscriptionState: SubscriptionState
    metricState: MetricState
    selectedMetricState: SelectedMetricState
    appSnackBarState: AppSnackBarState
    metricAlertState: MetricAlertState
}

export type {
  Account,
  User,
  Subscription,
  Metric,
  LoginState,
  NavState,
  SubscriptionState,
  MetricState,
  SelectedMetricState,
  AppState,
  AppSnackBarState,
  MetricAlert,
  MetricAlertState,
};
