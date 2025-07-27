import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, href: 'https://twitter.com/yourusername', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Portfolio</h3>
            <p className="text-gray-400 mb-4">
              Full Stack Developer passionate about creating beautiful and functional web applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>your.email@example.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Your City, Country</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Your Name. Made with{' '}
            <FaHeart className="inline text-red-500 mx-1" />
            using React, Node.js, and MongoDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 