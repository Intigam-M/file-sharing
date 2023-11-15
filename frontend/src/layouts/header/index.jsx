import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "~/store/auth"

function Header() {
    const authUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    return (
        <div className="bg-blue-400 sticky top-0 mb-8">
            <div className=" flex justify-between container mx-auto py-5">
                <p className="text-lg text-white">{authUser.first_name} {authUser.last_name}</p>
                <div className="flex gap-8 text-white text-lg font-">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/shared-files">Shared files</NavLink>
                    <NavLink to="/" onClick={() => dispatch(logoutSuccess())}>Logout</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header