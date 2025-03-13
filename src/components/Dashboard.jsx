import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchReviews, setSearchQuery, deleteReview } from '../store/reviewsSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, status, error, searchQuery } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReviews());
    }
  }, [status, dispatch]);

  const filteredReviews = items.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (review.author && review.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteReview(id)).unwrap();
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Error deleting review');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading reviews</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search reviews..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No reviews found</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{review.title}</h2>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 ml-2"
                  title="Delete review"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{review.body}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <span className="font-medium">Author:</span>
                  <span className="ml-2">{review.author || 'Unknown'}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">ID:</span>
                  <span className="ml-2">{review.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 