import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useFileStore from '../store/fileStore';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { formatSize, formatDate } from '../utils/formatters';

const FileDetailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const path = searchParams.get('path');

    const { currentFile, isLoading, error, loadFileDetails } = useFileStore();

    useEffect(() => {
        if (path) {
            loadFileDetails(path);
        }
    }, [path, loadFileDetails]);

    const getFileIcon = () => {
        const type = currentFile?.type?.toLowerCase() || '';

        if (type.includes('pdf')) {
            return (
                <svg className="h-16 w-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
            );
        } else if (type.includes('image')) {
            return (
                <svg className="h-16 w-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            );
        } else if (type.includes('spreadsheet') || type.includes('excel') || path?.endsWith('.xlsx') || path?.endsWith('.xls')) {
            return (
                <svg className="h-16 w-16 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            );
        } else {
            return (
                <svg className="h-16 w-16 text-[#0077b6]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            );
        }
    };

    if (isLoading) return <Loader />;

    if (error) return (
        <div className="container mx-auto py-8 px-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-[#0077b6] hover:underline flex items-center gap-1"
            >
                ← Back
            </button>
            <ErrorState message={error} onRetry={() => loadFileDetails(path)} />
        </div>
    );

    if (!currentFile) return null;

    return (
        <div className="container mx-auto py-8 px-4 max-w-3xl">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-[#0077b6] hover:underline flex items-center gap-2 font-medium transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Files
            </button>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                {/* Header with gradient background */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-br from-[#0077b6]/5 via-[#0096c7]/5 to-white">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            {getFileIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl font-bold text-gray-900 break-words mb-2">
                                {currentFile.name}
                            </h1>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-gray-700 font-medium shadow-sm border border-gray-100">
                                    {currentFile.type || 'Unknown type'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">File Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Size */}
                        <div className="bg-sky-50/50 p-5 rounded-xl border border-sky-100">
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="h-5 w-5 text-[#0077b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                </svg>
                                <span className="text-sm font-medium text-gray-600">Size</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                                {formatSize(currentFile.size)}
                            </div>
                        </div>

                        {/* Last Modified */}
                        <div className="bg-sky-50/50 p-5 rounded-xl border border-sky-100">
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="h-5 w-5 text-[#0096c7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-600">Last Modified</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {formatDate(currentFile.modified)}
                            </div>
                        </div>
                    </div>

                    {/* Full Path */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">Full Path</span>
                        </div>
                        <div className="bg-white p-3 rounded-lg font-mono text-sm text-gray-800 break-all border border-gray-200">
                            {path}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileDetailPage;
