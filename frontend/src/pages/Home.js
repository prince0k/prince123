import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaArrowRight } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

// Enhanced Typewriter Component with cursor animation
const Typewriter = ({ text, speed = 75, className = "", cursorColor = "text-primary-500" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Blink cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`${className} relative`}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ${cursorColor} transition-opacity duration-100`}>|</span>
    </span>
  );
};

// Home Component
const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);

  const skills = [
    { name: 'React', level: 30 },
    { name: 'Node.js', level: 85 },
    { name: 'MongoDB', level: 80 },
    { name: 'JavaScript', level: 95 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Express.js', level: 80 },
    { name: 'Git', level: 85 },
    { name: 'Docker', level: 70 },
    { name: 'AWS', level: 65 },
    { name: 'PostgreSQL', level: 75 }
  ];

  const cursorImages = [
    '/cursor.png',
    '/cursor.png',
    '/cursor.png',
    '/cursor.png'
  ];
  const [currentCursorIndex, setCurrentCursorIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        // Simulate API call with mock data
        const mockProjects = [
          {
            _id: "1",
            title: "E-commerce Platform",
            description: "A full-featured online store with payment integration",
            tags: ["React", "Node.js", "MongoDB"],
            imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1672&q=80",
            githubUrl: "#",
            liveUrl: "#"
          },
          {
            _id: "2",
            title: "Task Management App",
            description: "Productivity application for team collaboration",
            tags: ["React", "Firebase", "Material UI"],
            imageUrl: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1672&q=80",
            githubUrl: "#",
            liveUrl: "#"
          },
          {
            _id: "3",
            title: "Weather Dashboard",
            description: "Real-time weather forecasting application",
            tags: ["React", "API Integration", "Chart.js"],
            imageUrl: "https://images.unsplash.com/photo-1561484930-974554019ade?ixlib=rb-4.0.3&auto=format&fit=crop&w=1672&q=80",
            githubUrl: "#",
            liveUrl: "#"
          }
        ];
        
        setFeaturedProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  // Scroll detection for header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic text effect refs
  const magneticRef = useRef(null);
  const letters = "DEVELOPER".split("");
  const [positions, setPositions] = useState(letters.map(() => ({ x: 1, y: 1 })));

  const handleMagneticMove = (e) => {
    if (!magneticRef.current) return;
    
    const rect = magneticRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const newPositions = letters.map((_, i) => {
      // Calculate distance from mouse to each character
      const charX = centerX + (i - letters.length / 2) * 30;
      const charY = centerY 
      const dx = e.clientX - charX;
      const dy = e.clientY - charY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only move characters within a certain radius
      if (distance < 100) {
        const force = (100 - distance) / 100;
        return {
          x: -dx * force * 1,
          y: -dy * force * 1
        };
      }
      return { x: 0, y: 0 };
    });
    
    setPositions(newPositions);
  };

  const handleMagneticLeave = () => {
    setPositions(letters.map(() => ({ x: 0, y: 0 })));
  };

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-12 h-12 pointer-events-none z-50 transition-transform duration-100';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.backgroundSize = 'contain';
    cursor.style.backgroundRepeat = 'no-repeat';
    document.body.appendChild(cursor);

    // Rotate cursor images every 5 seconds
    const cursorInterval = setInterval(() => {
      setCurrentCursorIndex(prev => (prev + 1) % cursorImages.length);
    }, 5000);

    const nameElement = document.querySelector('.name-hover');
    if (nameElement) {
      nameElement.addEventListener('mouseenter', () => {
        cursor.style.width = '48px';
        cursor.style.height = '48px';
        cursor.style.backgroundImage = `url(${cursorImages[currentCursorIndex]})`;
      });
      
      nameElement.addEventListener('mouseleave', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.backgroundImage = 'none';
        cursor.style.borderRadius = '50%';
      });
    }
    
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      clearInterval(cursorInterval);
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      if (nameElement) {
        nameElement.removeEventListener('mouseenter', () => {});
        nameElement.removeEventListener('mouseleave', () => {});
      }
    };
  }, [currentCursorIndex]); // Add currentCursorIndex to dependencies

  // Update cursor image when index changes
  useEffect(() => {
    const cursor = document.querySelector('.fixed.w-12.h-12');
    if (cursor && cursor.style.backgroundImage) {
      cursor.style.backgroundImage = `url(${cursorImages[currentCursorIndex]})`;
    }
  }, [currentCursorIndex]);

  return (
    <div className="min-h-screen  bg-gray-800">
      {/* Floating Navigation (appears on scroll) */}
      {/* <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 py-3 px-6"
      >
        {/* <div className="container-max flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-gray-900">Prince Sharma</a>
          <div className="flex space-x-6">
            <a href="#about" className="text-gray-600 hover:text-primary-500 transition-colors">About</a>
            <a href="#projects" className="text-gray-600 hover:text-primary-500 transition-colors">Projects</a>
            <a href="#contact" className="text-gray-600 hover:text-primary-500 transition-colors">Contact</a>
          </div>
        </div> 
      </motion.nav> */}

      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* <div className="mb-8">
              <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Full Stack Developer
              </span>
            </div> */}
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm <br className="sm:hidden" />
              <span 
                className="name-hover text-purple-500 relative group inline-block cursor-none tilt-prism-400"
              >
                <Typewriter
                  text="Prince Sharma"
                  speed={150}
                  cursorColor="text-primary-500"
                />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              I build <span className="text-yellow-300 font-medium tilt-prism-400">beautiful</span>, <span className="text-green-700 font-medium tilt-prism-400">functional</span>, and <span className="text-red-600 font-medium tilt-prism-400">scalable</span> web applications that deliver exceptional user experiences.
            </p>
            
            <div className="flex justify-center space-x-6 mb-12">
              {[
                { icon: <FaGithub size={24} />, url: "http://github.com/prince0k" },
                { icon: <FaLinkedin size={24} />, url: "https://www.linkedin.com/in/prince-sharma" },
                { icon: <FaTwitter size={24} />, url: "https://x.com/princes65258114" },
                { icon: <FaEnvelope size={24} />, url: "mailto:prince4sharmaa123@gmail.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-500 transition-colors duration-200"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="/projects" 
                className="btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work <FaArrowRight />
              </motion.a>
              
              <motion.a 
                href="/contact" 
                className="btn-secondary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch <FaHeart className="text-red-500" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <span className="border-b-4 border-primary-500 pb-2">About Me</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I'm a passionate full-stack developer with 3+ years of experience building modern web applications. 
                I specialize in creating intuitive interfaces and robust backend systems that solve real-world problems.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                When I'm not coding, you can find me contributing to open-source projects, learning new technologies, 
                or exploring the outdoors for inspiration.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">My Skills</h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-500 h-2.5 rounded-full group-hover:bg-primary-600 transition-colors" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Image Section with Magnetic Text */}
            <div 
              ref={magneticRef}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl group "
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex items-end p-8 z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Based in India</h3>
                  <p className="text-gray-300">Available for remote work & collaborations</p>
                </div>
              </div>
              
              {/* Magnetic Text Effect */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="flex">
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        x: positions[i].x,
                        y: positions[i].y,
                        transition: { type: "spring", damping: 20, stiffness: 100 }
                      }}
                      className="text-4xl md:text-5xl font-bold text-white opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="section-padding bg-gray-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="border-b-4 border-primary-500 pb-2">Featured Projects</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredProject(project._id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="relative"
                  >
                    <ProjectCard project={project} isHovered={hoveredProject === project._id} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-500 hover:bg-primary-600 transition-colors duration-200"
            >
              View All Projects
              <FaArrowRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-500 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              I'm currently available for freelance work and full-time positions. Let's build something amazing together!
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-3 border border-white text-lg font-medium rounded-full shadow-sm text-primary-500 bg-white hover:bg-gray-100 transition-colors duration-200"
            >
              Get In Touch
              <FaArrowRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;