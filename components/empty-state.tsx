import { motion } from 'framer-motion';
import { FileText, PenTool } from 'lucide-react';

const EmptyState = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (e: string) => void;
}) => (
  <motion.div
    className="flex flex-col items-center justify-center py-16 px-4 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-24 h-24 mb-8">
      <FileText className="w-24 h-24 text-gray-700" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <PenTool className="w-10 h-10 text-gray-500" />
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-4">No posts found</h3>
    <p className="text-gray-400 max-w-md mb-8">
      {selectedCategory === 'All'
        ? 'There are no blog posts available at the moment. Check back later for new content!'
        : `No posts found in the "${selectedCategory}" category. Try selecting a different category or check back later.`}
    </p>
    {selectedCategory !== 'All' && (
      <button
        onClick={() => setSelectedCategory('All')}
        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-sm transition-colors"
      >
        View all posts
      </button>
    )}
  </motion.div>
);
export default EmptyState;
