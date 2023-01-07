/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Logout from "../components/Logout";
import { BsTelephone } from "react-icons/bs";

const Dashboard = () => {

    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            async function fetchData() {
                const res = await fetch("/dashboard/startmsg", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
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
                    <a href="/">
                        <h5 class="font-karla mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You are successfully signed in.</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <Logout />
                </div>
            </div>

            <div class="flex justify-center mt-5 font-inter">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="/">
                        <h5 class="font-karla mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add your number to connect.</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Type in your number to connect to Twilio WhatsApp Sandbox where you can send and receive messages.</p>
                    <form onSubmit={handleSubmit}>
                        <label for="phone" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">phone</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <div class="text-gray-500 dark:text-gray-400" ><BsTelephone /></div>
                            </div>
                            <input type="tel" onChange={handleChange} id="phone" name="phone" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9876543210" required />
                            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
                        </div>
                    </form>
                    {data ? (
                        <div class="font-inter p-2 mt-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span class="font-bold">{data.success}!</span> Your number has been saved.
                        </div>
                    ) : error ? (
                        <div class="font-inter p-2 mt-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-bold">{error}!</span> Something went wrong. Try again.
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Dashboard;