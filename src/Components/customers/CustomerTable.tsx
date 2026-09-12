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

export interface Customer {
  _id: string;
  name: string;
  address: string;
  salary: number;   
  contact: string;
}

interface CustomerTableProps {
  customers: Customer[];
  loading: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void | Promise<void>;
}

const CustomerTable = ({
  customers,
  loading,
  onEdit,
  onDelete,
}: CustomerTableProps) => {
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    await onDelete(id);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid #f3f4f6",
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
            <TableCell sx={headerStyle}>Name</TableCell>
            <TableCell sx={headerStyle}>Address</TableCell>
            <TableCell sx={headerStyle}>Salary</TableCell>
            <TableCell sx={headerStyle}>Contact</TableCell>
            <TableCell
              align="right"
              sx={headerStyle}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Loading */}
          {loading &&
            [1, 2, 3, 4, 5].map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Skeleton width={140} />
                </TableCell>

                <TableCell>
                  <Skeleton width={180} />
                </TableCell>

                <TableCell>
                  <Skeleton width={100} />
                </TableCell>

                <TableCell>
                  <Skeleton width={110} />
                </TableCell>

                <TableCell align="right">
                  <Skeleton
                    width={80}
                    sx={{ ml: "auto" }}
                  />
                </TableCell>
              </TableRow>
            ))}

          {/* Empty */}
          {!loading && customers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                sx={{
                  borderBottom: "none",
                  height: 260,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      fontSize: 50,
                      color: "#d1d5db",
                    }}
                  >
                    ♧
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#6b7280",
                    }}
                  >
                    No customers found
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#9ca3af",
                    }}
                  >
                    Add a customer to get started
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {/* Customers */}
          {!loading &&
            customers.map((customer) => (
              <TableRow
                key={customer._id}
                hover
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                {/* Name */}
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {customer.name}
                  </Typography>
                </TableCell>

                {/* Address */}
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#6b7280",
                      maxWidth: 250,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {customer.address}
                  </Typography>
                </TableCell>

                {/* Salary */}
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Rs.{" "}
                    {Number(customer.salary).toLocaleString(
                      "en-LK",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </Typography>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <Chip
                    label={customer.contact}
                    size="small"
                    sx={{
                      bgcolor: "#f3f4f6",
                      color: "#374151",
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <Tooltip title="Edit Customer">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(customer)}
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
                  </Tooltip>

                  <Tooltip title="Delete Customer">
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleDelete(customer._id)
                      }
                      sx={{
                        color: "#ef4444",
                        "&:hover": {
                          bgcolor: "#fef2f2",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const headerStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase" as const,
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap" as const,
};

export default CustomerTable;