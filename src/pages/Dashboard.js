import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Logout from "../components/Logout";

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

    if (isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to="/signin" />
    }
    return (
        <>
            <div class="flex justify-center mt-10 font-inter">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="/">
                        <h5 class="font-karla mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You are successfully signed in.</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <Logout />
                </div>
            </div>
        </>
    )
}

export default Dashboard;