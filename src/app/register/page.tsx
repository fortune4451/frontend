'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Select from 'react-select'
import countryList from 'country-list'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Input } from '@chakra-ui/react'
import { baseUrl } from '@/utils/constants'
import { ChartNoAxesCombined } from 'lucide-react'

const RegisterForm = () => {
    const [selectedCountry, setSelectedCountry] = useState<{
        value: string
        label: string
    } | null>(null)
    const [mobile, setmobile] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [emailAddress, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [showPasswordRequirements, setShowPasswordRequirements] =
        useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false) // New state to track submission

    // Get the list of countries
    const countries = countryList.getData().map(country => ({
        value: country.code,
        label: country.name,
    }))

    const handleCountryChange = (
        selectedOption: { value: string; label: string } | null,
    ) => {
        setSelectedCountry(selectedOption)
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (firstname.length < 3)
            newErrors.firstname = 'Firstname must be at least 3 characters long'
        if (lastname.length < 3)
            newErrors.lastname = 'Lastname must be at least 3 characters long'
        if (username.length < 5)
            newErrors.username = 'Username must be at least 5 characters long'
        if (!emailAddress) newErrors.email = 'Email is required'
        if (!selectedCountry) newErrors.country = 'Country must be selected'
        if (!mobile) newErrors.mobile = 'Phone number is required'
        if (password.length < 8)
            newErrors.password = 'Password must be at least 8 characters long'
        if (!/[A-Z]/.test(password))
            newErrors.password =
                'Password must contain at least one uppercase letter'
        if (!/[0-9]/.test(password))
            newErrors.password = 'Password must contain at least one number'
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            newErrors.password =
                'Password must contain at least one special character'
        if (password !== confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true) // Indicate that the form is being submitted
            try {
                const response = await fetch(`${baseUrl}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstname,
                        lastname,
                        username,
                        emailAddress,
                        country: selectedCountry?.label,
                        mobile,
                        password,
                        // confirmPassword
                    }),
                })

                const data = await response.json()

                if (response.ok) {
                    // If successful, redirect to login page
                    window.location.href = '/login'
                } else {
                    // If there's an error from the backend, display it
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        serverError:
                            data.message ||
                            'Something went wrong, please try again',
                    }))
                }
            } catch (error) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    serverError: 'Network error, please try again later',
                }))
            } finally {
                setIsSubmitting(false) // Reset submitting state
            }
        }
    }

    const handlePasswordFocus = () => {
        setShowPasswordRequirements(true)
    }

    const handlePasswordBlur = () => {
        setShowPasswordRequirements(false)
    }

    const clearError = (field: string) => {
        setErrors(prevErrors => {
            const { [field]: _, ...rest } = prevErrors
            return rest
        })
    }


    /* eslint-disable react/no-unescaped-entities */
    return (
        <div className="flex items-center justify-center h-[100vh] ">
            <div className="bg-white p-6 sm:p-8 rounded-xl w-[90vw] sm:w-[70vw] lg:w-[50vw] flex flex-col gap-5">
                <div className="flex flex-col gap-1 text-center">
                    <a href="/" className="flex justify-around mb-3">
                        <div className='flex items-center'>
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
                    <h1 className="font-semibold text-xl text-left">Create an Account</h1>
                    <p className="text-xs sm:text-sm text-left">
                        You can create an account using email or username and
                        the registration is fully free
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 text-black"
                >
                    {/* Firstname */}
                    <Input
                        type="text"
                        id="firstname"
                        placeholder={errors.firstname || 'Firstname'}
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        className={`p-1 px-2 rounded-sm text-black outline-none border text-sm ${
                            errors.firstname ? 'border-red-500' : 'border-grey'
                        }`}
                        onFocus={() => clearError('firstname')}
                    />

                    {/* Lastname */}
                    <Input
                        type="text"
                        id="lastname"
                        placeholder={errors.lastname || 'Lastname'}
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        className={`p-1 px-2 rounded-sm text-black outline-none border text-sm ${
                            errors.lastname ? 'border-red-500' : 'border-grey'
                        }`}
                        onFocus={() => clearError('lastname')}
                    />

                    {/* Username */}
                    <Input
                        type="text"
                        id="username"
                        placeholder={errors.username || 'Username'}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={`p-1 px-2 rounded-sm text-black outline-none border text-sm ${
                            errors.username ? 'border-red-500' : 'border-grey'
                        }`}
                        onFocus={() => clearError('username')}
                    />

                    {/* E-mail */}
                    <Input
                        type="email"
                        id="emailAddress"
                        placeholder={errors.email || 'E-Mail Address'}
                        value={emailAddress}
                        onChange={e => setEmail(e.target.value)}
                        className={`p-1 px-2 rounded-sm text-black outline-none border text-sm ${
                            errors.email ? 'border-red-500' : 'border-grey'
                        }`}
                        onFocus={() => clearError('email')}
                    />

                    {/* Country */}
                    <Select
                        id="country"
                        options={countries}
                        onChange={handleCountryChange}
                        className={`rounded-sm text-black outline-none border text-sm ${
                            errors.country ? 'border-red-500' : 'border-grey'
                        }`}
                        value={selectedCountry}
                        onFocus={() => clearError('country')}
                    />

                    {/* Mobile Number */}
                    <PhoneInput
                        country={selectedCountry?.value.toLowerCase() || 'us'}
                        value={mobile}
                        onChange={setmobile}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: false,
                        }}
                        containerClass={`w-[500px] ${
                            errors.mobile ? 'border-red-500' : 'border-grey'
                        }`}
                        inputClass="p-1 px-2 rounded-sm text-black outline-none border text-sm w-full"
                        onFocus={() => clearError('mobile')}
                    />

                    {/* Password */}
                    <Input
                        type="password"
                        id="password"
                        placeholder={errors.password || 'Password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        className={`p-1 px-2 rounded-sm text-black outline-none border text-sm ${
                            errors.password ? 'border-red-500' : 'border-grey'
                        }`}
                    />

                    {/* Confirm Password */}
                    <Input
                        type="password"
                        id="confirmPassword"
                        placeholder={
                            errors.confirmPassword || 'Confirm password'
                        }
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className={`p-1 px-2 rounded-sm text-black outline-none border text-sm ${
                            errors.confirmPassword
                                ? 'border-red-500'
                                : 'border-grey'
                        }`}
                        onFocus={() => clearError('confirmPassword')}
                    />

                    {/* Password Requirements */}
                    {showPasswordRequirements && (
                        <div className="flex flex-col gap-2 text-xs">
                            <p
                                className={
                                    password.length >= 8
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                Password must be at least 8 characters long
                            </p>
                            <p
                                className={
                                    /[A-Z]/.test(password)
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                Password must contain at least one uppercase
                                letter
                            </p>
                            <p
                                className={
                                    /[0-9]/.test(password)
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                Password must contain at least one number
                            </p>
                            <p
                                className={
                                    /[!@#$%^&*(),.?":{}|<>]/.test(password)
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                Password must contain at least one special
                                character
                            </p>
                        </div>
                    )}

                    {/* Submission Button */}
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white text-xs sm:text-sm py-2 rounded-sm hover:bg-blue-700 transition duration-200 ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                    >
                        Create Account
                    </button>

                    {/* Server Error Message */}
                    {errors.serverError && (
                        <p className="text-red-500 text-xs text-center">
                            {errors.serverError}
                        </p>
                    )}
                </form>

                <div className="text-xs mx-auto text-center">
                    <p>
                        Already have an account?{' '}
                        <Link href="/login">
                            <span className="text-blue-400 hover:text-blue-600 font-semibold hover:underline">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
