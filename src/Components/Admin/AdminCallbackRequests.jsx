import React, { useState, useEffect } from "react";
import { Search, Trash2, Mail, User, MessageSquare, Calendar, AlertCircle } from "lucide-react";

const AdminCallbackRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:5001/api/contact/";

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) {
        setRequests(data.data || []);
      } else {
        setError(data.message || "Failed to fetch contact requests");
      }
    } catch (err) {
      setError("Network error: Could not fetch contact requests");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact request?")) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        
        if (data.success) {
          alert("Request deleted successfully");
          fetchRequests();
        } else {
          alert(data.message || "Failed to delete request");
        }
      } catch (err) {
        alert("Network error: Could not delete request");
      }
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.Subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.Message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl text-white">
              <MessageSquare size={24} />
            </div>
            Contact Requests
          </h1>
          <p className="text-gray-500 mt-1 ml-14">Manage and respond to student inquiries</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg"><MessageSquare size={20} className="text-emerald-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-800">{requests.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg"><Mail size={20} className="text-amber-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Messages</p>
              <p className="text-2xl font-bold text-gray-800">{requests.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" 
            placeholder="Search by name, email, subject, or message..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm text-gray-800"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-red-700 font-medium flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Contact Details</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 w-1/4">Subject</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 w-1/3">Message</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Date Received</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-400">
                    Loading contact requests...
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <MessageSquare size={40} className="text-gray-300" />
                      <p className="font-medium">No contact requests found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req._id} className="border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-800 flex items-center gap-2">
                          <User size={14} className="text-emerald-500" />{req.Name}
                        </span>
                        <a href={`mailto:${req.Email}`} className="text-gray-500 hover:text-emerald-600 flex items-center gap-2">
                          <Mail size={14} />{req.Email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {req.Subject}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <p className="line-clamp-3 leading-relaxed">{req.Message}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-emerald-400" />
                        {new Date(req.createdAt).toLocaleString(undefined, { 
                          year: 'numeric', month: 'short', day: 'numeric', 
                          hour: '2-digit', minute: '2-digit' 
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(req._id)} 
                          className="p-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCallbackRequests;
