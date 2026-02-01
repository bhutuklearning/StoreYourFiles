const ErrorState = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-red-600">
            <p className="text-lg font-semibold mb-2">Error</p>
            <p className="mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-[#0077b6] text-white rounded hover:bg-[#0096c7] transition"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorState;
