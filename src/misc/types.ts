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
    apiKey: string,
    connected: boolean,
    isLoading: boolean
}

type NavState = {
    tabIndex: number
}

type SubscriptionState = {
    subscriptions: Subscription[],
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
