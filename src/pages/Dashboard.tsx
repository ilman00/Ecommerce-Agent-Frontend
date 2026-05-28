import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface DashboardStats {
  totalOrders: number;
  flaggedOrders: number;
  totalProducts: number;
  revenue: number;
}

interface RecentItem {
  id: string;
  title: string;
  date: string;
  type: "conversation" | "order";
  status?: "pending" | "completed" | "flagged";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    flaggedOrders: 0,
    totalProducts: 0,
    revenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API calls
    const mockStats: DashboardStats = {
      totalOrders: 24,
      flaggedOrders: 3,
      totalProducts: 18,
      revenue: 4250.50,
    };

    const mockActivity: RecentItem[] = [
      {
        id: "conv-1",
        title: "Generate listing for Winter Jacket",
        date: "2 hours ago",
        type: "conversation",
        status: "completed",
      },
      {
        id: "order-1",
        title: "Order #2047 - Suspicious Activity",
        date: "4 hours ago",
        type: "order",
        status: "flagged",
      },
      {
        id: "conv-2",
        title: "Create ads campaign for shoes",
        date: "1 day ago",
        type: "conversation",
        status: "completed",
      },
      {
        id: "order-2",
        title: "Order #2046 - Completed",
        date: "1 day ago",
        type: "order",
        status: "completed",
      },
      {
        id: "order-3",
        title: "Order #2045 - Pending",
        date: "2 days ago",
        type: "order",
        status: "pending",
      },
    ];

    setStats(mockStats);
    setRecentActivity(mockActivity);
    setLoading(false);
  }, [storeId]);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: "📦",
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      label: "Flagged Orders",
      value: stats.flaggedOrders,
      icon: "⚠️",
      color: "from-red-500/20 to-red-500/5",
    },
    {
      label: "Products",
      value: stats.totalProducts,
      icon: "🛍️",
      color: "from-green-500/20 to-green-500/5",
    },
    {
      label: "Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      icon: "💰",
      color: "from-amber-500/20 to-amber-500/5",
    },
  ];

  const navigationTiles = [
    {
      title: "Chat with Agent",
      description: "Generate listings, ads & more",
      icon: "💬",
      action: () => navigate(`/store/${storeId}/chat`),
      bgColor: "from-purple-500/20 to-purple-500/5",
    },
    {
      title: "Orders",
      description: "Manage & track orders",
      icon: "📋",
      action: () => navigate(`/store/${storeId}/orders`),
      bgColor: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "Fraud Detection",
      description: "Review flagged orders",
      icon: "🛡️",
      action: () => navigate(`/store/${storeId}/fraud`),
      bgColor: "from-red-500/20 to-red-500/5",
      badge: stats.flaggedOrders > 0 ? stats.flaggedOrders : null,
    },
    {
      title: "Analytics",
      description: "View insights & trends",
      icon: "📊",
      action: () => navigate(`/store/${storeId}/analytics`),
      bgColor: "from-green-500/20 to-green-500/5",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activePage="dashboard" />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-white/40">Welcome back! Here's your store overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => (
              <div
                key={card.label}
                className={`bg-gradient-to-br ${card.color} border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <p className="text-white/40 text-sm mb-1">{card.label}</p>
                <p className="text-2xl font-semibold text-white">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Navigation Tiles */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {navigationTiles.map((tile) => (
                <button
                  key={tile.title}
                  onClick={tile.action}
                  className={`bg-gradient-to-br ${tile.bgColor} border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/10 transition-all text-left group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{tile.icon}</span>
                    {tile.badge && (
                      <span className="bg-red-500/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {tile.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-sm text-white/40">{tile.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {recentActivity.length === 0 ? (
                <div className="p-6 text-center text-white/40 text-sm">
                  No recent activity
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="px-6 py-4 hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {item.type === "conversation" ? "💬" : "📦"}
                          </span>
                          <div>
                            <p className="text-white text-sm font-medium">{item.title}</p>
                            <p className="text-white/30 text-xs">{item.date}</p>
                          </div>
                        </div>
                      </div>
                      {item.status && (
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : item.status === "flagged"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}