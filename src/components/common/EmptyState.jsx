const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5z" />
            </svg>
            <p className="text-lg">No files found</p>
        </div>
    );
};

export default EmptyState;
