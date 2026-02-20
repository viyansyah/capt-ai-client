import { Outlet } from "react-router"
import NavBar from "../componet/NavBar"
export default function BaseLayout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}   