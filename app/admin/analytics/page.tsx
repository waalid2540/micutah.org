"use client";

import { useEffect, useState } from "react";
import { 
  BarChart3, Users, Eye, Clock, TrendingUp, Globe, 
  Monitor, Smartphone, Tablet, MousePointer, Download,
  DollarSign, ArrowUp, ArrowDown, RefreshCw
} from "lucide-react";

interface Stats {
  period: string;
  summary: {
    pageViews: number;
    uniqueVisitors: number;
    sessions: number;
    avgDuration: number;
    bounceRate: number;
  };
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  devices: Record<string, number>;
  browsers: Record<string, number>;
  events: {
    recent: { name: string; category: string; label?: string; createdAt: string }[];
    byCategory: { category: string; count: number }[];
  };
  dailyViews: { date: string; views: number; visitors: number }[];
  donations: { total: number; count: number };
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/stats?period=${period}`);
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to fetch analytics", e);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchStats();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [period]);
  
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };
  
  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile": return <Smartphone className="h-4 w-4" />;
      case "tablet": return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-emerald-600" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              MIC Utah Website Performance
              {lastUpdated && (
                <span className="ml-2 text-sm">
                  • Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            
            <button
              onClick={fetchStats}
              disabled={loading}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
        
        {loading && !stats ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : stats ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm font-medium">Page Views</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(stats.summary.pageViews)}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">Unique Visitors</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(stats.summary.uniqueVisitors)}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <MousePointer className="h-5 w-5" />
                  <span className="text-sm font-medium">Sessions</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(stats.summary.sessions)}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Avg Duration</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatDuration(stats.summary.avgDuration)}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm font-medium">Donations</span>
                </div>
                <p className="text-3xl font-bold text-emerald-600">
                  ${formatNumber(stats.donations.total)}
                </p>
                <p className="text-sm text-gray-500">{stats.donations.count} donations</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Top Pages */}
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  Top Pages
                </h3>
                <div className="space-y-3">
                  {stats.topPages.map((page, i) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-400 w-5">{i + 1}</span>
                        <span className="text-sm text-gray-700 truncate max-w-[180px]">
                          {page.path === "/" ? "Home" : page.path}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatNumber(page.views)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top Referrers */}
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Top Referrers
                </h3>
                <div className="space-y-3">
                  {stats.topReferrers.length > 0 ? (
                    stats.topReferrers.map((ref, i) => (
                      <div key={ref.referrer} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-400 w-5">{i + 1}</span>
                          <span className="text-sm text-gray-700 truncate max-w-[180px]">
                            {ref.referrer ? new URL(ref.referrer).hostname : "Direct"}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatNumber(ref.count)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No referrer data yet</p>
                  )}
                </div>
              </div>
              
              {/* Devices */}
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-purple-600" />
                  Devices
                </h3>
                <div className="space-y-3">
                  {Object.entries(stats.devices).map(([device, count]) => {
                    const total = Object.values(stats.devices).reduce((a, b) => a + b, 0);
                    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={device}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(device)}
                            <span className="text-sm text-gray-700 capitalize">{device}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{percent}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Browsers */}
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Browsers</h3>
                <div className="space-y-3">
                  {Object.entries(stats.browsers).map(([browser, count]) => {
                    const total = Object.values(stats.browsers).reduce((a, b) => a + b, 0);
                    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={browser} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{browser}</span>
                        <span className="text-sm font-semibold text-gray-900">{percent}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Events by Category */}
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MousePointer className="h-5 w-5 text-orange-600" />
                  Events by Category
                </h3>
                <div className="space-y-3">
                  {stats.events.byCategory.map((cat) => (
                    <div key={cat.category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">{cat.category}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatNumber(cat.count)}
                      </span>
                    </div>
                  ))}
                  {stats.events.byCategory.length === 0 && (
                    <p className="text-sm text-gray-500">No events tracked yet</p>
                  )}
                </div>
              </div>
              
              {/* Recent Events */}
              <div className="bg-white rounded-xl p-5 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Events</h3>
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {stats.events.recent.slice(0, 10).map((event, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-gray-100">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{event.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{event.category}</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(event.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                  {stats.events.recent.length === 0 && (
                    <p className="text-sm text-gray-500">No events yet</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Daily Chart (simple table view) */}
            <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Daily Traffic</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-500">Date</th>
                      <th className="text-right py-2 text-gray-500">Views</th>
                      <th className="text-right py-2 text-gray-500">Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.dailyViews.slice(-14).map((day) => (
                      <tr key={day.date} className="border-b border-gray-50">
                        <td className="py-2 text-gray-700">
                          {new Date(day.date).toLocaleDateString("en-US", { 
                            weekday: "short", 
                            month: "short", 
                            day: "numeric" 
                          })}
                        </td>
                        <td className="py-2 text-right font-medium">{day.views}</td>
                        <td className="py-2 text-right text-gray-600">{day.visitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Failed to load analytics data
          </div>
        )}
      </div>
    </div>
  );
}
