'use client'

// dashboard

import React, { useState, useEffect } from 'react'
import Card, { CardProps } from '@/components/ui/cardComponent'
import RoiChart from '@/components/roiStatistics'
import { Activity, ChartNoAxesCombined, HandCoins } from 'lucide-react'
import withAuth from '@/app/path/to/withAuth'
import axios from 'axios'
import { baseUrl } from '@/utils/constants'

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        submitedDeposits: '0.00',
        pendingDeposits: '0.00',
        rejectedDeposits: '0.00',
        totalDeposits: '0.00',
        submitedWithdrawal: '0.00',
        pendingWithdrawal: '0.00',
        rejectedWithdrawal: '0.00',
        totalWithdrawals: '0.00',
        completedInvestments: '0.00',
        runningInvestments: '0.00',
        interestsInvestments: '0.00',
        depositFromWallet: '0.00',
    })

    const [token, setToken] = useState<string | null>(null)
    const [profit, setProfit] = useState<any>()
    const [loading, setLoading] = useState(true) // Loading state

    const fetchDepositWalletData = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${baseUrl}/users/wallet`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        } catch (error) {
            console.error('Error fetching Deposit Wallet data:', error)
            throw error
        }
    }

    const fetchUserDailyProfits = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${baseUrl}/users/daily-profit`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        } catch (error) {
            console.error('Error fetching profit data:', error)
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

    const fetchUserTransactions = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${baseUrl}/transactions`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        } catch (error) {
            console.error('Error fetching User transactions data:', error)
            throw error
        }
    }

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

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true) // Start loading
            try {
                const transactions = await fetchUserTransactions()
                const walletData = await fetchDepositWalletData()
                const investmentData = await fetchInvestmentWalletData()
                const userPlansData = await fetchUserPlansData()
                const userProfits = await fetchUserDailyProfits()

                let totalInvestments = 0
                let runningInvestments = 0
                let completedInvestments = 0
                userPlansData.forEach((plan: any) => {
                    totalInvestments += plan.amountInvested * 1
                    if (plan.isActive === true) {
                        runningInvestments += plan.amountInvested * 1
                    }
                    if (plan.isActive === false) {
                        completedInvestments += plan.amountInvested * 1
                    }
                })

                const deposits = transactions.filter(
                    (item: { type: string }) => item.type === 'deposit',
                )
                const withdrawals = transactions.filter(
                    (item: { type: string }) => item.type === 'withdrawal',
                )

                let submittedDeposits = 0
                let pendingDeposits = 0
                let rejectedDeposits = 0
                let submittedWithdrawals = 0
                let pendingWithdrawals = 0
                let rejectedWithdrawals = 0

                deposits.forEach((item: any) => {
                    submittedDeposits += item.amount * 1
                    if (item.status === 'pending') {
                        pendingDeposits += item.amount * 1
                    }
                    if (item.status === 'failed') {
                        rejectedDeposits += item.amount * 1
                    }
                })

                withdrawals.forEach((item: any) => {
                    submittedWithdrawals += item.amount * 1
                    if (item.status === 'pending') {
                        pendingWithdrawals += item.amount * 1
                    }
                    if (item.status === 'failed') {
                        rejectedWithdrawals += item.amount * 1
                    }
                })

                // Set the fetched data to state
                setProfit(userProfits)
                setDashboardData({
                    submitedDeposits: `${submittedDeposits.toLocaleString()}`,
                    pendingDeposits: `${pendingDeposits.toLocaleString()}`,
                    rejectedDeposits: `${rejectedDeposits.toLocaleString()}`,
                    totalDeposits: walletData.totalDeposit.toLocaleString(),
                    submitedWithdrawal: `${submittedWithdrawals.toLocaleString()}`,
                    pendingWithdrawal: `${pendingWithdrawals.toLocaleString()}`,
                    rejectedWithdrawal: `${rejectedWithdrawals.toLocaleString()}`,
                    totalWithdrawals:
                        investmentData.totalWithdrawal.toLocaleString(),
                    completedInvestments: `${completedInvestments.toLocaleString()}`,
                    runningInvestments: `${runningInvestments.toLocaleString()}`,
                    interestsInvestments:
                        investmentData.totalEarned.toLocaleString(),
                    depositFromWallet: `${totalInvestments.toLocaleString()}`,
                })
                setLoading(false)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            }
        }

        const storedToken =
            sessionStorage.getItem('token') || localStorage.getItem('token')
        setToken(storedToken)

        if (storedToken) {
            fetchDashboardData()
        }
    }, [token])

    const cardData: CardProps[] = [
        {
            type: 'Successful Deposits',
            amount: `$ ${dashboardData.totalDeposits}.00`,
            status1: 'Submitted',
            status2: 'Pending',
            status3: 'Rejected',
            st1Amount: `${dashboardData.submitedDeposits}.00`,
            st2Amount: `${dashboardData.pendingDeposits}.00`,
            st3Amount: `${dashboardData.rejectedDeposits}.00`,
            icon: Activity,
            description: `You've requested to deposit $${dashboardData.submitedDeposits}. Where $${dashboardData.pendingDeposits} is just initiated but not confirmed.`,
        },
        {
            type: 'Successful Withdrawals',
            amount: `$ ${dashboardData.totalWithdrawals}.00`,
            status1: 'Submitted',
            status2: 'Pending',
            status3: 'Rejected',
            st1Amount: `${dashboardData.submitedWithdrawal}.00`,
            st2Amount: `${dashboardData.pendingWithdrawal}.00`,
            st3Amount: `${dashboardData.rejectedWithdrawal}.00`,
            icon: HandCoins,
            description: `You've requested to withdraw $${dashboardData.totalWithdrawals}. Where $${dashboardData.pendingWithdrawal} is just initiated but not confirmed.`,
        },
        {
            type: 'Total Investments',
            amount: `$ ${dashboardData.depositFromWallet}.00`,
            status1: 'Completed',
            status2: 'Running',
            status3: 'Interests',
            st1Amount: `${dashboardData.completedInvestments}.00`,
            st2Amount: `${dashboardData.runningInvestments}.00`,
            st3Amount: `${dashboardData.interestsInvestments}.00`,
            icon: ChartNoAxesCombined,
            description: `You've invested $${dashboardData.depositFromWallet} from your deposit wallet.`,
        },
    ]

    return (
        <div className="flex flex-col w-full gap-5">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3 gap-x-8 transition-all duration-600">
                        {cardData.map((d, i) => (
                            <Card
                                key={i}
                                type={d.type}
                                status1={d.status1}
                                status2={d.status2}
                                status3={d.status3}
                                st1Amount={d.st1Amount}
                                st2Amount={d.st2Amount}
                                st3Amount={d.st3Amount}
                                icon={d.icon}
                                amount={d.amount}
                                description={d.description}
                            />
                        ))}
                    </section>
                    <RoiChart data={profit} />
                </>
            )}
        </div>
    )
}

export default withAuth(UserDashboard)
