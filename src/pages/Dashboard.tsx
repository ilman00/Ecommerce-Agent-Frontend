import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";
import PromptInput from "../components/PromptInput";
import ListingCard from "../components/ListingCard";
import AdsCard from "../components/AdsCard";
import ShopifyCard from "../components/ShopifyCard";
import { runAgent } from "../services/agentService";
import type { AgentResponse } from "../types";
import { useParams } from "react-router-dom";
import MessageRenderer from "../components/MessageRenderer";

export default function Dashboard() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AgentResponse | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const uploaderRef = useRef<HTMLDivElement>(null);
  const { storeId } = useParams<{ storeId: string }>();

  function handleAttach() {
    setShowUploader(true);
    setTimeout(() => uploaderRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  async function handleSubmit(message: string) {
    setLoading(true);
    try {
      const data = await runAgent(message, storeId! ,imageUrl ?? undefined);
      setResult(data);
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

        <PromptInput
          onSubmit={handleSubmit}
          onAttach={handleAttach}
          loading={loading}
          hasImage={!!imageUrl}
        />

        {loading && (
          <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <p className="text-sm text-white/40">Agent is working...</p>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-4">
            {result.results.generate_listing && <ListingCard listing={result.results.generate_listing} />}
            {result.results.generate_ads && <AdsCard ads={result.results.generate_ads} />}
            {result.results.publish_to_shopify && <ShopifyCard shopify={result.results.publish_to_shopify} />}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs text-white/30 font-medium mb-1">Agent Summary</p>
              <MessageRenderer content={result.summary} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}