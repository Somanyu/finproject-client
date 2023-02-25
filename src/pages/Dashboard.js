/* eslint-disable no-unused-vars */
import 'flowbite';
import { useEffect, useState } from "react";
import Logout from "../components/Logout";
const Cookies = require('js-cookie');

const Dashboard = () => {

    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const cookieValue = Cookies.get('jwt');

    useEffect(() => {
        setIsLoading(true);
        fetch("https://finproject-server.azurewebsites.net/dashboard/user")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            });
    }, []);




    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            async function fetchData() {
                const res = await fetch("https://finproject-server.azurewebsites.net/dashboard/startmsg", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookieValue}`,
                    },
                    body: JSON.stringify(formData)
                })
                const json = await res.json();
                if (res.status === 200) {
                    setData(json)
                } else {
                    setError(json.message)
                }
            }
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div class="flex justify-around mt-10 font-inter">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div href="/">
                        <h5 class="font-karla mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You are successfully signed in.</h5>
                    </div>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">You need to <a href="https://wa.me/+14155238886?text=join%20discover-series" class="font-semibold text-red-600 underline hover:text-red-800">connect</a> to our Twilio Sandbox for starting with our app. After receiving a text from Twilio click on "Send text" below to check. Get started now 👍</p>
                    <div class="flex justify-between">
                        <Logout />
                        <button type="submit" data-modal-target="small-modal" data-modal-toggle="small-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            See Profile
                        </button>
                    </div>
                </div>
            </div>

            <div class="font-inter my-5">
                {data ? (

                    <div id="alert-border-3" class="transition ease-in-out m-auto max-w-sm flex p-4 mb-4 text-green-700 bg-green-100 border-t-4 border-green-500 dark:text-green-400 dark:bg-gray-800" role="alert">
                        <div class="ml-3 text-sm font-medium">
                            <span class="font-bold">{data.success}!</span> Your connected to sandbox.
                        </div>
                    </div>
                ) : error ? (
                    <div id="alert-border-1" class="max-w-sm m-auto flex p-4 mb-4 text-red-700 bg-red-100 border-t-4 border-red-500 dark:text-red-400 dark:bg-gray-800" role="alert">
                        <div class="ml-3 text-sm font-medium">
                            <span class="font-bold">{error}!</span> Something went wrong. Try again.
                        </div>
                    </div>
                ) :
                    <button onClick={handleSubmit} type="submit" class="max-w-sm m-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send text</button>
                }
            </div>

            <div id="small-modal" tabindex="-1" class="font-inter fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div class="relative w-full h-full max-w-md md:h-auto">
                    {/* <!-- Modal body --> */}
                    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        {isLoading ? (
                            <div role="status">
                                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        ) : users ? (
                            <div class="flex flex-col items-center pb-10">
                                <img class="w-24 h-24 mb-3 mt-10 rounded-full shadow-lg" src={users.data.avatar} alt="somanyu" />
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{users.data.firstName} {users.data.lastName}</h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{users.data.email}</span>
                                <div class="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                                    <a href="/" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                                </div>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;