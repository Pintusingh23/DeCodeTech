import React, { useState, useEffect } from "react";

const Webadmin = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", videoUrl: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const API_BASE_URL = "http://localhost:5001/api/videos";

  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_BASE_URL, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setBanners([]);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos. Please check if your backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Load videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Extract YouTube video ID from URL
  const getYoutubeId = (url) => {
    const regExp =
      /^.*(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/))([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  // Create new video
  const createVideo = async (videoData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          videoTitle: videoData.title,
          videoUrl: videoData.videoUrl,
          description: videoData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create video");
      }

      const newVideo = await response.json();
      return newVideo;
    } catch (error) {
      console.error("Error creating video:", error);
      throw error;
    }
  };

  // Update existing video
  const updateVideo = async (id, videoData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          videoTitle: videoData.title,
          videoUrl: videoData.videoUrl,
          description: videoData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update video");
      }

      const updatedVideo = await response.json();
      return updatedVideo;
    } catch (error) {
      console.error("Error updating video:", error);
      throw error;
    }
  };

  // Delete video
  const deleteVideoFromAPI = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete video");
      }

      return true;
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError("");

      if (editIndex !== null && editId) {
        // Update existing video
        await updateVideo(editId, formData);
      } else {
        // Create new video
        await createVideo(formData);
      }

      // Refresh the list
      await fetchVideos();
      
      // Reset form
      setFormData({ title: "", description: "", videoUrl: "" });
      setShowModal(false);
      setEditIndex(null);
      setEditId(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a video
  const handleDelete = async (index) => {
    const video = banners[index];
    if (!video._id) return;

    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        setLoading(true);
        setError("");
        await deleteVideoFromAPI(video._id);
        await fetchVideos(); // Refresh the list
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit a video
  const handleEdit = (index) => {
    const video = banners[index];
    setFormData({
      title: video.videoTitle,
      description: video.description,
      videoUrl: video.videoUrl,
    });
    setEditIndex(index);
    setEditId(video._id);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">WebDevelopment</h2>
          <button
            onClick={() => {
              setShowModal(true);
              setFormData({ title: "", description: "", videoUrl: "" });
              setEditIndex(null);
              setEditId(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out"
            disabled={loading}
          >
            + Add Web Video
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-4 text-center text-blue-600">
            Loading...
          </div>
        )}

        {/* Table Section */}
        <div className="p-4">
          {!loading && banners.length === 0 ? (
            <div className="text-center text-gray-500">No videos found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Video
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {banners.map((banner, index) => {
                    const videoId = getYoutubeId(banner.videoUrl);
                    return (
                      <tr key={banner._id || index}>
                        <td className="px-6 py-4">
                          {videoId ? (
                            <iframe
                              width="160"
                              height="90"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={banner.videoTitle}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-md"
                            ></iframe>
                          ) : (
                            <span className="text-red-500">Invalid URL</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {banner.videoTitle}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {banner.description}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(banner.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Web Video" : "Add Web Video"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Video Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
              <input
                type="text"
                name="description"
                placeholder="Video Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
              <input
                type="url"
                name="videoUrl"
                placeholder="YouTube Video URL"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Processing..." : (editIndex !== null ? "Update" : "Add")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webadmin;