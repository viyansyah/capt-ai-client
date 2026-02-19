import { Link } from "react-router"
import { useNavigate } from "react-router"
export default function NavBar() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/login")
    }


    return (
        <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">
                <Link to="/dashboard">CaptionLab AI</Link>
            </div>
            <div className="flex gap-6">
                <Link to="/dashboard/generate" className="font-medium text-gray-500 transition-colors hover:text-indigo-600">Generate</Link>
                <Link to="/dashboard/history" className="font-medium text-gray-500 transition-colors hover:text-indigo-600">History</Link>
            </div>
            <div className="flex items-center">
                {token && (
                    <>
                        <span className="mr-4 text-gray-700">Hello,</span>
                        <button
                            onClick={handleLogout}
                            className="rounded border border-gray-300 bg-transparent px-4 py-2 text-gray-500 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}