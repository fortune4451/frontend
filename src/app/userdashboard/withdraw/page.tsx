'use client'

import React, { useState, useEffect } from 'react'
import { HeaderContent } from '@/components/ui/cardContent' // Importing card content components
import { Select, Input, useToast } from '@chakra-ui/react' // Importing Chakra UI components for form controls
import { Button } from '@/components/ui/button' // Importing custom Button component
import axios from 'axios' // Importing Axios for making API calls
import Link from 'next/link'
import withAuth from '@/app/path/to/withAuth'
import { baseUrl } from '@/utils/constants'

const Withdraw = () => {
    // State variables to manage component state
    const [balance, setBalance] = useState(0) // User's interest wallet balance
    const [amount, setAmount] = useState('') // Amount input by the user
    const [gateway, setGateway] = useState('') // Selected payment gateway for withdrawal
    const [address, setAddress] = useState('') // Address input for receiving funds
    const [errorMessage, setErrorMessage] = useState('') // Error message for amount validation
    const [token, setToken] = useState<string | null>(null)
    const toast = useToast()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This ensures the code runs only on the client-side
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }
        if (token) {
            const fetchData = async () => {
                try {
                    const { data } = await axios({
                        method: 'GET',
                        url: `${baseUrl}/users/investments`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    setBalance(data.interest)
                    console.log(`this is the balance ${balance}`)
                } catch (error) {
                    console.error('Error fetching Deposit Wallet data:', error)
                    throw error
                }
            }

            fetchData()
        }
    }, [token])

    // Handle the withdrawal button click
    const handleWithdraw = async () => {
        const withdrawAmount = parseFloat(amount)
        // Validate that the withdrawal amount does not exceed the user's balance
        if (withdrawAmount > balance) {
            setErrorMessage('Amount exceeds your wallet balance.')
            return
        } else {
            setErrorMessage('') // Clear error message if validation passes
        }

        // Attempt to send a withdrawal request to the backend
        try {
            const response = await axios({
                method: 'POST',
                url: `${baseUrl}/transactions`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    amount: withdrawAmount,
                    type: 'withdrawal',
                    gateway,
                    address,
                },
            })

            // console.log(response)

            // Send a WhatsApp message to the admin upon successful withdrawal request
            // await axios.post('/api/send-whatsapp', {
            //     message: `Withdrawal request: \nAmount: $${withdrawAmount}\nGateway: ${gateway}\nAddress: ${address}`, // Construct message
            //     adminContact: '+1234567890', // Placeholder for the admin's WhatsApp number
            // })

            toast({
                title: 'Success',
                description: 'Withdrawal request sent successfully!',
                status: 'success',
                duration: 3000, // 5 seconds (adjust if needed)
                isClosable: true,
                position: 'bottom', // As per your preference
            }) // Notify user of successful request
        } catch (error) {
            console.error('Failed to process withdrawal', error) // Log any errors during withdrawal processing
            toast({
                title: 'Error',
                description: 'Failed to process withdrawal request.',
                status: 'error',
                duration: 3000, // 3 seconds
                isClosable: true,
                position: 'bottom', // As per your preference
            }) // Notify user of failure
        }
    }

    /* eslint-disable react/no-unescaped-entities */
    return (
        <div className="grid items-center overflow:hidden">
            <div className="flex flex-col md:gap-4 gap-7 sm:w-[60%] mx-auto md:mt-12">
                {/* Header section for the withdrawal form */}
                <div className="flex flex-col gap-2">
                    <HeaderContent className="text-[#0a0f57]">
                        Withdraw Funds
                    </HeaderContent>
                    <p className="text-xs md:text-base">
                        The fund will be withdrawn only from the interest wallet
                        balance. Ensure you have sufficient balance.
                    </p>
                </div>
                {/* Button to navigate to the withdrawal history */}
                <div className="sm:text-right">
                    <Link href="/userdashboard/transaction">
                        <Button className="bg-[#0a0f57] text-white">
                            Withdraw History
                        </Button>
                    </Link>
                </div>
                {/* Withdrawal form container */}
                <div className="bg-white p-4 rounded-lg border shadow flex flex-col gap-5">
                    {/* Payment gateway selection */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-semibold">
                            Method
                        </label>
                        <Select
                            placeholder="Select Gateway"
                            value={gateway}
                            onChange={e => setGateway(e.target.value)}
                        >
                            {/* List of payment gateways for withdrawal */}
                            <option value="USDT">USDT (Trc 20)</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="BNB">BNB</option>
                            <option value="ETH">ETH</option>
                        </Select>
                    </div>
                    {/* Address input field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-semibold">
                            Address
                        </label>
                        <Input
                            placeholder="Paste Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    {/* Amount input field with validation message */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-semibold">
                            Amount
                        </label>
                        <Input
                            placeholder="$"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm">
                                {errorMessage}
                            </p>
                        )}{' '}
                        {/* Display error message if exists */}
                    </div>
                    {/* Withdrawal button */}
                    <div>
                        <Button
                            className="w-full text-lg bg-[#0a0f57]"
                            onClick={handleWithdraw}
                        >
                            Withdraw
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Withdraw)
