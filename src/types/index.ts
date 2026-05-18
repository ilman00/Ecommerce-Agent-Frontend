export interface ProductListing {
  title: string;
  seoDescription: string;
  bullets: string[];
  tags: string[];
}

export interface AdCopy {
  headline: string;
  body: string;
  callToAction: string;
}

export interface ShopifyResult {
  id: number;
  title: string;
  status: string;
  handle: string;
  created_at: string;
}

export interface AgentResults {
  generate_listing?: ProductListing;
  generate_ads?: AdCopy;
  publish_to_shopify?: ShopifyResult;
}

export interface AgentResponse {
  results: AgentResults;
  summary: string;
}

export interface Store {
  _id: string;
  name: string;
  platform: string;
  storeName: string;
  created_at: string;
  domain: string;
}