import FileItem from './FileItem';

const FileList = ({ files, onFileClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4 font-semibold">Name</th>
                        <th className="py-3 px-4 font-semibold w-32">Size</th>
                        <th className="py-3 px-4 font-semibold w-48">Last Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file, index) => (
                        <FileItem
                            key={`${file.path || file.name}-${index}`}
                            file={file}
                            onClick={onFileClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileList;
