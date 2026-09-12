import { useState } from "react";

import { Box } from "@mui/material";

import PageHeader from "../Components/dashboard/PageHeader";
import CustomerTable from "../Components/customers/CustomerTable";
import CustomerForm from "../Components/customers/CustomerForm";

import useCustomers from "../Hooks/useCustomers";

export interface Customer {
  _id: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

const Customers = () => {
  const {
    customers,
    loading,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const [openForm, setOpenForm] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpenForm(true);
  };

  const handleEdit = (
    customer: Customer
  ) => {
    setSelectedCustomer(customer);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setSelectedCustomer(null);
  };

  const handleSubmit = async (
    data: Omit<Customer, "_id">
  ) => {
    if (selectedCustomer) {
      await updateCustomer(
        selectedCustomer._id,
        data
      );
    } else {
      await createCustomer(data);
    }

    handleClose();
  };

  return (
    <Box>
      <PageHeader
        title="Customers"
        subtitle="Manage your customers"
        buttonText="Add Customer"
        onButtonClick={handleAdd}
      />

      <CustomerTable
        customers={customers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deleteCustomer}
      />

      <CustomerForm
        open={openForm}
        customer={selectedCustomer}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Customers;