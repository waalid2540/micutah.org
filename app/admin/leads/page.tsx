"use client";

import { useEffect, useState } from "react";
import { 
  Users, Phone, Mail, Download, RefreshCw, Lock, 
  Calendar, Utensils, BookOpen, Search, Trash2,
  Globe, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface RecipeLead {
  name: string;
  phone: string;
  source: string;
  createdAt: string;
}

interface PlannerLead {
  id: string;
  email: string;
  firstName: string;
  country: string;
  interestedInUmrah: boolean;
  source: string;
  createdAt: string;
}

interface LeadsData {
  recipeLeads: RecipeLead[];
  plannerLeads: PlannerLead[];
}

// Simple password protection - same as analytics
const ADMIN_PASSWORD = "admin123";

export default function LeadsAdminPage() {
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"recipes" | "planner">("recipes");

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem("mic_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("mic_admin_auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/leads");
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const exportCSV = (type: "recipes" | "planner") => {
    if (!data) return;

    let csv = "";
    let filename = "";

    if (type === "recipes") {
      csv = "Name,Phone,Source,Date\n";
      data.recipeLeads.forEach((lead) => {
        csv += `"${lead.name}","${lead.phone}","${lead.source}","${new Date(lead.createdAt).toLocaleString()}"\n`;
      });
      filename = `recipe-leads-${new Date().toISOString().split("T")[0]}.csv`;
    } else {
      csv = "First Name,Email,Country,Interested in Umrah,Source,Date\n";
      data.plannerLeads.forEach((lead) => {
        csv += `"${lead.firstName}","${lead.email}","${lead.country}","${lead.interestedInUmrah ? "Yes" : "No"}","${lead.source}","${new Date(lead.createdAt).toLocaleString()}"\n`;
      });
      filename = `planner-leads-${new Date().toISOString().split("T")[0]}.csv`;
    }

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <CardTitle className="text-white text-2xl">Leads Admin</CardTitle>
            <p className="text-slate-400 text-sm mt-2">Enter password to access leads</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Access Leads
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  const filteredRecipeLeads = data?.recipeLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
  ) || [];

  const filteredPlannerLeads = data?.plannerLeads.filter(
    (lead) =>
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const umrahInterested = data?.plannerLeads.filter((l) => l.interestedInUmrah).length || 0;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">📊 Leads Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your Ramadan campaign leads</p>
          </div>
          <Button onClick={fetchLeads} variant="outline" className="gap-2 border-slate-600 text-slate-300">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-600 to-emerald-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Utensils className="h-8 w-8 text-white/80" />
                <div>
                  <p className="text-white/70 text-sm">Recipe Leads</p>
                  <p className="text-3xl font-bold text-white">{data?.recipeLeads.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-600 to-orange-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-white/80" />
                <div>
                  <p className="text-white/70 text-sm">Planner Leads</p>
                  <p className="text-3xl font-bold text-white">{data?.plannerLeads.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-white/80" />
                <div>
                  <p className="text-white/70 text-sm">Total Leads</p>
                  <p className="text-3xl font-bold text-white">
                    {(data?.recipeLeads.length || 0) + (data?.plannerLeads.length || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-600 to-pink-700 border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-white/80" />
                <div>
                  <p className="text-white/70 text-sm">Umrah Interest</p>
                  <p className="text-3xl font-bold text-white">{umrahInterested}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab("recipes")}
            className={activeTab === "recipes" 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-slate-700 hover:bg-slate-600"}
          >
            <Utensils className="h-4 w-4 mr-2" />
            Recipe Leads ({data?.recipeLeads.length || 0})
          </Button>
          <Button
            onClick={() => setActiveTab("planner")}
            className={activeTab === "planner" 
              ? "bg-amber-600 hover:bg-amber-700" 
              : "bg-slate-700 hover:bg-slate-600"}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Planner Leads ({data?.plannerLeads.length || 0})
          </Button>
        </div>

        {/* Search & Export */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <Button 
            onClick={() => exportCSV(activeTab)} 
            className="bg-emerald-600 hover:bg-emerald-700 gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Recipe Leads Table */}
        {activeTab === "recipes" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Utensils className="h-5 w-5 text-green-400" />
                Recipe Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredRecipeLeads.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No recipe leads yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">#</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Phone</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecipeLeads.map((lead, index) => (
                        <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-3 px-4 text-slate-500">{index + 1}</td>
                          <td className="py-3 px-4 text-white font-medium">{lead.name}</td>
                          <td className="py-3 px-4">
                            <a href={`tel:${lead.phone}`} className="text-green-400 hover:underline flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-sm">
                            {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Planner Leads Table */}
        {activeTab === "planner" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                Planner Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredPlannerLeads.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No planner leads yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">#</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Country</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Umrah</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlannerLeads.map((lead, index) => (
                        <tr key={lead.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-3 px-4 text-slate-500">{index + 1}</td>
                          <td className="py-3 px-4 text-white font-medium">{lead.firstName}</td>
                          <td className="py-3 px-4">
                            <a href={`mailto:${lead.email}`} className="text-amber-400 hover:underline flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{lead.country}</td>
                          <td className="py-3 px-4">
                            {lead.interestedInUmrah ? (
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Yes</span>
                            ) : (
                              <span className="bg-slate-500/20 text-slate-400 text-xs px-2 py-1 rounded-full">No</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-sm">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          MIC Utah Admin • Leads Dashboard
        </p>
      </div>
    </div>
  );
}
