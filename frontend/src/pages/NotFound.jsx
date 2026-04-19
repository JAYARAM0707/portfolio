import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-slate-900 mb-4">
          404
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
