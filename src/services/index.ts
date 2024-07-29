import axios, { AxiosResponse } from "axios";
import { apiManager } from "../utils/apiManager";
import { oneMonthAgo, todayString } from "../utils/dates";
import { getPerformanceListProps } from "../interfaces/Services.types";

export const loginService = async ({
  email,
  password,
  isLoggedInHere,
}: {
  email: string;
  password: string;
  isLoggedInHere: number;
}): Promise<AxiosResponse> => {
  const response: AxiosResponse = await axios.post(
    "https://coreapi.hectorai.live/api/auth/login",
    {
      email,
      password,
      isLoggedInHere,
    }
  );
  return response;
};

export const getMetricsList = async (): Promise<AxiosResponse> => {
  const response: AxiosResponse = await apiManager.post(
    "/DayPartingFilterList",
    {
      type: "customizeMetrics",
    }
  );
  return response;
};

export const getPerformanceList = async ({
  metrics,
}: getPerformanceListProps): Promise<AxiosResponse> => {
  const response: AxiosResponse = await apiManager.post(
    "/DayPartingPerformanceGraphList",
    {
      startDate: oneMonthAgo,
      endDate: todayString,
      metrics: metrics.length > 0 ? metrics : ["CR_perc", "ACOS", "ROAS"],
    }
  );
  return response;
};

export const getHeatMapList = async ({
  metrics,
}: getPerformanceListProps): Promise<AxiosResponse> => {
  const response: AxiosResponse = await apiManager.post("/heatmap-list", {
    startDate: oneMonthAgo,
    endDate: todayString,
    metrics: metrics.length > 0 ? metrics : ["CR_perc", "ACOS", "ROAS"],
  });
  return response;
};
