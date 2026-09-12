import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

interface DataTableProps {
  columns: string[];
  children: ReactNode;
  empty?: boolean;
  emptyMessage?: string;
}

const DataTable = ({
  columns,
  children,
  empty = false,
  emptyMessage = "No data available",
}: DataTableProps) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid #f3f4f6",
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "#f8fafc",
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {empty ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{
                  height: 220,
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#9ca3af",
                  }}
                >
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;