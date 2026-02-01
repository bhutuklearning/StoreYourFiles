import http from '../api/http';

export const fetchResources = async (path = '/', source = 'srv') => {
    const response = await http.get('/resources', {
        params: {
            path,
            source
        },
    });
    return response.data;
};

// Fetch actual file size using HEAD request
export const fetchFileSize = async (path, source = 'srv') => {
    try {
        const response = await http.head('/raw', {
            params: { path, source }
        });
        const contentLength = response.headers['content-length'];
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error('Failed to fetch file size:', error);
        return 0;
    }
};

export const downloadFile = async (path) => {
    try {
        const response = await http.get('/raw', {
            params: { file: path, source: 'srv' },
            responseType: 'blob'
        });

        // Create blob URL for preview/download
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error('Failed to download file:', error);
        throw error;
    }
};
