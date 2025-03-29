# BookNest

A modern web application for managing book reviews, built with React, Redux, and Tailwind CSS.

## Features

- 📚 View all book reviews in a responsive grid layout
- ✍️ Add new book reviews with title, author, and content
- 🛠️ Manage existing reviews (edit and delete)
- 🔍 Search functionality across reviews
- 📱 Fully responsive design for all screen sizes
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time state management with Redux
- 🔔 Toast notifications for user feedback

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/29Krishna/review-manager
cd review-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
review-manager/
├── src/
│   ├── components/
│   │   ├── AddReview.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Footer.jsx
│   │   ├── ManageReviews.jsx
│   │   └── Sidebar.jsx
│   ├── store/
│   │   └── reviewsSlice.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Technologies Used

- React 18
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Vite
- React-Toastify
- Heroicons

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
