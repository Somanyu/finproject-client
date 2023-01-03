import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                // get JWT cookie
                // eslint-disable-next-line
                const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                const response = await fetch('http://localhost:3001/dashboard', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                if (response.status === 401) {
                    window.location.href = '/signin'
                }
                const data = await response.json();
                setIsAuthenticated(data.success)
            } catch (error) {
                console.log(error);
            }
        }
        checkAuth()
    }, [])

    if(isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to="/signin"/>
    }
    return (
        <div>
            <h1>You are successfully signed in</h1>
        </div>
    )
}

export default Dashboard;