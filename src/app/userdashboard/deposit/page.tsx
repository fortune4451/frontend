'use client' // Marks this component as a client-side component in Next.js

import { useEffect, useState } from 'react' // Import React hooks for state management
import { useDeposit } from '@/components/depositContext' // Custom hook to manage deposit-related state
import { AiOutlineArrowLeft } from 'react-icons/ai' // Icon for "back" button
import { ChakraProvider, useToast, Button as ChakraButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react' // Chakra UI components
import { HeaderContent } from '@/components/ui/cardContent' // Custom component for displaying header content
import { Select, Input } from '@chakra-ui/react' // Chakra UI components for form inputs
import { Button } from '@/components/ui/button' // Custom button component
import axios from 'axios'
import { baseUrl } from '@/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Use next/navigation for router navigation

const DepositAndConfirmation = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const toast = useToast() // Initialize Chakra UI's toast
    const { isOpen, onOpen, onClose } = useDisclosure() // Chakra UI modal controls
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [inputAmount, setInputAmount] = useState('')
    const [isAmountFocused, setIsAmountFocused] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState<string | null>(null)
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false) // State to disable button during payment processing
    const router = useRouter() // Router for navigation

    // Custom hook values from deposit context
    const { gateway, amount, setGateway, setAmount } = useDeposit()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }
    })

    const handleDepositSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as any // Get the form element
        const selectedGateway = form.gateway.value // Get selected payment gateway
        const depositAmount = parseFloat(form.amount.value) // Get and parse deposit amount

        // Validate the deposit amount
        if (depositAmount < 10 || depositAmount > 50000) {
            alert('Deposit amount must be between $10 and $50,000.')
            return
        }

        // Update the context with selected gateway and amount
        setGateway(selectedGateway)
        setAmount(depositAmount)
        setIsConfirmed(true) // Switch to the confirmation view
    }

    const handleCopyToClipboard = (address: string) => {
        navigator.clipboard
            .writeText(address)
            .then(() => {
                toast({
                    title: 'Wallet address copied!',
                    description: 'The wallet address has been successfully copied to your clipboard.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .catch(err => {
                toast({
                    title: 'Error copying address',
                    description: 'Failed to copy the wallet address. Please try again.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                console.error('Failed to copy address: ', err)
            })
    }

    const handleBack = () => {
        setIsConfirmed(false)
    }

    const handlePayNow = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${baseUrl}/transactions`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    amount: inputAmount,
                    type: 'deposit',
                    gateway: gateway,
                    address: walletAddresses[gateway],
                },
            })

            if (response.status === 200) {
                toast({
                    title: 'Payment submitted!',
                    description: `Transaction ID: ${response.data.uuid}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                router.push('/userdashboard/deposit') // Navigate back to the deposit page
            } else {
                setErrorMessage('Failed to submit payment. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting payment:', error)
            setErrorMessage('An error occurred. Please try again.')
        }
    }

    const confirmPayment = async () => {
        setIsPaymentProcessing(true)
        try {
            await handlePayNow()
            onClose()
            router.push('/userdashboard/deposit')
        } catch (error) {
            console.error('Error confirming payment:', error)
        } finally {
            setIsPaymentProcessing(false)
        }
    }

    const walletAddresses: { [key: string]: string } = {
        USDT: 'TAb1X6b7shttrXSvkCqNzf4oNC3vRdsjmw',
        BTC: 'bc1qx7v4z66ztrltvf7zfvhhdf46cd2t3g2u8ce6e5',
        BNB: '0x60F3AaF5a95fc9dd6eDEabc28964987Eeb21E678',
        ETH: '0x60F3AaF5a95fc9dd6eDEabc28964987Eeb21E678',
        LTC: 'ltc1qas2nagh8679hvsl32yypnk2kav4ejqcqk6lsh7',
        ERC20: '0x60F3AaF5a95fc9dd6eDEabc28964987Eeb21E678',
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value)
    }

    const limit = 50000
    const charge = 0
    const payableAmount = (parseFloat(inputAmount) || 0) + charge

    /* eslint-disable react/no-unescaped-entities */
    return (
        <ChakraProvider>
            <div className="flex flex-col items-center">
                {!isConfirmed ? (
                    <div className="flex flex-col md:gap-4 gap-7 sm:w-[60%] mx-auto md:mt-12">
                        {/* Your original form */}
                        {/* Header */}
                        <div className="flex flex-col gap-2">
                            <HeaderContent className="text-[#0a0f57]">Deposit Funds</HeaderContent>
                            <p className="text-xs md:text-base">
                                Add funds through our secure payment gateway...
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <Link href="/userdashboard/transaction">
                                <Button className="bg-[#0a0f57] text-white">Deposit History</Button>
                            </Link>
                        </div>
                        <form
                            className="mt-4 bg-white p-4 rounded-lg border shadow flex flex-col gap-5"
                            onSubmit={handleDepositSubmit}
                        >
                            {/* Select Gateway Input */}
                            <div className="mb-4">
                                <label className="block mb-2">Select Gateway</label>
                                <Select name="gateway" className="border p-2 rounded w-full" required>
                                    <option value="">Select One</option>
                                    <option value="USDT">USDT (Trc 20)</option>
                                    <option value="BNB">BNB</option>
                                    <option value="BTC">BTC</option>
                                    <option value="ETH">ETH</option>
                                    <option value="LTC">LTC</option>
                                    <option value="ERC20">ERC20</option>
                                </Select>
                            </div>
                            {/* Amount Input */}
                            <div className="mb-4">
                                <label className="block mb-2">Amount</label>
                                <Input
                                    placeholder="$"
                                    name="amount"
                                    type="number"
                                    className="border p-2 rounded w-full"
                                    value={inputAmount}
                                    onChange={e => setInputAmount(e.target.value)}
                                    onFocus={() => setIsAmountFocused(true)}
                                    onBlur={() => setIsAmountFocused(false)}
                                    min="10"
                                    max="50000"
                                    required
                                />
                                {isAmountFocused && (
                                    <div className="mt-2 border p-4 rounded bg-gray-100">
                                        <p>
                                            <strong>Limit:</strong> {formatCurrency(10)} - {formatCurrency(limit)}
                                        </p>
                                        <p>
                                            <strong>Charge:</strong> {formatCurrency(charge)}
                                        </p>
                                        <p>
                                            <strong>Payable:</strong> {formatCurrency(payableAmount)}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <Button type="submit" className="w-full text-lg bg-[#0a0f57]">
                                Submit
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-col items-center bg-white p-4 rounded-lg border shadow ">
                        <button className="flex items-center mb-4 text-blue-500" onClick={handleBack}>
                            <AiOutlineArrowLeft className="mr-2" />
                            Back to Deposit
                        </button>

                        <h1 className="text-2xl font-bold">
                            Deposit Confirmation
                        </h1>

                        {/* Wallet Address Display */}
                        <div className="mt-4 flex flex-col gap-2">
                            <p>
                                You have requested{' '}
                                <strong>{formatCurrency(amount)}</strong>.
                                Please pay exactly{' '}
                                <strong>{formatCurrency(amount)}</strong>...
                            </p>
                            <p>
                                Send funds to the company's {gateway} wallet
                                address within 30 minutes
                            </p>
                            <p
                                className="font-mono bg-gray-200 p-2 rounded cursor-pointer"
                                onClick={() =>
                                    handleCopyToClipboard(
                                        walletAddresses[gateway],
                                    )
                                }
                            >
                                {walletAddresses[gateway]}
                            </p>
                            <Input type="file" accept="image/*"  required className="mt-4" />
                        </div>

                        <div className="mt-6 w-full">
                            <Button
                                className="w-full text-lg bg-[#0a0f57] text-white"
                                onClick={onOpen}
                                disabled={isPaymentProcessing} // Disable button during payment processing
                            >
                                Pay Now
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for confirmation */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Payment</ModalHeader>
                    <ModalBody>
                        Are you sure you want to proceed with this deposit of {formatCurrency(parseFloat(inputAmount))}?
                    </ModalBody>
                    <ModalFooter>
                        <ChakraButton onClick={onClose}>Cancel</ChakraButton>
                        <ChakraButton
                            onClick={confirmPayment}
                            colorScheme="blue"
                            ml={3}
                            isLoading={isPaymentProcessing} // Loading state for confirm button
                        >
                            Confirm
                        </ChakraButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}

export default DepositAndConfirmation
