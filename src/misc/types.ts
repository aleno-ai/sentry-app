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

type LoginState = {
    isLoading: boolean
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
}

type AppSnackBarState = {
    message: string | null
}

type AppState = {
    loginState: LoginState
    navState: NavState
    subscriptionState: SubscriptionState
    metricState: MetricState
    selectedMetricState: SelectedMetricState
    appSnackBarState: AppSnackBarState
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
};
