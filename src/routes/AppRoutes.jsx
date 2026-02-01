import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import FilesPage from '../pages/FilesPage';
import FileDetailPage from '../pages/FileDetailPage';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppLayout />}>
                <Route index element={<FilesPage />} />
                <Route path="details" element={<FileDetailPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
