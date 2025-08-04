import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaTrash, FaCheck, FaSignOutAlt, FaPlus, FaEdit, FaFolder, FaImages } from 'react-icons/fa';
import axios from 'axios';
import AdminAuth from '../components/AdminAuth';
import ProjectForm from '../components/ProjectForm';
import GalleryForm from '../components/GalleryForm';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    // Check if login is still valid (24 hours)
    if (adminAuth === 'true' && loginTime) {
      const timeDiff = Date.now() - parseInt(loginTime);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setIsAuthenticated(true);
        fetchMessages();
        fetchProjects();
        fetchGallery(); // Add fetchGallery here
      } else {
        // Session expired
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
      }
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchMessages();
    fetchProjects();
    fetchGallery(); // Add fetchGallery here
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    setIsAuthenticated(false);
    setMessages([]);
    setProjects([]);
    setSelectedMessage(null);
    setGallery([]); // Clear gallery on logout
    setEditingGallery(null);
  };

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages...');
      const response = await axios.get('/api/contact');
      console.log('Messages received:', response.data);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/contact/${id}/read`);
      fetchMessages(); // Refresh the list
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`/api/contact/${id}`);
        fetchMessages(); // Refresh the list
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  // Project management functions
  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const saveProject = async (projectData) => {
    try {
      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, projectData);
      } else {
        await axios.post('/api/projects', projectData);
      }
      fetchProjects();
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  };

  const editProject = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  // Gallery management functions
  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setGallery(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };
  const saveGallery = async (galleryData) => {
    try {
      if (editingGallery) {
        await axios.put(`/api/gallery/${editingGallery._id}`, galleryData);
      } else {
        await axios.post('/api/gallery', galleryData);
      }
      fetchGallery();
      setShowGalleryForm(false);
      setEditingGallery(null);
    } catch (error) {
      console.error('Error saving gallery:', error);
      if (error.response?.status === 413) {
        alert('Image is too large. Please choose a smaller image (under 5MB) or use an image URL instead.');
      } else {
        alert('Error saving gallery item. Please try again.');
      }
      throw error;
    }
  };
  const editGallery = (item) => {
    setEditingGallery(item);
    setShowGalleryForm(true);
  };
  const deleteGallery = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await axios.delete(`/api/gallery/${id}`);
        fetchGallery();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1"></div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2"
                title="Logout"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            </div>
            <p className="text-lg text-gray-600">Manage your portfolio content</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-1">
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'messages'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaEnvelope className="inline mr-2" />
                Messages
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'projects'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaFolder className="inline mr-2" />
                Projects
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'gallery'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaImages className="inline mr-2" />
                Gallery
              </button>
            </div>
          </div>

          {showProjectForm ? (
            <ProjectForm
              project={editingProject}
              onSave={saveProject}
              onCancel={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Content based on active tab */}
              {activeTab === 'messages' ? (
                <>
                  {/* Messages List */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
                
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                          message.read 
                            ? 'bg-gray-50 border-gray-200' 
                            : 'bg-blue-50 border-blue-200'
                        } ${selectedMessage?._id === message._id ? 'ring-2 ring-primary-500' : ''}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{message.name}</h3>
                              {!message.read && (
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{message.email}</p>
                            <p className="font-medium text-gray-800">{message.subject}</p>
                            <p className="text-gray-500 text-sm mt-2">
                              {formatDate(message.createdAt)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {!message.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(message._id);
                                }}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Mark as read"
                              >
                                <FaCheck size={16} />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message._id);
                              }}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete message"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Message Detail</h2>
                
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
                      <p className="text-gray-900">{selectedMessage.name}</p>
                      <p className="text-gray-600 text-sm">{selectedMessage.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                      <p className="text-gray-900">{selectedMessage.subject}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                      <p className="text-gray-600">{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        className="btn-primary flex-1 text-center"
                      >
                        <FaEnvelope className="inline mr-2" />
                        Reply
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select a message to view details
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          // Projects Tab
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaPlus size={16} />
                  Add Project
                </button>
              </div>
              
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects yet. Add your first project!</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <p className="text-gray-500">No Image</p>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies?.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.featured 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {project.featured ? 'Featured' : project.category}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => editProject(project)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit project"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => deleteProject(project._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete project"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          showGalleryForm ? (
            <GalleryForm
              item={editingGallery}
              onSave={saveGallery}
              onCancel={() => {
                setShowGalleryForm(false);
                setEditingGallery(null);
              }}
            />
          ) : (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                  <button
                    onClick={() => setShowGalleryForm(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaPlus size={16} />
                    Add Post
                  </button>
                </div>
                {gallery.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No gallery posts yet. Add your first post!</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        {item.image && (
                          <div className="w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-auto object-contain"
                              style={{ maxHeight: '300px' }}
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.content}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.type === 'blog'
                              ? 'bg-green-100 text-green-800'
                              : item.type === 'activity'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editGallery(item)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="Edit post"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => deleteGallery(item._id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete post"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 