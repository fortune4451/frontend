'use client';

import React, { useEffect, useState } from 'react';
import { Input, useToast } from '@chakra-ui/react';
import '../spinner.css';
import withAuth from '@/app/path/to/withAuth';
import { baseUrl } from '@/utils/constants';

const ProfilePage = () => {
    const initialUserData = {
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        username: '',
        country: '',
    };

    const [userData, setUserData] = useState(initialUserData);
    const [token, setToken] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); // New state to check if it's client-side
    const toast = useToast();

    useEffect(() => {
        setIsClient(true); // Only true after the component mounts on the client
    }, []);

    useEffect(() => {
        // Ensure this code only runs client-side
        if (isClient) {
            // Retrieve token from sessionStorage or localStorage
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token');
            setToken(storedToken);
            
            // Retrieve user data from localStorage if it exists
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, [isClient]); // This effect will only run on the client side

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) return; // Only fetch if token is available

            try {
                const response = await fetch(`${baseUrl}/users/me`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                const updatedUserData = {
                    firstname: data.firstname || '',
                    lastname: data.lastname || '',
                    mobile: data.mobile || '',
                    email: data.emailAddress || '',
                    username: data.username || '',
                    country: data.country || '',
                };

                // Update state and localStorage
                setUserData(updatedUserData);
                if (isClient) {
                    localStorage.setItem('userData', JSON.stringify(updatedUserData));
                }

                // Optionally show toast
                // toast({
                //     title: 'User data loaded successfully',
                //     status: 'success',
                //     duration: 3000,
                //     isClosable: true,
                //     position: 'bottom',
                // });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) fetchUserData();
    }, [token, isClient, toast]);

    return (
        <div className="flex flex-col gap-5 text-left items-center h-full overflow-hidden w-full">
            <form className="flex flex-col gap-4">
                <h2 className="font-semibold text-left text-xl text-[#0a0f57]">
                    Profile
                </h2>
                <div className="bg-white p-4 rounded-md shadow-black w-[90vw] sm:w-[80vw] lg:w-[50vw] flex flex-col gap-4">
                    {/* Username, First Name and Last Name */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="username" className="block text-sm text-gray-700">
                                Username
                            </label>
                            <Input
                                type="text"
                                id="username"
                                value={userData.username}
                                isReadOnly
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="firstname" className="block text-sm text-gray-700">
                                First Name
                            </label>
                            <Input
                                type="text"
                                id="firstname"
                                value={userData.firstname}
                                isReadOnly
                                className="w-full text-sm"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastname" className="block text-sm text-gray-700">
                                Last Name
                            </label>
                            <Input
                                type="text"
                                id="lastname"
                                value={userData.lastname}
                                isReadOnly
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm text-gray-700">
                                E-mail Address
                            </label>
                            <Input
                                type="email"
                                id="email"
                                value={userData.email}
                                isReadOnly
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Mobile Number and Country */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="mobile" className="block text-sm text-gray-700">
                                Mobile Number
                            </label>
                            <Input
                                type="text"
                                id="mobile"
                                value={userData.mobile}
                                isReadOnly
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="country" className="block text-sm text-gray-700">
                                Country
                            </label>
                            <Input
                                type="text"
                                id="country"
                                value={userData.country}
                                isReadOnly
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withAuth(ProfilePage);
