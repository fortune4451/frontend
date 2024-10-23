'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { InvestCard, HeaderContent } from '@/components/ui/cardContent'
import { ChakraProvider } from '@chakra-ui/react'
import { InvestmentChart } from '@/components/investmentChart'
import Link from 'next/link'
import withAuth from '@/app/path/to/withAuth'
import axios from 'axios'
import { baseUrl } from '@/utils/constants'

type Grade = {
    title: string
    amount: number
}

type Plan = {
    grade: number
    rate: string
    duration: string
}

type ActivePlan = {
    gradeTitle: string
    plan: Plan
    amountInvested: number
    startDate: string
    endDate: string
}

type InvestmentData = {
    totalInvestment: number
    totalProfit: number
    grades: Grade[]
    activePlans: ActivePlan[]
}

const InvestmentPage = () => {
    // Initialise investment data with zeros or from localStorage
    const [investmentData, setInvestmentData] = useState<InvestmentData>(() => {
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem('investmentData')
            return cachedData
                ? JSON.parse(cachedData)
                : {
                      totalInvestment: 0,
                      totalProfit: 0,
                      grades: [],
                      activePlans: [],
                  }
        }
        return {
            totalInvestment: 0,
            totalProfit: 0,
            grades: [],
            activePlans: [],
        }
    })

    const [gradePercentages, setGradePercentages] = useState<
        { grade: string; percentage: string }[]
    >([])
    const [token, setToken] = useState<string | null>(null)

    const fetchUserPlansData = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${baseUrl}/users/plans`,
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
    const fetchInvestmentWalletData = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${baseUrl}/users/investments`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        } catch (error) {
            console.error('Error fetching Investment Wallet data:', error)
            throw error
        }
    }

    // Fetch data from the backend
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This ensures the code runs only on the client-side
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }
        const fetchInvestmentData = async () => {
            try {
                const investmentData = await fetchInvestmentWalletData()
                const userPlansData = await fetchUserPlansData()

                let totalInvestments = 0
                userPlansData.forEach((plan: any) => {
                    totalInvestments += plan.amountInvested * 1
                })
                const userActivePlans = userPlansData.filter(
                    (item: any) => item.isActive === true,
                )

                const updatedInvestmentData = {
                    totalProfit:
                        investmentData.totalEarned +
                        investmentData.availableBal,
                    totalInvestment: totalInvestments,
                    activePlans: userActivePlans,
                }

                // Update the state with new data
                setInvestmentData(prevData => ({
                    ...prevData,
                    ...updatedInvestmentData,
                }))

                // Store the new data in localStorage
                localStorage.setItem(
                    'investmentData',
                    JSON.stringify(updatedInvestmentData),
                )

                // calculateGradePercentages(data)
            } catch (error) {
                console.error('Error fetching investment data:', error)
            }
        }

        fetchInvestmentData()
    }, [token])

    // Calculate grade percentages based on the total investment
    const calculateGradePercentages = (data: InvestmentData) => {
        const total = data.totalInvestment
        const percentages = data.grades.map(grade => {
            return {
                grade: grade.title,
                percentage: ((grade.amount / total) * 100).toFixed(2),
            }
        })
        setGradePercentages(percentages)
    }

    /* eslint-disable react/no-unescaped-entities */
    return (
        <ChakraProvider>
            <div className="grid items-center overflow:hidden">
                <div className="flex flex-col gap-4 sm:w-[90%] mx-auto md:mt-12">
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">Investment</p>
                        <HeaderContent className="text-[#0a0f57]">
                            All Investment
                        </HeaderContent>
                    </div>
                    <div className="flex flex-col gap-5">
                        {/* Grade */}
                        <div className="flex gap-5 lg:flex-row flex-col">
                            <InvestCard>
                                <div className="flex flex-col gap-4">
                                    <p className="font-semibold">
                                        Total Invest
                                    </p>
                                    <p className="font-semibold text-lg">
                                        ${investmentData.totalInvestment}
                                    </p>
                                    <Link href="/userdashboard/investments/plan">
                                        <Button className="bg-[#0a0f57] text-white">
                                            Invest Now
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="font-semibold">
                                        Total Profit
                                    </p>
                                    <p className="font-semibold text-lg">
                                        ${investmentData.totalProfit.toFixed(2)}
                                    </p>
                                    <Button className="bg-[#0a0f57] text-white">
                                        Withdraw Now
                                    </Button>
                                </div>
                            </InvestCard>

                            {/* <div className="w-full flex lg:flex-row flex-col lg:items-center gap-12 justify-between rounded-xl border p-4 hover:shadow cursor-pointer bg-white">
                                <div className="flex flex-wrap lg:flex-col gap-3 font-semibold">
                                    {gradePercentages.map((grade, index) => (
                                        <p
                                            key={index}
                                            className="w-fit border bg-slate-200 p-1 rounded-sm"
                                        >
                                            {grade.percentage}% - {grade.grade}
                                        </p>
                                    ))}
                                </div>
                                <div>
                                    <h1>
                                        <InvestmentChart />
                                    </h1>
                                </div>
                            </div> */}
                        </div>

                        {/* Active Plan */}
                        <div className="flex flex-col gap-2">
                            <h3>
                                Active Plan ({investmentData.activePlans.length}
                                )
                            </h3>
                            {investmentData.activePlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className="w-full flex flex-col sm:flex-row  lg:items-center gap-3 lg:gap-12 justify-between rounded-xl border p-4 hover:shadow cursor-pointer bg-white text-[#0a0f57] text-sm lg:text-base "
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {`Grade ${plan.plan.grade}`} - Every
                                            Day for {plan.plan.rate}% for 5 Days
                                        </h3>
                                        <p>
                                            Invested:{' '}
                                            <strong>
                                                ${plan.amountInvested}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="flex gap-5 justify-between">
                                        <div>
                                            <h3 className="font-semibold">
                                                Start Date
                                            </h3>
                                            <p>
                                                {new Date(
                                                    plan.startDate,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                End Date
                                            </h3>
                                            <p>
                                                {new Date(
                                                    plan.endDate,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                Total Return
                                            </h3>
                                            <p>
                                                $
                                                {(plan.amountInvested *
                                                    Number(plan.plan.rate)) /
                                                    100}{' '}
                                                x 5 = $
                                                {((plan.amountInvested *
                                                    Number(plan.plan.rate)) /
                                                    100) *
                                                    5}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    )
}

export default withAuth(InvestmentPage)
