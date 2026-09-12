import { useState } from "react";

import { Box } from "@mui/material";

import PageHeader from "../Components/dashboard/PageHeader";
import OrderTable from "../Components/orders/OrderTable";
import OrderForm from "../Components/orders/OrderForm";

import useOrders from "../Hooks/useOrders";
import useCustomers from "../Hooks/useCustomers";
import useProducts from "../Hooks/useProducts";

export interface OrderItem {
  product: string;
  qty: number;
}

export interface Order {
  _id: string;
  date: string;
  totalCost: number;
  products: OrderItem[];
  customer: string;
}

const Orders = () => {
  const {
    orders,
    loading,
    createOrder,
    updateOrder,
    deleteOrder,
  } = useOrders();

  const { customers } = useCustomers();

  const { products } = useProducts();

  const [openForm, setOpenForm] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const handleAdd = () => {
    setSelectedOrder(null);
    setOpenForm(true);
  };

  const handleEdit = (
    order: Order
  ) => {
    setSelectedOrder(order);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setSelectedOrder(null);
  };

  const handleSubmit = async (
    data: Omit<Order, "_id">
  ) => {
    if (selectedOrder) {
      await updateOrder(
        selectedOrder._id,
        data
      );
    } else {
      await createOrder(data);
    }

    handleClose();
  };

  return (
    <Box>
      <PageHeader
        title="Orders"
        subtitle="Manage customer orders"
        buttonText="Create Order"
        onButtonClick={handleAdd}
      />

      <OrderTable
        orders={orders}
        loading={loading}
        onEdit={(order) => handleEdit(order as Order)}
        onDelete={deleteOrder}
      />

      <OrderForm
        open={openForm}
        order={selectedOrder}
        customers={customers}
        products={products}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Orders;