const mongoose = require('mongoose');
const Project = require('./models/Project');
const Contact = require('./models/Contact');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
    image: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=E-Commerce',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    category: 'web'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Task+App',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
    featured: true,
    category: 'web'
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and interactive maps using weather APIs.',
    image: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Weather+App',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard.vercel.app',
    featured: false,
    category: 'web'
  },
  {
    title: 'Mobile Fitness Tracker',
    description: 'A React Native mobile app for tracking workouts, nutrition, and fitness goals with progress visualization.',
    image: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Fitness+App',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com/yourusername/fitness-tracker',
    liveUrl: null,
    featured: false,
    category: 'mobile'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design.',
    image: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Portfolio',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://your-portfolio.vercel.app',
    featured: true,
    category: 'web'
  },
  {
    title: 'Desktop File Manager',
    description: 'An Electron-based desktop application for file management with advanced search, preview, and organization features.',
    image: 'https://via.placeholder.com/400x300/6B7280/FFFFFF?text=File+Manager',
    technologies: ['Electron', 'Node.js', 'React', 'SQLite'],
    githubUrl: 'https://github.com/yourusername/file-manager',
    liveUrl: null,
    featured: false,
    category: 'desktop'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Contact.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${projects.length} projects`);

    // Insert sample contact message
    const sampleContact = new Contact({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Project Inquiry',
      message: 'Hi! I really liked your portfolio and would like to discuss a potential project collaboration.',
      read: false
    });
    await sampleContact.save();
    console.log('Inserted sample contact message');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 