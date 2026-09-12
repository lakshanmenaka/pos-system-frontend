import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import api from "../services/axios";
import { getApiErrorMessage } from "../utils/apiError";

export interface Product {
  _id: string;
  description: string;
  unitPrice: number;
  qtyOnHand: number;
}

export interface ProductData {
  description: string;
  unitPrice: number;
  qtyOnHand: number;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

 
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<{
        data: Product[];
      }>("/api/product/load-all");

      setProducts(response.data.data || []);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to load products"
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

 
  const createProduct = async (
    data: ProductData
  ) => {
    try {
      await api.post(
        "/api/product/create",
        data
      );

      toast.success(
        "Product saved successfully"
      );

      await loadProducts();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to create product"
        )
      );

      throw error;
    }
  };


  const updateProduct = async (
    id: string,
    data: ProductData
  ) => {
    try {
      await api.put(
        `/api/product/update/${id}`,
        data
      );

      toast.success(
        "Product updated successfully"
      );

      await loadProducts();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to update product"
        )
      );

      throw error;
    }
  };

  
  const deleteProduct = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/api/product/delete/${id}`
      );

      toast.success(
        "Product deleted successfully"
      );

      await loadProducts();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to delete product"
        )
      );

      throw error;
    }
  };

  return {
    products,
    loading,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;