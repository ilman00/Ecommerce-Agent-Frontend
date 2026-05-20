import api from "./api";
import type { AgentResponse } from "../types";

export async function runAgent(
  message: string,
  storeId: string,
  conversationId: string,
  imageUrl?: string
): Promise<AgentResponse> {
  const res = await api.post<AgentResponse>("/agent", {
    message,
    storeId,
    conversationId,
    imageUrl,
  });
  return res.data;
}

export async function createThread(storeId: string, firstMessage: string) {
  const res = await api.post(`/conversations/${storeId}`, { firstMessage });
  return res.data.thread;
}

export async function getThreads(storeId: string) {
  const res = await api.get(`/conversations/${storeId}`);
  return res.data.threads;
}

export async function deleteThread(threadId: string) {
  const res = await api.delete(`/conversations/${threadId}`);
  return res.data;
}

export async function getThreadMessages(threadId: string) {
  const res = await api.get(`/conversations/${threadId}/messages`);
  return res.data.messages;
}