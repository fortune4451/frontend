'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Input, Spinner } from '@chakra-ui/react' // Import Chakra UI Spinner
import { baseUrl } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { ChartNoAxesCombined } from 'lucide-react'

const LoginPage = () => {
    const router = useRouter()
    const [identifier, setIdentifier] = useState('') // Unified identifier for both email and username
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [keepLoggedIn, setKeepLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // New state for loading spinner

    useEffect(() => {
        const authToken = localStorage.getItem('token')
        if (authToken) {
            router.push('/userdashboard/dashboard')
        }
    })

    // Backend login function
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsLoading(true) // Set loading state to true when login starts

        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }), // Send identifier and password to the backend
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(
                    errorData.message || 'Invalid login credentials',
                )
            }

            const data = await response.json()

            // Store token based on user's preference for staying logged in
            if (keepLoggedIn) {
                localStorage.setItem('token', data.token)
            } else {
                sessionStorage.setItem('token', data.token)
            }

            // Redirect user based on their role
            if (data.user.admin) {
                router.push('/adminDashboard')
            } else {
                router.push('/userdashboard/dashboard')
            }
        } catch (error: any) {
            setError(error.message || 'An error occurred')
        } finally {
            setIsLoading(false) // Set loading state to false after login is process complete
        }
    }

    /* eslint-disable react/no-unescaped-entities */
    return (
        <div className="flex items-center justify-center h-[100vh] overflow:hidden">
            <div className="bg-white p-6 sm:p-8 rounded-xl w-[90vw] sm:w-[60vw] lg:w-[50vw] flex flex-col gap-5">
                <div className="flex flex-col gap-1  text-center w-full ">
                    <a href="/" className="flex justify-around mb-3">
                        <div className="flex items-center">
                            <ChartNoAxesCombined
                                size={23}
                                color="#e99a2b"
                                stroke="#e99a2b"
                                strokeWidth={2}
                            />
                            <div
                                className="font-bold font-mono text-lg sm:text-xl text-[#0a0f57]"
                                translate="no"
                            >
                                PrimeBullTrade
                            </div>
                        </div>
                    </a>

                    <h1 className="font-semibold text-lg text-left">
                        Login to your account
                    </h1>
                    <p className="text-xs text-left">
                        You can sign in to your account using username or email
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Identifier (Username or Email) */}
                    <div>
                        <label
                            htmlFor="identifier"
                            className="block text-sm text-gray-700"
                        >
                            Username or Email
                        </label>
                        <Input
                            type="text"
                            id="identifier"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)} // Update identifier state
                            className="p-1 px-2 rounded-sm text-black outline-none border border-grey text-sm w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-700"
                        >
                            Password
                        </label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="p-1 px-2 rounded-sm text-black outline-none border border-grey text-sm w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-[-20%]"
                        >
                            {showPassword ? (
                                <FaEyeSlash className="text-gray-500 text-sm" />
                            ) : (
                                <FaEye className="text-gray-500 text-sm" />
                            )}
                        </button>
                    </div>

                    <div>
                        <p className="text-red-500 text-[11px] text-center">
                            {error || '    '}
                        </p>
                    </div>

                    {/* Stay Logged In */}
                    <div className="flex text-xs">
                        <Input
                            type="checkbox"
                            id="agree"
                            checked={keepLoggedIn}
                            onChange={e => setKeepLoggedIn(e.target.checked)}
                            className="text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="agree"
                            className="ml-2 block text-xs text-gray-900"
                        >
                            Keep me Logged in
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white  h-9 rounded-md cursor-pointer text-sm text-center w-full"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? 'Loading. . .' : 'Login Account'}
                    </button>

                    {/* Login Redirect */}
                    <p className="text-xs mx-auto text-center">
                        Don't have any account?{' '}
                        <Link
                            href="/register"
                            className="text-blue-400 hover:text-blue-600 font-semibold hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                    {/* Forgot password */}
                    <p className="text-xs mx-auto text-center">
                        <Link
                            href="/forgotPass"
                            className="text-blue-400 hover:text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
