// src/services/agentService.ts
import api from "./api";
import type { AgentResponse } from "../types";

export async function runAgent(
  message: string,
  storeId: string,
  imageUrl?: string
): Promise<AgentResponse> {
  const res = await api.post<AgentResponse>("/agent", {
    message,
    storeId,
    imageUrl,
  });

  return res.data;
}

export async function getConversations(storeId: string) {
  const res = await api.get(`/conversations/${storeId}`);
  return res.data.conversations;
}