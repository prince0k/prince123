import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaCode, FaRocket } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { IoLocationSharp } from 'react-icons/io5';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, href: 'https://twitter.com/yourusername', label: 'Twitter' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const contactInfo = [
    { icon: <HiMail size={18} className="mr-2" />, text: 'prince4sharmaa123@gmail.com' },
    { icon: <HiPhone size={18} className="mr-2" />, text: '+91 7597038049' },
    { icon: <IoLocationSharp size={18} className="mr-2" />, text: 'Udaipur, Rajasthan, India' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-6 h-6 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 font-playwrite">
                Prince Sharma
              </h3>
            </div>
            <p className="text-gray-300 font-playwrite">
              Crafting digital experiences with clean code and creative solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-1 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 text-white font-playwrite">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group font-playwrite"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-playwrite"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 text-white font-playwrite">
              Get In Touch
            </h4>
            <div className="space-y-4 text-gray-300">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start font-playwrite">
                  <span className="text-purple-400 mt-0.5 font-playwrite">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 text-white font-playwrite">
              Stay Updated
            </h4>
            <p className="text-gray-300 mb-4 font-playwrite">
              Subscribe to my newsletter for the latest projects and articles.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity duration-200 font-playwrite">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0 font-playwrite">
            © {currentYear} Prince Sharma. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <FaCode className="text-purple-400" />
            <p className="text-gray-400 font-playwrite">
              Made with <FaHeart className="inline text-red-500 mx-1" /> using Next.js, Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;