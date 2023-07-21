
export const HistoricalChart = (id: any, days : string) =>
  `https://coinranking1.p.rapidapi.com/coin/${id}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${days}`;

// 1h, 3h, 12h, 24h, 7d, 30d, 3m, 1y, 3y, 5y

export const Coins = () => 
  `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0`

export const TrendingCoins = () =>
`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=price&orderDirection=desc&limit=15&offset=0`



export const SingleCoinApi = (id: string) => 
  `https://coinranking1.p.rapidapi.com/coin/${id}`

