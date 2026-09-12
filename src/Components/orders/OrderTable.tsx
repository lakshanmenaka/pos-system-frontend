import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import type { Order } from "../../Hooks/useOrders";

interface OrderTableProps {
  orders: Order[];
  loading: boolean;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void | Promise<void>;
}

const OrderTable = ({
  orders,
  loading,
  onEdit,
  onDelete,
}: OrderTableProps) => {
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    await onDelete(id);
  };

  
  if (loading) {
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
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              <TableCell sx={headCellStyle}>
                Order ID
              </TableCell>

              <TableCell sx={headCellStyle}>
                Date
              </TableCell>

              <TableCell sx={headCellStyle}>
                Customer
              </TableCell>

              <TableCell sx={headCellStyle}>
                Products
              </TableCell>

              <TableCell sx={headCellStyle}>
                Total
              </TableCell>

              <TableCell
                sx={{
                  ...headCellStyle,
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                {[1, 2, 3, 4, 5, 6].map(
                  (cell) => (
                    <TableCell key={cell}>
                      <Skeleton
                        variant="text"
                        width={
                          cell === 6
                            ? 80
                            : "70%"
                        }
                        height={24}
                      />
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

 
  if (orders.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #f3f4f6",
          borderRadius: 3,
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: 30,
                color: "#9ca3af",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: "#374151",
            }}
          >
            No orders found
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 13,
              color: "#9ca3af",
            }}
          >
            There are no orders available.
          </Typography>
        </Box>
      </Paper>
    );
  }

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
      <Table sx={{ minWidth: 750 }}>
    

        <TableHead>
          <TableRow sx={{ bgcolor: "#f8fafc" }}>
            <TableCell sx={headCellStyle}>
              Order ID
            </TableCell>

            <TableCell sx={headCellStyle}>
              Date
            </TableCell>

            <TableCell sx={headCellStyle}>
              Customer
            </TableCell>

            <TableCell sx={headCellStyle}>
              Products
            </TableCell>

            <TableCell sx={headCellStyle}>
              Total
            </TableCell>

            <TableCell
              sx={{
                ...headCellStyle,
                textAlign: "center",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        

        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
             

              <TableCell sx={bodyCellStyle}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  #{order._id.slice(-6)}
                </Typography>
              </TableCell>

         

              <TableCell sx={bodyCellStyle}>
                {new Date(
                  order.date
                ).toLocaleDateString("en-LK")}
              </TableCell>

              

              <TableCell sx={bodyCellStyle}>
                {order.customer || "-"}
              </TableCell>

          

              <TableCell sx={bodyCellStyle}>
                {Array.isArray(order.products)
                  ? order.products.length
                  : 0}
              </TableCell>

           

              <TableCell sx={bodyCellStyle}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Rs.{" "}
                  {Number(
                    order.totalCost || 0
                  ).toLocaleString("en-LK", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </TableCell>

             

              <TableCell
                sx={{
                  ...bodyCellStyle,
                  textAlign: "center",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => onEdit(order)}
                  sx={{
                    mr: 0.5,
                    color: "#6b7280",
                    "&:hover": {
                      bgcolor: "#f3f4f6",
                      color: "#111827",
                    },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() =>
                    handleDelete(order._id)
                  }
                  sx={{
                    color: "#6b7280",
                    "&:hover": {
                      bgcolor: "#fef2f2",
                      color: "#dc2626",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const headCellStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase" as const,
  whiteSpace: "nowrap" as const,
  borderBottom: "1px solid #e5e7eb",
  py: 2,
  px: 2.5,
};

const bodyCellStyle = {
  fontSize: 14,
  color: "#6b7280",
  borderBottom: "1px solid #f9fafb",
  py: 2,
  px: 2.5,
  whiteSpace: "nowrap" as const,
};



export default OrderTable;