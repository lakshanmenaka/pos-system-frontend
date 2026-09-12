import {
  Box,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Product } from "../../Pages/Products";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "#f8fafc",
            }}
          >
            <TableCell
              sx={{
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Product
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Unit Price
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Quantity
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Stock Status
            </TableCell>

            <TableCell
              align="right"
              sx={{
                fontWeight: 700,
                color: "#374151",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((row) => (
                <TableRow key={row}>
                  <TableCell>
                    <Skeleton width="70%" />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={80} />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={60} />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={90} />
                  </TableCell>

                  <TableCell align="right">
                    <Skeleton
                      width={80}
                      sx={{ ml: "auto" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                sx={{ py: 6 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    color="text.primary"
                    sx={{ fontWeight: 600 }}
                  >
                    No products found
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Add your first product to get
                    started.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow
                key={product._id}
                hover
              >
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.description}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ fontWeight: 500 }}>
                    Rs.{" "}
                    {Number(
                      product.unitPrice
                    ).toLocaleString(
                      "en-LK",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </Typography>
                </TableCell>

                <TableCell>
                  {product.qtyOnHand}
                </TableCell>

                <TableCell>
                  {product.qtyOnHand === 0 ? (
                    <Chip
                      label="Out of Stock"
                      size="small"
                      color="error"
                    />
                  ) : product.qtyOnHand <= 10 ? (
                    <Chip
                      label="Low Stock"
                      size="small"
                      color="warning"
                    />
                  ) : (
                    <Chip
                      label="In Stock"
                      size="small"
                      color="success"
                    />
                  )}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Edit Product">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        onEdit(product)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Product">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        onDelete(product._id)
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;