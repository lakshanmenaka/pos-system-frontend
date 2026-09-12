import { useState } from "react";

import { Box } from "@mui/material";

import PageHeader from "../Components/dashboard/PageHeader";
import ProductTable from "../Components/products/ProductTable";
import ProductForm from "../Components/products/ProductForm";

import useProducts from "../Hooks/useProducts";

export interface Product {
  _id: string;
  description: string;
  unitPrice: number;
  qtyOnHand: number;
}

const Products = () => {
  const {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [openForm, setOpenForm] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setOpenForm(true);
  };

  const handleEdit = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (
    data: Omit<Product, "_id">
  ) => {
    if (selectedProduct) {
      await updateProduct(
        selectedProduct._id,
        data
      );
    } else {
      await createProduct(data);
    }

    handleClose();
  };

  return (
    <Box>
      <PageHeader
        title="Products"
        subtitle="Manage your products and stock"
        buttonText="Add Product"
        onButtonClick={handleAdd}
      />

      <ProductTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deleteProduct}
      />

      <ProductForm
        open={openForm}
        product={selectedProduct}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Products;