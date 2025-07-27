import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaImages, FaBlog, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const typeIcon = {
  image: <FaImages className="inline mr-1 text-primary-600" />,
  blog: <FaBlog className="inline mr-1 text-green-600" />,
  activity: <FaCalendarAlt className="inline mr-1 text-blue-600" />,
};

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/gallery');
        setGallery(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my daily activities, posts, and blogs!
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : gallery.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelected(item)}
                >
                  {item.image && (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{typeIcon[item.type]}</span>
                      <span className="text-xs px-2 py-1 rounded font-medium bg-gray-100 text-gray-600">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.content}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Modal for selected item */}
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative"
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                  onClick={() => setSelected(null)}
                >
                  &times;
                </button>
                {selected.image && (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span>{typeIcon[selected.type]}</span>
                  <span className="text-xs px-2 py-1 rounded font-medium bg-gray-100 text-gray-600">
                    {selected.type.charAt(0).toUpperCase() + selected.type.slice(1)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected.title}</h2>
                <div className="mb-4 text-gray-700 whitespace-pre-line">
                  {selected.content}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {selected.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(selected.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 