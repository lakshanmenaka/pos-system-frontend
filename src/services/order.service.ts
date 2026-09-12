import api from "./axios";

export interface OrderProduct {
  product: string;
  qty: number;
}

export interface Order {
  _id: string;
  date: string;
  totalCost: number;
  products: OrderProduct[];
  customer: string;
}

export type OrderPayload = Omit<Order, "_id">;

export const orderService = {
  async getAll() {
    const response = await api.get<{ data: Order[] }>(
      "/api/order/load-all"
    );

    return response.data.data;
  },

  async getById(id: string) {
    const response = await api.get<{ data: Order }>(
      `/api/order/find-by-id/${id}`
    );

    return response.data.data;
  },

  async create(data: OrderPayload) {
    const response = await api.post(
      "/api/order/create",
      data
    );

    return response.data;
  },

  async update(
    id: string,
    data: OrderPayload
  ) {
    const response = await api.put(
      `/api/order/update/${id}`,
      data
    );

    return response.data;
  },

  async remove(id: string) {
    const response = await api.delete(
      `/api/order/delete/${id}`
    );

    return response.data;
  },
};