import axios from "axios";

export const apiManager = axios.create({
  baseURL: "https://coreapi.hectorai.live/api/day-parting",
  headers: {
    "X-USER-IDENTITY":
      "U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc",
  },
});
