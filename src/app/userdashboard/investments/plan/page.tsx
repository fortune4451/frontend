'use client'

import { Button } from '@/components/ui/button'
import { HeaderContent } from '@/components/ui/cardContent'
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    Input,
    useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios' // Assuming axios is used for API requests
import withAuth from '@/app/path/to/withAuth'
import { baseUrl } from '@/utils/constants'

interface Plan {
    uuid: string
    grade: number
    rate: string
    duration: string
    minAmt: number
    maxAmt: string
    createdAt: string
    updatedAt: string
}

interface Wallet {
    type: 'deposit' | 'interest'
    balance: number
}

const InvestmentPlan = () => {
    const [plans, setPlans] = useState<Plan[] | null>(null)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const [wallets, setWallets] = useState<Wallet[]>([]) // Wallets fetched from the backend
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
    const [amount, setAmount] = useState<number>(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [token, setToken] = useState<string | null>(null)
    const fetchPlansData = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${baseUrl}/plans/all`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        } catch (error) {
            console.error('Error fetching User plans data:', error)
            throw error
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This ensures the code runs only on the client-side
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }
        const fetchData = async () => {
            const response = await fetchPlansData()
            setPlans(response)
        }
        fetchData()
    }, [token])

    const handleInvestClick = (plan: Plan) => {
        setSelectedPlan(plan)
        onOpen() // Open the modal when a plan is selected
    }

    const handleInvestment = async () => {
        if (!selectedPlan || !selectedWallet) return
        const selectedWalletObj = wallets.find(
            wallet => wallet.type === selectedWallet,
        )

        // Validate amount
        if (
            amount < selectedPlan.minAmt ||
            amount > Number(selectedPlan.maxAmt)
        ) {
            toast({
                title: `Amount must be between $${selectedPlan.minAmt} and $${selectedPlan.maxAmt}`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        if (selectedWalletObj && amount > selectedWalletObj.balance) {
            toast({
                title: 'Insufficient balance in selected wallet',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        try {
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/transactions/plan`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    amount,
                    planId: selectedPlan?.uuid,
                },
            })
            toast({
                title: 'Investment successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            onClose() // Close modal on success
        } catch (error: any) {
            console.error('Investment failed', error)
            toast({
                title: `${error.response.data.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        }
    }

    /* eslint-disable react/no-unescaped-entities */
    return (
        <div>
            <div className="flex flex-col gap-5 md:p-10 p-2">
                <HeaderContent className="text-[#0a0f57]">
                    Investment Plan
                </HeaderContent>
                <div className="flex gap-5 flex-wrap justify-between">
                    {plans?.map((plan, index) => (
                        <div
                            key={index}
                            className="w-[350px] h-[450px] p-4 py-6 bg-white rounded-md shadow flex flex-col text-[#0a0f57] gap-6 text-center justify-between border"
                        >
                            <div className="flex flex-col gap-1">
                                <h1 className="font-semibold text-3xl">
                                    Grade {plan.grade}
                                </h1>
                                <p className="uppercase">
                                    Total {Number(plan.rate) * 5}% ROI
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-6xl font-semibold">
                                    {plan.rate}%
                                </h1>
                                <p className="uppercase">
                                    EVERY DAY FOR {plan.duration} DAYS
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <p>Investment</p>
                                    <p>
                                        ${plan.minAmt} - ${plan.maxAmt}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Max. Earn</p>
                                    <p>
                                        $
                                        {(
                                            (Number(plan.rate) *
                                                5 *
                                                Number(plan.maxAmt)) /
                                            100
                                        ).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total Return</p>
                                    <p>capital + {Number(plan.rate) * 5}%</p>
                                </div>
                            </div>
                            <Button
                                variant="invest"
                                onClick={() => handleInvestClick(plan)}
                            >
                                Invest Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for investment */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent mx="4">
                    <ModalHeader>
                        Confirm to invest in Grade {selectedPlan?.grade}
                    </ModalHeader>
                    <ModalBody>
                        <p className="font-semibold text-center">
                            Invest: ${selectedPlan?.minAmt} - $
                            {selectedPlan?.maxAmt}
                        </p>
                        <p className="text-center">
                            Interest: {selectedPlan?.rate}%
                        </p>
                        <p className="text-center">Every Day for 5 Days</p>

                        <div className="mt-4">
                            <label>Select Wallet *</label>
                            <Select
                                placeholder="Select One"
                                onChange={e =>
                                    setSelectedWallet(e.target.value)
                                }
                            >
                                <option value={'deposit'}>Balance</option>
                            </Select>
                        </div>

                        <div className="mt-4">
                            <label>Invest Amount *</label>
                            <Input
                                placeholder="$"
                                type="number"
                                value={amount}
                                onChange={e =>
                                    setAmount(parseFloat(e.target.value))
                                }
                            />
                        </div>
                    </ModalBody>

                    <ModalFooter className="flex gap-3">
                        <Button variant="outline" onClick={onClose}>
                            No
                        </Button>
                        <Button onClick={handleInvestment}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default withAuth(InvestmentPlan)
