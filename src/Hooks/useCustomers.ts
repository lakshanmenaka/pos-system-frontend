import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import api from "../services/axios";
import { getApiErrorMessage } from "../utils/apiError";

export interface Customer {
  _id: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

export interface CustomerData {
  name: string;
  address: string;
  salary: number;
  contact: string;
}

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

 
  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<{
        data: Customer[];
      }>("/api/customer/load-all");

      setCustomers(response.data.data || []);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to load customers"
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);


  const createCustomer = async (
    data: CustomerData
  ) => {
    try {
      await api.post(
        "/api/customer/create",
        data
      );

      toast.success(
        "Customer saved successfully"
      );

      await loadCustomers();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to create customer"
        )
      );

      throw error;
    }
  };

 
  const updateCustomer = async (
    id: string,
    data: CustomerData
  ) => {
    try {
      await api.put(
        `/api/customer/update/${id}`,
        data
      );

      toast.success(
        "Customer updated successfully"
      );

      await loadCustomers();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to update customer"
        )
      );

      throw error;
    }
  };


  const deleteCustomer = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/api/customer/delete/${id}`
      );

      toast.success(
        "Customer deleted successfully"
      );

      await loadCustomers();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to delete customer"
        )
      );

      throw error;
    }
  };

  return {
    customers,
    loading,
    loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomers;