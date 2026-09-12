import api from "./axios";

export interface Customer {
  _id: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

export type CustomerPayload = Omit<Customer, "_id">;

export const customerService = {
  async getAll() {
    const response = await api.get<{ data: Customer[] }>(
      "/api/customer/load-all"
    );

    return response.data.data;
  },

  async getById(id: string) {
    const response = await api.get<{ data: Customer }>(
      `/api/customer/find-by-id/${id}`
    );

    return response.data.data;
  },

  async create(data: CustomerPayload) {
    const response = await api.post(
      "/api/customer/create",
      data
    );

    return response.data;
  },

  async update(
    id: string,
    data: CustomerPayload
  ) {
    const response = await api.put(
      `/api/customer/update/${id}`,
      data
    );

    return response.data;
  },

  async remove(id: string) {
    const response = await api.delete(
      `/api/customer/delete/${id}`
    );

    return response.data;
  },
};