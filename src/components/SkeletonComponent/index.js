import {
  Skeleton,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const rows = [1, 2, 3, 4, 5];
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SkeletonComponent = () => (
  <TableContainer>
    <Table>
      {rows.map(() => (
        <TableRow>
          {columns.map(() => (
            <TableCell colSpan={1} sx={{ p: 0, border: "solid 3px white" }}>
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width="80px"
                height="35px"
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  </TableContainer>
);

export default SkeletonComponent;
