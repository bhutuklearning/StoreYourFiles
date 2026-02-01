import { create } from 'zustand';
import { fetchResources } from '../services/fileService';

const useFileStore = create((set, get) => ({
    files: [],
    currentPath: '/',
    currentFile: null,
    isLoading: false,
    error: null,

    loadFiles: async (path = '/') => {
        set({ isLoading: true, error: null, currentPath: path });
        try {
            const data = await fetchResources(path);
            // Combine folders and files
            const folders = (data.folders || []).map(f => ({ ...f, isDir: true }));
            const files_list = (data.files || []).map(f => ({ ...f, isDir: false }));
            const combined = [...folders, ...files_list];

            // Fix: Fetch actual file sizes for files with size 0
            const { fetchFileSize } = await import('../services/fileService');
            const fixedFiles = await Promise.all(
                combined.map(async (file) => {
                    if (!file.isDir && (file.size === 0 || !file.size)) {
                        // Fetch actual size
                        const filePath = path === '/' ? `/${file.name}` : `${path}/${file.name}`;
                        const actualSize = await fetchFileSize(filePath);
                        return { ...file, size: actualSize };
                    }
                    return file;
                })
            );

            set({ files: fixedFiles, isLoading: false, error: null });
        } catch (err) {
            console.error(err);
            set({
                isLoading: false,
                error: err.response?.data?.message || err.message || 'Failed to load files'
            });
        }
    },

    loadFileDetails: async (path) => {
        set({ isLoading: true, error: null, currentFile: null });
        try {
            const data = await fetchResources(path);
            set({ currentFile: data, isLoading: false });
        } catch (err) {
            set({
                isLoading: false,
                error: err.response?.data?.message || err.message || 'Failed to load file details'
            });
        }
    },

    refresh: () => {
        const { currentPath, loadFiles } = get();
        loadFiles(currentPath);
    }
}));

export default useFileStore;
