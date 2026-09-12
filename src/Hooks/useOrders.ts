import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import api from "../services/axios";
import { getApiErrorMessage } from "../utils/apiError";

export interface Order {
  _id: string;
  date: string;
  totalCost: number;
  products: unknown[];
  customer: string;
}

export interface OrderData {
  date: string;
  totalCost: number;
  products: unknown[];
  customer: string;
}

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);


  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<{
        data: Order[];
      }>("/api/order/load-all");

      setOrders(response.data.data || []);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to load orders"
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);


  const createOrder = async (
    data: OrderData
  ) => {
    try {
      await api.post(
        "/api/order/create",
        data
      );

      toast.success(
        "Order created successfully"
      );

      await loadOrders();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to create order"
        )
      );

      throw error;
    }
  };

  // Update order
  const updateOrder = async (
    id: string,
    data: OrderData
  ) => {
    try {
      await api.put(
        `/api/order/update/${id}`,
        data
      );

      toast.success(
        "Order updated successfully"
      );

      await loadOrders();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to update order"
        )
      );

      throw error;
    }
  };

  // Delete order
  const deleteOrder = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/api/order/delete/${id}`
      );

      toast.success(
        "Order deleted successfully"
      );

      await loadOrders();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to delete order"
        )
      );

      throw error;
    }
  };

  return {
    orders,
    loading,
    loadOrders,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};

export default useOrders;