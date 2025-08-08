import { useAuth } from '../context/AuthContext';

export const Header = () => {
    const { user, logout, loading } = useAuth();

    if (loading) {
        return (
            <div className="shadow h-14 flex justify-between items-center px-4">
                <div className="text-lg font-bold">PayTM App</div>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="text-lg font-bold">
                PayTM App
            </div>
            <div className="flex items-center space-x-3">
                <div className="text-sm font-medium">
                    Hello
                </div>
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center border">
                    <div className="text-lg font-semibold">
                        {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                    </div>
                </div>
                <div className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                </div>
                <button 
                    onClick={logout}
                    className="text-sm text-red-500 hover:text-red-700 font-medium ml-4 px-3 py-1 border border-red-500 rounded hover:bg-red-50"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};