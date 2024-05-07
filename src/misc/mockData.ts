import { Metric, Subscription } from './types';

const metrics: Metric[] = [
  {
    key: 'eth_token_total_tvl_0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    chainId: 'eth',
    type: 'token_total_tvl',
    name: 'WETH total tvl',
    info: {
      token: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        chainId: 'eth',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_total_supply_0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    chainId: 'eth',
    type: 'token_total_supply',
    name: 'WETH total supply',
    info: {
      token: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        chainId: 'eth',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_weth_price_0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    chainId: 'eth',
    type: 'token_weth_price',
    name: 'WETH WETH price',
    info: {
      token: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        chainId: 'eth',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_usd_price_0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    chainId: 'eth',
    type: 'token_usd_price',
    name: 'WETH USD price',
    info: {
      token: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        chainId: 'eth',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_total_tvl_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 'eth',
    type: 'token_total_tvl',
    name: 'USDC total tvl',
    info: {
      token: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_total_supply_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 'eth',
    type: 'token_total_supply',
    name: 'USDC total supply',
    info: {
      token: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_weth_price_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 'eth',
    type: 'token_weth_price',
    name: 'USDC WETH price',
    info: {
      token: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_usd_price_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 'eth',
    type: 'token_usd_price',
    name: 'USDC USD price',
    info: {
      token: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_total_tvl_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    chainId: 'eth',
    type: 'token_total_tvl',
    name: 'DEXTF total tvl',
    info: {
      token: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_total_supply_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    chainId: 'eth',
    type: 'token_total_supply',
    name: 'DEXTF total supply',
    info: {
      token: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_weth_price_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    chainId: 'eth',
    type: 'token_weth_price',
    name: 'DEXTF WETH price',
    info: {
      token: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_token_usd_price_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    chainId: 'eth',
    type: 'token_usd_price',
    name: 'DEXTF USD price',
    info: {
      token: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_pool_tvl_0x6bfc42d89a983df0c8beb3454202d29e7b840c96_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    chainId: 'eth',
    type: 'pool_tvl',
    name: 'DEXTF tvl on pool Uniswap V3 DEXTF / USDC 1%',
    info: {
      pool: {
        address: '0x6bfc42d89a983df0c8beb3454202d29e7b840c96',
        name: 'DEXTF / USDC 1%',
        protocolId: 'uniswap_v3',
        baseProtocolId: 'uniswap_v3',
        tokenAddresses: [
          '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ],
      },
      token: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_pool_tvl_0x6bfc42d89a983df0c8beb3454202d29e7b840c96_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 'eth',
    type: 'pool_tvl',
    name: 'USDC tvl on pool Uniswap V3 DEXTF / USDC 1%',
    info: {
      pool: {
        address: '0x6bfc42d89a983df0c8beb3454202d29e7b840c96',
        name: 'DEXTF / USDC 1%',
        protocolId: 'uniswap_v3',
        baseProtocolId: 'uniswap_v3',
        tokenAddresses: [
          '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ],
      },
      token: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_pool_rate_0x6bfc42d89a983df0c8beb3454202d29e7b840c96_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 'eth',
    type: 'pool_rate',
    name: 'DEXTF vs USDC rate on pool Uniswap V3 DEXTF / USDC 1%',
    info: {
      pool: {
        address: '0x6bfc42d89a983df0c8beb3454202d29e7b840c96',
        name: 'DEXTF / USDC 1%',
        protocolId: 'uniswap_v3',
        baseProtocolId: 'uniswap_v3',
        tokenAddresses: [
          '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ],
      },
      baseToken: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
      quoteToken: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
    },
  },
  {
    key: 'eth_pool_rate_0x6bfc42d89a983df0c8beb3454202d29e7b840c96_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48_0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    chainId: 'eth',
    type: 'pool_rate',
    name: 'USDC vs DEXTF rate on pool Uniswap V3 DEXTF / USDC 1%',
    info: {
      pool: {
        address: '0x6bfc42d89a983df0c8beb3454202d29e7b840c96',
        name: 'DEXTF / USDC 1%',
        protocolId: 'uniswap_v3',
        baseProtocolId: 'uniswap_v3',
        tokenAddresses: [
          '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        ],
      },
      baseToken: {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chainId: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isTracked: true,
      },
      quoteToken: {
        address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
        chainId: 'eth',
        name: 'DEXTF Token',
        symbol: 'DEXTF',
        decimals: 18,
        isTracked: true,
      },
    },
  },
];

const subscriptions: Subscription[] = [
  { id: 'fake id', metricKey: 'eth_token_total_tvl_0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', startWindowTimestamp: 0, threshold: 5, userId: 'fake_user_id' },
];

export default { metrics, subscriptions };
