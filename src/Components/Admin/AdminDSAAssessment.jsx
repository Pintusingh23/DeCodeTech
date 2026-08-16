import React, { useState, useEffect } from "react";
import { Plus, X, Pencil, Trash2, PlayCircle, Clock, Search, BookOpen } from "lucide-react";

const AdminDSAAssessment = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ Title: "", URL: "", Duration: "", Description: "" });

  const API_URL = "https://de-code-tech-backend.vercel.app/api/dsa/lab/";

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) {
        setLectures(data.data);
      } else {
        setError(data.message || "Failed to fetch videos");
      }
    } catch (err) {
      setError("Network error: Could not fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ Title: "", URL: "", Duration: "", Description: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId ? `${API_URL}${editId}` : API_URL;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        resetForm();
        fetchVideos();
      } else {
        alert(data.message || "Failed to save video");
      }
    } catch (err) {
      alert("Network error: Could not save video");
    }
  };

  const handleEdit = (video) => {
    setFormData({
      Title: video.Title || "",
      URL: video.URL || "",
      Duration: video.Duration || "",
      Description: video.Description || ""
    });
    setEditId(video._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lab video?")) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();

        if (data.success) {
          alert(data.message);
          fetchVideos();
        } else {
          alert(data.message || "Failed to delete video");
        }
      } catch (err) {
        alert("Network error: Could not delete video");
      }
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
      const questionPosition = videoId.indexOf("?");
      if (questionPosition !== -1) {
        videoId = videoId.substring(0, questionPosition);
      }
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const filteredLectures = lectures.filter(
    (lec) =>
      lec.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lec._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
              <BookOpen size={24} />
            </div>
            DSA Lab Videos
          </h1>
          <p className="text-gray-500 mt-1 ml-14">Manage all DSA lab videos</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300 active:scale-95"
        >
          <Plus size={20} />
          Add Lab Video
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg"><BookOpen size={20} className="text-blue-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Lab Videos</p>
              <p className="text-2xl font-bold text-gray-800">{lectures.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg"><PlayCircle size={20} className="text-green-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Video Links</p>
              <p className="text-2xl font-bold text-gray-800">{lectures.filter((l) => l.URL).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg"><Clock size={20} className="text-purple-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Duration</p>
              <p className="text-2xl font-bold text-gray-800">{lectures.reduce((acc, l) => acc + (parseInt(l.Duration) || 0), 0)}m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="Search lab videos by title or ID..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-gray-800"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ animation: "slideUp 0.3s ease-out" }}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{editId ? "Edit Lab Video" : "Add Lab Video"}</h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Video Title</label>
                <input type="text" name="Title" value={formData.Title} onChange={handleChange} required placeholder="e.g. DSA Lab 1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Video URL</label>
                <input type="url" name="URL" value={formData.URL} onChange={handleChange} required placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label>
                <input type="text" name="Duration" value={formData.Duration} onChange={handleChange} required placeholder="e.g. 45m"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Video Description</label>
                <textarea name="Description" value={formData.Description} onChange={handleChange} required rows={3} placeholder="Brief description of the lab content..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none text-gray-800" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-200 active:scale-95">
                  {editId ? "Update Lab Video" : "Save Video"}
                </button>
                <button type="button" onClick={resetForm}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">#</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">ID</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Duration</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Description</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">URL</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center py-12 text-gray-400">Loading videos...</td></tr>
              ) : filteredLectures.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-12 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen size={40} className="text-gray-300" />
                    <p className="font-medium">No DSA lab content available yet.</p>
                    <p className="text-sm">Click "Add Lab Video" to get started</p>
                  </div>
                </td></tr>
              ) : (
                filteredLectures.map((lec, idx) => (
                  <tr key={lec._id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{lec._id.slice(-6)}</span></td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{lec.Title}</td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1 text-gray-600"><Clock size={14} className="text-purple-500" />{lec.Duration}</span></td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{lec.Description}</td>
                    <td className="px-6 py-4">
                      <a href={getEmbedUrl(lec.URL)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs">
                        <PlayCircle size={14} />Preview
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(lec)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors" title="Edit"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(lec._id)} className="p-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}} />
    </div>
  );
};

export default AdminDSAAssessment;
