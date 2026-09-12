import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

import { storage } from "../utils/storage";

import useCustomers from "../Hooks/useCustomers";
import useProducts from "../Hooks/useProducts";
import useOrders from "../Hooks/useOrders";

interface Customer {
  _id: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

interface Order {
  _id: string;
  date: string;
  totalCost: number;
  products: unknown[];
  customer: string;
}

const Dashboard = () => {
  const user = storage.getUser();

  const fullName = user?.fullName?.trim() || "User";

  const { customers } = useCustomers();
  const { products } = useProducts();
  const { orders } = useOrders();

  const [isGeneratingPdf, setIsGeneratingPdf] =
    useState(false);



  const totalSales = useMemo(() => {
    return orders.reduce(
      (total: number, order: Order) =>
        total + Number(order.totalCost || 0),
      0
    );
  }, [orders]);


  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a: Order, b: Order) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 5);
  }, [orders]);


  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (item: Customer) => item._id === customerId
    );

    return customer?.name || customerId || "Unknown";
  };

 

  const formatCurrency = (value: number) => {
    return `Rs. ${value.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  

  const formatDate = (date: string) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  

  const generatePdf = () => {
    try {
      setIsGeneratingPdf(true);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        doc.internal.pageSize.getWidth();

      const pageHeight =
        doc.internal.pageSize.getHeight();

     

      doc.setTextColor(17, 24, 39);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(20);

      doc.text(
        "ORDER SUMMARY",
        15,
        21
      );

      
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.setTextColor(
        100,
        116,
        139
      );

      doc.text(
        "Point of Sale System",
        15,
        28
      );

     
      doc.setTextColor(
        37,
        99,
        235
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(18);

      doc.text(
        "POSZ",
        pageWidth - 15,
        24,
        {
          align: "right",
        }
      );


      doc.setDrawColor(
        226,
        232,
        240
      );

      doc.setLineWidth(0.5);

      doc.line(
        15,
        37,
        pageWidth - 15,
        37
      );

  
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        100,
        116,
        139
      );

      doc.text(
        "Prepared For",
        15,
        47
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setTextColor(
        30,
        41,
        59
      );

      doc.text(
        fullName,
        15,
        53
      );

    
      const generatedDate =
        new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        100,
        116,
        139
      );

      doc.text(
        "Generated Date",
        pageWidth - 15,
        47,
        {
          align: "right",
        }
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setTextColor(
        30,
        41,
        59
      );

      doc.text(
        generatedDate,
        pageWidth - 15,
        53,
        {
          align: "right",
        }
      );


      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(11);

      doc.setTextColor(
        17,
        24,
        39
      );

      doc.text(
        "Business Summary",
        15,
        67
      );

     
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.setTextColor(
        71,
        85,
        105
      );

      doc.text(
        `Total Customers : ${customers.length}`,
        15,
        77
      );

      doc.text(
        `Total Products  : ${products.length}`,
        15,
        84
      );

      doc.text(
        `Total Orders    : ${orders.length}`,
        15,
        91
      );

      doc.text(
        `Total Sales     : ${formatCurrency(
          totalSales
        )}`,
        15,
        98
      );

   

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(11);

      doc.setTextColor(
        17,
        24,
        39
      );

      doc.text(
        "Recent Orders",
        15,
        112
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        100,
        116,
        139
      );

      doc.text(
        "Latest order transactions",
        15,
        118
      );

     

      if (recentOrders.length > 0) {
        autoTable(doc, {
          startY: 124,

          head: [
            [
              "ORDER ID",
              "DATE",
              "CUSTOMER",
              "TOTAL",
            ],
          ],

          body: recentOrders.map(
            (order: Order) => [
              `#${order._id
                .slice(-6)
                .toUpperCase()}`,

              formatDate(
                order.date
              ),

              getCustomerName(
                order.customer
              ),

              formatCurrency(
                order.totalCost
              ),
            ]
          ),

         

          theme: "grid",

          styles: {
            font: "helvetica",
            fontSize: 8.5,
            cellPadding: 3.5,

            textColor: [
              51,
              65,
              85,
            ],

            lineColor: [
              226,
              232,
              240,
            ],

            lineWidth: 0.25,

            valign: "middle",
          },

       

          headStyles: {
            fillColor: [
              37,
              99,
              235,
            ],

            textColor: [
              255,
              255,
              255,
            ],

            fontStyle: "bold",

            fontSize: 8,
          },

         

          alternateRowStyles: {
            fillColor: [
              248,
              250,
              252,
            ],
          },

        

          columnStyles: {
            0: {
              cellWidth: 35,
            },

            1: {
              cellWidth: 32,
            },

            2: {
              cellWidth: "auto",
            },

            3: {
              cellWidth: 38,
              halign: "right",
            },
          },

       

          margin: {
            left: 15,
            right: 15,
            bottom: 22,
          },

         
          didDrawPage: (data) => {
          

            doc.setDrawColor(
              226,
              232,
              240
            );

            doc.setLineWidth(0.3);

            doc.line(
              15,
              pageHeight - 17,
              pageWidth - 15,
              pageHeight - 17
            );

            

            doc.setFont(
              "helvetica",
              "normal"
            );

            doc.setFontSize(7);

            doc.setTextColor(
              100,
              116,
              139
            );

            doc.text(
              "POSZ - Point of Sale System",
              15,
              pageHeight - 10
            );

          

            doc.text(
              `Page ${data.pageNumber}`,
              pageWidth - 15,
              pageHeight - 10,
              {
                align: "right",
              }
            );
          },
        });
      } else {
      

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(9);

        doc.setTextColor(
          100,
          116,
          139
        );

        doc.text(
          "No orders available.",
          pageWidth / 2,
          132,
          {
            align: "center",
          }
        );

    

        doc.setDrawColor(
          226,
          232,
          240
        );

        doc.setLineWidth(0.3);

        doc.line(
          15,
          pageHeight - 17,
          pageWidth - 15,
          pageHeight - 17
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(7);

        doc.setTextColor(
          100,
          116,
          139
        );

        doc.text(
          "POSZ - Point of Sale System",
          15,
          pageHeight - 10
        );

        doc.text(
          "Page 1",
          pageWidth - 15,
          pageHeight - 10,
          {
            align: "right",
          }
        );
      }

  

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      doc.save(
        `POSZ-Order-Summary-${today}.pdf`
      );
    } catch (error) {
      console.error(
        "PDF generation error:",
        error
      );

      alert(
        "PDF generate කිරීමේදී error එකක් ආවා."
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
 
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 22,
              sm: 24,
              md: 26,
            },
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#111827",
          }}
        >
          Good Morning,  👋
        </Typography>

        <Typography
          sx={{
            mt: 0.6,
            fontSize: 13,
            color: "#64748b",
          }}
        >
          Here's what's happening with your business today.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
      

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            minHeight: 160,
          }}
        >
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Total Customers
              </Typography>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111827",
                }}
              >
                <PeopleAltOutlinedIcon />
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#111827",
              }}
            >
              {customers.length}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              All registered customers
            </Typography>
          </CardContent>
        </Card>

       

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            minHeight: 160,
          }}
        >
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Total Products
              </Typography>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111827",
                }}
              >
                <Inventory2OutlinedIcon />
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#111827",
              }}
            >
              {products.length}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              Products in inventory
            </Typography>
          </CardContent>
        </Card>

       
        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            minHeight: 160,
          }}
        >
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Total Orders
              </Typography>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111827",
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#111827",
              }}
            >
              {orders.length}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              Orders placed
            </Typography>
          </CardContent>
        </Card>

        {/* SALES */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            minHeight: 160,
          }}
        >
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Total Sales
              </Typography>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111827",
                }}
              >
                <AttachMoneyOutlinedIcon />
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  md: 28,
                },
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#111827",
              }}
            >
              {formatCurrency(totalSales)}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              Total sales revenue
            </Typography>
          </CardContent>
        </Card>
      </Box>

    
      <Card
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          overflow: "hidden",
          mb: 3,
        }}
      >
    

        <Box
          sx={{
            px: 2.5,
            py: 2.2,
            borderBottom:
              "1px solid #eef2f7",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Recent Orders
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              Your latest orders
            </Typography>
          </Box>

       

          <Button
            variant="outlined"
            size="small"
            onClick={generatePdf}
            disabled={isGeneratingPdf}
            startIcon={
              <PictureAsPdfOutlinedIcon
                sx={{
                  fontSize: 18,
                }}
              />
            }
            sx={{
              minWidth: 90,
              height: 36,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,

              color: "#2563eb",

              borderColor: "#2563eb",

              "&:hover": {
                borderColor: "#1d4ed8",
                backgroundColor: "#eff6ff",
              },

              "&.Mui-disabled": {
                color: "#94a3b8",
                borderColor: "#cbd5e1",
              },
            }}
          >
            {isGeneratingPdf
              ? "Generating..."
              : "PDF"}
          </Button>
        </Box>

        

        {recentOrders.length === 0 ? (
          <Box
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              No orders available
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      borderBottom:
                        "1px solid #eef2f7",
                      py: 1.5,
                      px: 2.5,
                    }}
                  >
                    Order ID
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      borderBottom:
                        "1px solid #eef2f7",
                      py: 1.5,
                    }}
                  >
                    Date
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      borderBottom:
                        "1px solid #eef2f7",
                      py: 1.5,
                    }}
                  >
                    Customer
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      borderBottom:
                        "1px solid #eef2f7",
                      py: 1.5,
                      px: 2.5,
                    }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentOrders.map(
                  (order: Order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      

                      <TableCell
                        sx={{
                          fontSize: 13,
                          color: "#64748b",
                          py: 1.6,
                          px: 2.5,
                        }}
                      >
                        #{order._id.slice(-6)}
                      </TableCell>

                  

                      <TableCell
                        sx={{
                          fontSize: 13,
                          color: "#64748b",
                          py: 1.6,
                        }}
                      >
                        {formatDate(
                          order.date
                        )}
                      </TableCell>

                    

                      <TableCell
                        sx={{
                          fontSize: 13,
                          color: "#64748b",
                          py: 1.6,
                        }}
                      >
                        {getCustomerName(
                          order.customer
                        )}
                      </TableCell>

                      

                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#111827",
                          py: 1.6,
                          px: 2.5,
                        }}
                      >
                        {formatCurrency(
                          order.totalCost
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Dashboard;