import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useFileStore from '../store/fileStore';
import FileList from '../components/files/FileList';
import FileToolbar from '../components/files/FileToolbar';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

const FilesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const path = searchParams.get('path') || '/';

    const { files, isLoading, error, loadFiles, refresh } = useFileStore();

    useEffect(() => {
        loadFiles(path);
    }, [path, loadFiles]);

    const handleFileClick = (file) => {
        if (file.isDir) {
            // Determine new path
            // If current path is /, new path is /name
            // If current path is /foo, new path is /foo/name
            let newPath = path === '/' ? `/${file.name}` : `${path}/${file.name}`;
            // Clean up double slashes just in case
            newPath = newPath.replace('//', '/');
            setSearchParams({ path: newPath });
        } else {
            let filePath = path === '/' ? `/${file.name}` : `${path}/${file.name}`;
            filePath = filePath.replace('//', '/');
            navigate(`/details?path=${encodeURIComponent(filePath)}`);
        }
    };

    const handleNavigateUp = () => {
        // Not used directly by toolbar yet as toolbar handles breadcrumbs, 
        // but could be useful if we added an "Up" button.
    };

    if (error) {
        return (
            <div className="container mx-auto">
                <FileToolbar currentPath={path} onRefresh={refresh} />
                <ErrorState message={error} onRetry={() => loadFiles(path)} />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <FileToolbar currentPath={path} onRefresh={refresh} />

            {isLoading ? (
                <Loader />
            ) : files.length === 0 ? (
                <EmptyState />
            ) : (
                <FileList files={files} onFileClick={handleFileClick} />
            )}
        </div>
    );
};

export default FilesPage;
