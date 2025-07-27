# Portfolio Project

A modern, responsive portfolio website built with React, Node.js, and MongoDB. This project showcases a full-stack application with a beautiful frontend and a robust backend API.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Full-Stack**: React frontend with Node.js/Express backend
- **Database**: MongoDB for data persistence
- **Contact Form**: Functional contact form with backend integration
- **Project Showcase**: Display and filter projects by category
- **Animations**: Smooth animations with Framer Motion
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Dotenv

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Node.js backend application
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_here
   ```

5. **Start MongoDB**
   - Make sure MongoDB is running locally, or
   - Use MongoDB Atlas (cloud service)

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)
- `PUT /api/contact/:id/read` - Mark message as read
- `DELETE /api/contact/:id` - Delete contact message

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `frontend/src/pages/Home.js` - Update name, description, and social links
- `frontend/src/pages/Contact.js` - Update contact information
- `frontend/src/components/Footer.js` - Update footer information

### Styling
- Modify `frontend/tailwind.config.js` for custom colors and themes
- Update CSS classes in components for styling changes

### Adding Projects
You can add projects through the API or directly in the database. Each project should have:
- title
- description
- image (URL)
- technologies (array)
- githubUrl (optional)
- liveUrl (optional)
- featured (boolean)
- category (web, mobile, desktop, other)

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables
3. Update MongoDB connection string

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- MongoDB for the database solution 