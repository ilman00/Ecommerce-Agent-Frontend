import api from "./api";
import type { Store } from "../types";
import { API_BASE_URL } from "../config";
import { useAuthStore } from "../store/authStore";

interface StoresResponse {
  success: boolean;
  data: Store[];
}

export async function getStores(): Promise<Store[]> {
  const res = await api.get<StoresResponse>("/stores");
  return res.data.data;
}

export function connectShopify(shop: string): void {
  const token = useAuthStore.getState().getAccessToken();
  window.location.href = `${API_BASE_URL}/stores/shopify/connect?shop=${shop}&token=${token}`;
}