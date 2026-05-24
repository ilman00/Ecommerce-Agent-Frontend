import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";
import PromptInput from "../components/PromptInput";
import ListingCard from "../components/ListingCard";
import AdsCard from "../components/AdsCard";
import ShopifyCard from "../components/ShopifyCard";
import { runAgent, createThread, getThreads, deleteThread, getThreadMessages } from "../services/agentService";
import type { AgentResponse } from "../types";
import { useParams } from "react-router-dom";
import MessageRenderer from "../components/MessageRenderer";

interface Message {
  role: 'user' | 'assistant'
  text: string
  content: AgentResponse | null
}

interface Thread {
  _id: string
  title: string
  updatedAt: string
}

export default function Dashboard() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const uploaderRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { storeId } = useParams<{ storeId: string }>();

  useEffect(() => {
    async function loadThreads() {
      try {
        const data = await getThreads(storeId!);
        console.log(data)
        setThreads(data);
      } catch {}
    }
    loadThreads();
  }, [storeId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSelectThread(threadId: string) {
    setActiveThreadId(threadId);
    setMessages([]);
    setSidebarOpen(false);
    try {
      const data = await getThreadMessages(threadId);
      const mapped = data.map((c: any) => ({
        role: c.role,
        text: c.content,
        content: null
      }));
      setMessages(mapped);
    } catch {
      alert("Failed to load messages");
    }
  }

  async function handleNewChat() {
    setActiveThreadId(null);
    setMessages([]);
    setImageUrl(null);
    setShowUploader(false);
    setSidebarOpen(false);
  }

  async function handleDeleteThread(e: React.MouseEvent, threadId: string) {
    e.stopPropagation();
    try {
      await deleteThread(threadId);
      setThreads(prev => prev.filter(t => t._id !== threadId));
      if (activeThreadId === threadId) {
        setActiveThreadId(null);
        setMessages([]);
      }
    } catch {
      alert("Failed to delete thread");
    }
  }

  function handleAttach() {
    setShowUploader(true);
    setTimeout(() => uploaderRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  async function handleSubmit(message: string) {
    setMessages(prev => [...prev, { role: 'user', text: message, content: null }]);
    setLoading(true);
    try {
      let threadId = activeThreadId;
      if (!threadId) {
        const thread = await createThread(storeId!, message);
        threadId = thread._id;
        setActiveThreadId(thread._id);
        setThreads(prev => [thread, ...prev]);
      }
      const data = await runAgent(message, storeId!, threadId!, imageUrl ?? undefined);
      setMessages(prev => [...prev, { role: 'assistant', text: data.summary, content: data }]);
    } catch {
      alert("Agent request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-[#0a0a0a] border-r border-white/10
          flex flex-col gap-2 p-4 overflow-y-auto
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/30 uppercase tracking-widest font-medium">Chats</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white/30 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            New Chat
          </button>

          <div className="flex flex-col gap-1 mt-2">
            {threads.map(thread => {
              return (
              <div
                key={thread._id}
                onClick={() => handleSelectThread(thread._id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors text-sm ${
                  activeThreadId === thread._id
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                }`}
              >
                <span className="truncate flex-1">{thread.title}</span>
                <button
                  onClick={(e) => handleDeleteThread(e, thread._id)}
                  className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all ml-2 text-xs"
                >
                  ✕
                </button>
              </div>
            )})}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Top bar with sidebar toggle */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white/40 hover:text-white transition-colors"
            >
              {/* Hamburger icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm text-white/40 truncate">
              {activeThreadId ? threads.find(t => t._id === activeThreadId)?.title : 'New Chat'}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">

              {messages.length === 0 && !loading && (
                <div className="text-center mt-20">
                  <h1 className="text-2xl font-semibold text-white mb-2">AI Agent</h1>
                  <p className="text-sm text-white/30">Generate listings, ads, and publish to your store.</p>
                </div>
              )}

              {showUploader && (
                <div ref={uploaderRef}>
                  <ImageUploader onUpload={(url) => setImageUrl(url)} />
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-2xl max-w-xs break-words">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {msg.content?.results.generate_listing && <ListingCard listing={msg.content.results.generate_listing} />}
                      {msg.content?.results.generate_ads && <AdsCard ads={msg.content.results.generate_ads} />}
                      {msg.content?.results.publish_to_shopify && <ShopifyCard shopify={msg.content.results.publish_to_shopify} />}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-xs text-white/30 font-medium mb-1">Agent Summary</p>
                        <MessageRenderer content={msg.text} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  <p className="text-sm text-white/40">Agent is working...</p>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Prompt Input */}
          <div className="px-6 py-4 border-t border-white/10">
            <div className="max-w-2xl mx-auto">
              <PromptInput
                onSubmit={handleSubmit}
                onAttach={handleAttach}
                loading={loading}
                hasImage={!!imageUrl}
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}