import { Link } from 'react-router-dom';

const FileToolbar = ({ currentPath, onRefresh }) => {
    // Parsing path for breadcrumbs
    // e.g. /foo/bar -> ["foo", "bar"]
    const pathSegments = currentPath.split('/').filter(Boolean);

    return (
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 overflow-x-auto text-sm">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-[#0077b6] font-medium px-2 py-1 rounded hover:bg-sky-50 transition-colors"
                >
                    Home
                </Link>
                {pathSegments.map((segment, index) => {
                    // Reconstruct path for this segment
                    // /foo/bar -> index 0: foo -> path /foo
                    // index 1: bar -> path /foo/bar
                    const path = '/' + pathSegments.slice(0, index + 1).join('/');

                    return (
                        <div key={path} className="flex items-center gap-2">
                            <span className="text-gray-400">/</span>
                            <Link
                                to={`/?path=${encodeURIComponent(path)}`}
                                className="text-gray-700 hover:text-[#0077b6] font-medium px-2 py-1 rounded hover:bg-sky-50 transition-colors whitespace-nowrap"
                            >
                                {segment}
                            </Link>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={onRefresh}
                className="flex items-center gap-2 px-4 py-2 text-[#0077b6] bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors font-medium text-sm"
                title="Refresh List"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
            </button>
        </div>
    );
};

export default FileToolbar;
