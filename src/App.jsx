import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import AddReview from './components/AddReview';
import ManageReviews from './components/ManageReviews';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
          <Sidebar />
          <div className="flex-1 flex flex-col relative">
            <main className="flex-1 p-4 sm:p-6 pb-20 overflow-y-auto">
              <div className="container mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add-review" element={<AddReview />} />
                  <Route path="/manage-reviews" element={<ManageReviews />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </Provider>
  );
}

export default App;
