import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateReview, deleteReview } from '../store/reviewsSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const ManageReviews = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.reviews);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', body: '' });

  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditForm({
      title: review.title,
      author: review.author || '',
      body: review.body,
    });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateReview({
        id: editingId,
        updatedReview: {
          ...editForm,
          userId: 1,
        }
      })).unwrap();
      toast.success('Review updated successfully');
      setEditingId(null);
    } catch (error) {
      toast.error('Error updating review');
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteReview(id)).unwrap();
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Error deleting review');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Your Reviews</h2>
      <div className="space-y-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews found</p>
          </div>
        ) : (
          items.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              {editingId === review.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={editForm.author}
                      onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={editForm.body}
                      onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      rows="6"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{review.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Delete review"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{review.body}</p>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Author:</span>
                    <span className="ml-2">{review.author || 'Unknown'}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageReviews; 