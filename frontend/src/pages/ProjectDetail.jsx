import { useParams, Link } from 'react-router-dom';

function ProjectDetail() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Project: {slug}
        </h1>
        <p className="text-lg text-slate-600">
          This project detail page is coming soon.
        </p>
      </div>
    </div>
  );
}

export default ProjectDetail;
