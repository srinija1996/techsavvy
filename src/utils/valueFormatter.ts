export const valueFormatter = (name: string, v: number) => {
  // const numbersMetrics = ["Impressions", "Clicks", "Orders", "ROAS", "RPC"];
  const currencyMetrics = [
    "Spend",
    "Revenue",
    "AOV",
    "CPM",
    "CPC",
    "CPA",
    "CPO",
  ];
  const percentageMetrics = ["CTR", "CR_perc", "ACOS"];

  switch (true) {
    case currencyMetrics.includes(name):
      return `₹${v.toFixed(2)}`;
    case percentageMetrics.includes(name):
      return `${v.toFixed(2)}%`;
    default:
      return v.toFixed(2);
  }
};
