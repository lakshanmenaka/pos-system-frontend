import api from "./axios";

export interface Product {
  _id: string;
  description: string;
  unitPrice: number;
  qtyOnHand: number;
}

export type ProductPayload = Omit<Product, "_id">;

export const productService = {
  async getAll() {
    const response = await api.get<{ data: Product[] }>(
      "/api/product/load-all"
    );

    return response.data.data;
  },

  async getById(id: string) {
    const response = await api.get<{ data: Product }>(
      `/api/product/find-by-id/${id}`
    );

    return response.data.data;
  },

  async create(data: ProductPayload) {
    const response = await api.post(
      "/api/product/create",
      data
    );

    return response.data;
  },

  async update(
    id: string,
    data: ProductPayload
  ) {
    const response = await api.put(
      `/api/product/update/${id}`,
      data
    );

    return response.data;
  },

  async remove(id: string) {
    const response = await api.delete(
      `/api/product/delete/${id}`
    );

    return response.data;
  },
};