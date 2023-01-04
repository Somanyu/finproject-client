import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault()
            async function fetchData() {
                const res = await fetch("/auth/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                const json = await res.json();
                if (res.status === 201) {
                    setData(json)
                    // console.log(json.success);
                    // navigate("/signin")
                    // window.location.href = '/signin'

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
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {data ? (
                        <div class="font-inter p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            <span class="font-bold">{data.success}</span> You can now <Link to="/signin" class="font-semibold underline hover:text-green-800 dark:hover:text-green-900">sign in</Link>.
                        </div>
                    ) : error ? (
                        <div class="font-inter p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <span class="font-bold">{error}</span> Try submitting again.
                        </div>
                    ) : null}
                    <Link href="/" class="flex font-karla items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                        💸 WP Finance
                    </Link>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="font-karla text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form class="font-inter" onSubmit={handleSubmit}>
                                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div class="w-full">
                                        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="John"
                                            required=""
                                        />
                                    </div>
                                    <div class="w-full">
                                        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Smith"
                                            required=""
                                        />
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input
                                            onChange={handleChange}
                                            type="email"
                                            name="email"
                                            id="email"
                                            class="font-medium bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required=""
                                        />
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                        <input
                                            onChange={handleChange}
                                            type="password"
                                            name="password"
                                            id="password"
                                            class="font-medium bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="••••••••"
                                            required=""
                                        />
                                    </div>
                                </div>
                                <button type="submit" class="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                                <p class="text-sm font-light mt-2 text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/signin" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Outlet />
        </>
    );
}

export default SignUp;
