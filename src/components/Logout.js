import { useNavigate } from "react-router-dom";

const Logout = () => {
    let navigate = useNavigate();
    async function logout() {
        console.log("CLICKED LOGOUT");
        try {
            await fetch('http://localhost:3001/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'appplication/json'
                },
                body: JSON.stringify({
                    jwt: document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                })
            })
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            navigate('/signin')
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <button onClick={logout} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Sign out
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </>
    );
}

export default Logout;