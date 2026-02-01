import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import useThemeStore from '../../store/themeStore';

const AppLayout = () => {
    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 font-sans flex flex-col transition-colors duration-300">
            {/* Header - Glassmorphism */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#0077b6]/10 dark:border-slate-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-[#0077b6] dark:text-sky-400 flex items-center gap-2 group">
                        <div className="p-1.5 bg-[#0077b6]/10 dark:bg-sky-400/10 rounded-lg backdrop-blur-sm group-hover:bg-[#0077b6]/20 dark:group-hover:bg-sky-400/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h-4m4 4h-4" />
                            </svg>
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0077b6] to-[#0096c7] dark:from-sky-400 dark:to-cyan-300">
                            StoreYourFiles
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
                            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
                        >
                            {theme === 'light' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>

                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-sky-50 dark:bg-slate-800 rounded-full border border-sky-100 dark:border-slate-700 backdrop-blur-sm transition-colors">
                            <div className="w-2 h-2 rounded-full bg-[#0077b6] dark:bg-sky-400 animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {localStorage.getItem('fb_username') || 'Admin'}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to logout?')) {
                                    window.location.href = '/login';
                                    localStorage.removeItem('fb_token');
                                    localStorage.removeItem('fb_username');
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 font-medium text-sm border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                            title="Logout"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01 3-3h4a3 3 0 01 3 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
                <div className="relative z-0">
                    <Outlet />
                </div>
            </main>

            {/* Footer - Glassmorphism */}
            <footer className="mt-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-t border-[#0077b6]/10 dark:border-slate-700/50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            &copy; {new Date().getFullYear()} StoreYourFiles. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-gray-400 hover:text-[#0077b6] dark:hover:text-sky-400 transition-colors text-sm font-medium">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-[#0077b6] dark:hover:text-sky-400 transition-colors text-sm font-medium">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-[#0077b6] dark:hover:text-sky-400 transition-colors text-sm font-medium">Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
