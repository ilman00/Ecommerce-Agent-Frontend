import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";
import PromptInput from "../components/PromptInput";
import ListingCard from "../components/ListingCard";
import AdsCard from "../components/AdsCard";
import ShopifyCard from "../components/ShopifyCard";
import { runAgent, getConversations } from "../services/agentService";
import type { AgentResponse } from "../types";
import { useParams } from "react-router-dom";
import MessageRenderer from "../components/MessageRenderer";

interface Message {
  role: 'user' | 'assistant'
  text: string
  content: AgentResponse | null
}

export default function Dashboard() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const uploaderRef = useRef<HTMLDivElement>(null);
  const { storeId } = useParams<{ storeId: string }>();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  async function loadHistory() {
    try {
      const conversations = await getConversations(storeId!);
      const mapped = conversations.map((c: any) => ({
        role: c.role,
        text: c.content,
        content: null  // historical messages won't have structured card data
      }));
      setMessages(mapped);
    } catch {
      // silently fail — empty chat is fine
    }
  }
  loadHistory();
}, [storeId]);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);

  function handleAttach() {
    setShowUploader(true);
    setTimeout(() => uploaderRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  async function handleSubmit(message: string) {
    setMessages(prev => [...prev, { role: 'user', text: message, content: null }]);
    setLoading(true);
    try {
      const data = await runAgent(message, storeId!, imageUrl ?? undefined);
      setMessages(prev => [...prev, { role: 'assistant', text: data.summary, content: data }]);
    } catch {
      alert("Agent request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-semibold text-white">AI Agent</h1>
          <p className="text-sm text-white/30 mt-1">Generate listings, ads, and publish to your store.</p>
        </div>

        {showUploader && (
          <div ref={uploaderRef}>
            <ImageUploader onUpload={(url) => setImageUrl(url)} />
          </div>
        )}

        {/* Chat History */}
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-white/10 text-white text-sm px-4 py-2 rounded-2xl max-w-xs">
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
        </div>

        {loading && (
          <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <p className="text-sm text-white/40">Agent is working...</p>
          </div>
        )}

        <div ref={bottomRef} />
        <PromptInput
          onSubmit={handleSubmit}
          onAttach={handleAttach}
          loading={loading}
          hasImage={!!imageUrl}
        />

      </main>
    </div>
  );
}