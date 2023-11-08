import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "~/store/auth"

function Header() {
    const authUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    return (
        <div className="bg-slate-400 flex justify-between">
            <h1>Header</h1>
            <p className="font-bold">{authUser.first_name} {authUser.last_name}</p>
            <NavLink to="/" onClick={() => dispatch(logoutSuccess())}>Logout</NavLink>
        </div>
    )
}

export default Header