import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { HeatMapListProps } from "../../../interfaces";
import { colorMapping } from "../../../utils/colorMapping";
import { timeInAMPM } from "../../../utils/dates";
import { Suspense, useContext, useEffect } from "react";
import { AppContext } from "../../../App";
import { valueFormatter } from "../../../utils/valueFormatter";
import Skeleton from "../../../components/SkeletonComponent";
import SkeletonComponent from "../../../components/SkeletonComponent";

const getList = (obj: any) => {
  return Object.keys(obj).filter((key) => !["show", "time_part"].includes(key));
};

const HeatMapComponent = ({
  heatMapData,
  selectedCategories,
}: HeatMapListProps) => {
  const { data, rangeDetails, isLoading } = heatMapData;
  const context = useContext(AppContext);

  useEffect(() => {
    if (context) {
      const { mainContentRef, setMainContentHeight } = context;
      setMainContentHeight(mainContentRef?.current?.scrollHeight);
    }
  });
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        mt: "10px",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <Typography>Heat Map</Typography>
        <Typography sx={{ color: "gray" }} variant="caption">
          Select Hours to schedule Dayparting
        </Typography>
      </Box>
      <Box p={2}>
        {isLoading || data?.length === 0 ? (
          <Skeleton />
        ) : (
          <Suspense fallback={<SkeletonComponent />}>
            <TableContainer sx={{ width: "98%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      sx={{ borderBottom: "none" }}
                    ></TableCell>
                    {data?.map((item) => (
                      <TableCell
                        size="small"
                        align="center"
                        colSpan={selectedCategories.length}
                        sx={{ borderBottom: "none", color: "gray" }}
                      >
                        {item.weekday}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ borderBottom: "none" }}
                      size="small"
                      colSpan={1}
                    ></TableCell>
                    {data?.map(() =>
                      selectedCategories.map((category) => (
                        <TableCell size="small" align="center" colSpan={1}>
                          {category}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data[0]?.Hourly_Data.map((hourlyData: any, ind: any) => (
                    <>
                      <TableRow>
                        <TableCell
                          sx={{ border: "none", color: "gray" }}
                          size="small"
                          align="left"
                          colSpan={1}
                        >
                          {timeInAMPM(data[0]?.Hourly_Data?.[ind]?.time_part)}
                        </TableCell>
                        {data?.map((item) => {
                          return getList(item?.Hourly_Data[ind])?.map((key) => (
                            <TableCell
                              sx={{
                                color: "blue",
                                border: "solid 3px white",
                                backgroundColor: colorMapping({
                                  minValue: rangeDetails[key]?.min,
                                  maxValue: rangeDetails[key]?.max,
                                  index: selectedCategories.indexOf(key),
                                  value: Number(item?.Hourly_Data[ind][key]),
                                  reverse: [
                                    "CPC",
                                    "CPM",
                                    "CPO",
                                    "ACOS",
                                    "CPA",
                                  ].includes(key),
                                }),
                              }}
                              size="small"
                              align="center"
                              colSpan={1}
                            >
                              {valueFormatter(key, item?.Hourly_Data[ind][key])}
                            </TableCell>
                          ));
                        })}
                      </TableRow>
                    </>
                  ))}
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: 600 }}
                      size="small"
                      align="left"
                      colSpan={1}
                    >
                      Total
                    </TableCell>
                    {heatMapData?.totalRow.flat().map((val: any) => (
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          border: "solid 3px white",
                          borderBottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        }}
                        size="small"
                        align="center"
                        colSpan={1}
                      >
                        {val.toFixed(2)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default HeatMapComponent;
