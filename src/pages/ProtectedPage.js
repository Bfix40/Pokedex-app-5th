import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedPages = () => {

    const userName = useSelector(state => state.userName)

    if (userName) {
        return<Outlet/>
    } else {
        return<Navigate to='/'/>
    }    
}

export default ProtectedPages       