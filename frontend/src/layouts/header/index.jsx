import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutSuccess } from "~/store/auth"

function Header() {
    const dispatch = useDispatch()
    return (
        <div className="bg-slate-400 flex justify-between">
            <h1>Header</h1>
            <NavLink to="/" onClick={() => dispatch(logoutSuccess())}>Logout</NavLink>
        </div>
    )
}

export default Header