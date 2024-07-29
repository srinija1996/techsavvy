import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PerformanceChart from "./PerformanceChart";
import HeatMapComponent from "./HeatMap";
import { getHeatMapList, getPerformanceList } from "../../services";
import { DataProps } from "../../interfaces";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState<DataProps>({
    categories: [],
    series: [],
    isLoading: false,
  });
  const [HeatMapData, setHeatMapData] = useState({
    data: [],
    rangeDetails: {},
    isLoading: false,
    totalRow: [],
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "CR_perc",
    "ACOS",
    "ROAS",
  ]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    onSetData(selectedCategories);
  }, [selectedCategories]);

  const onSetData = async (selectedCategories: string[] | []) => {
    setData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    setHeatMapData((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    getPerformanceList({
      metrics: selectedCategories,
    })
      .then((response) =>
        setData((prevState) => ({
          ...prevState,
          ...response.data.result,
        }))
      )
      .catch((err) => console.log(err))
      .finally(() =>
        setData((prevState) => ({
          ...prevState,
          isLoading: false,
        }))
      );
    getHeatMapList({
      metrics: selectedCategories,
    })
      .then((response) =>
        setHeatMapData((prevState) => ({
          ...prevState,
          data: response.data.result,
          rangeDetails: response.data.rangeDetails,
          totalRow: response.data.result.map(() => {
            const entriesList = Object.entries(response.data.result[0]).filter(
              (entryItem) => entryItem[0].startsWith("Total")
            );
            return entriesList.map((entry) => entry[1]);
          }),
        }))
      )
      .catch((err) => console.log(err))
      .finally(() =>
        setHeatMapData((prevState) => ({
          ...prevState,
          isLoading: false,
        }))
      );
  };

  if (!token) return <Navigate to="/" />;

  return (
    <Box sx={{ p: "10px" }}>
      <PerformanceChart
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        onSetData={onSetData}
        data={data}
        isLoading={data?.isLoading || HeatMapData.isLoading}
      />
      <Box sx={{ pb: 5 }}>
        <HeatMapComponent
          heatMapData={HeatMapData}
          selectedCategories={selectedCategories}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
