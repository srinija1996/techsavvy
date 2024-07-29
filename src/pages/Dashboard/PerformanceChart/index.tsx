import { Box, Divider, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

import SelectMenu from "../../../components/SelectMenu";
import { getTodaysTime, timeFormatter } from "../../../utils/dates";
import { PerformanceListProps } from "../../../interfaces";
import { valueFormatter } from "../../../utils/valueFormatter";
import { useContext } from "react";
import { AppContext } from "../../../App";

const PerformanceChart = ({
  selectedCategories,
  setSelectedCategories,
  onSetData,
  data,
  isLoading,
}: PerformanceListProps) => {
  const context = useContext(AppContext);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" px={2}>
        <Box sx={{ padding: "10px" }}>
          <Typography>Performance Chart</Typography>
          <Typography sx={{ color: "gray" }} variant="caption">
            Key Metrics for Dayparting Schedule Performance Evaluation
          </Typography>
        </Box>
        <SelectMenu
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
          onSetData={onSetData}
          isLoading={isLoading}
        />
      </Box>
      <Divider />
      <Box ref={context?.appRef}>
        <LineChart
          series={data?.series?.map((line: any) => ({
            ...line,
            label: line.name,
            area: true,
            valueFormatter: (v: any) =>
              v === null ? "" : valueFormatter(line?.name, v),
          }))}
          loading={data?.isLoading}
          xAxis={[
            {
              data: data?.categories?.map((time: string) =>
                getTodaysTime(time)
              ),
              scaleType: "point",
              valueFormatter: timeFormatter,
              disableTicks: true,
            },
          ]}
          yAxis={[
            {
              disableLine: true,
              disableTicks: true,
              valueFormatter: (value: number) =>
                value > 1000
                  ? `₹${(value / 1000).toFixed(1)}k`
                  : `₹${value.toFixed(1)}`,
            },
          ]}
          height={500}
          grid={{ horizontal: true }}
          legend={{ hidden: true }}
          sx={{
            "& .MuiChartsGrid-horizontalLine": {
              strokeDasharray: "10 5",
              strokeWidth: 1,
            },
            "& .MuiAreaElement-root": {
              opacity: 0.02,
            },
            "& .css-6i3py-MuiChartsSurface-root": {
              overflow: "scroll",
            },
            p: 2,
            m: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default PerformanceChart;
