import { formatSize, formatDate } from '../../utils/formatters';

const FileItem = ({ file, onClick }) => {
    const isDir = file.isDir || file.type === 'directory';

    return (
        <tr
            onClick={() => onClick(file)}
            className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
        >
            <td className="py-3 px-4 flex items-center gap-3">
                {isDir ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                )}
                <span className="font-medium text-gray-700 truncate max-w-xs sm:max-w-sm md:max-w-md">
                    {file.name}
                </span>
            </td>
            <td className="py-3 px-4 text-sm text-gray-500">
                {isDir ? '-' : formatSize(file.size)}
            </td>
            <td className="py-3 px-4 text-sm text-gray-500">
                {formatDate(file.modified)}
            </td>
        </tr>
    );
};

export default FileItem;
