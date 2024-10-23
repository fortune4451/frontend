'use client' // Indicates that this component is a client component in a Next.js application

import { useEffect, useState } from 'react' // Importing React hooks for state and effect management
import { CustomerInflow } from '@/components/customerInflow' // Importing CustomerInflow component
import { RevenueInflow } from '@/components/revenueInflow' // Importing RevenueInflow component
import Card, {
    CardContent,
    CardProps,
} from '@/components/ui/adminCardComponent' // Importing Card component and its props
import PageTitle from '@/components/ui/pageTitle' // Importing PageTitle component
import { Activity, User, ChartNoAxesCombined, HandCoins } from 'lucide-react' // Importing icons from Lucide
import Image from 'next/image' // Importing Image component from Next.js for optimized images
import axios from 'axios'
import { baseUrl } from '@/utils/constants'

// Defining the data structure for the dashboard data fetched from the API
interface DashboardData {
    totalTransactions: number // Total transactions recorded
    newUsers: number // New users added
    totalUsers: number
}

export default function Home() {
    // State to store real-time dashboard data
    const [dashboardData, setDashboardData] = useState<DashboardData | any>(
        null,
    )
    const [newUsers, setNewUsers] = useState<any>()
    const [revenueDate, setRevenueDate] = useState<any>()
    const [date, setDate] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [usersByMonth, setUsersByMonth] = useState<any>()
    const [revenueData, setRevenueData] = useState<any>()
    const [totalTransactions, setTotalTransactions] = useState(0)
    const [token, setToken] = useState<string | null>(null)

    const countRecentItems = (data: any[]) => {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const recentItems = data.filter(item => {
            const createdAt = new Date(item.createdAt)
            return createdAt >= sevenDaysAgo
        })

        setNewUsers(recentItems.length)
    }

    const formatMonthYear = (date: Date) => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    // Function to count users by month and return the result with start and end date
    const countUsersByMonth = (data: any[]) => {
        const userCountByMonth: { [key: string]: number } = {}

        // Sort the data by createdAt date to get the start and end dates
        const sortedData = data.sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
        )

        // Get the start and end date from the first and last items in the sorted array
        const startDate = new Date(sortedData[0].createdAt)
        const endDate = new Date(sortedData[sortedData.length - 1].createdAt)
        const dateRangeString = `${formatMonthYear(
            startDate,
        )} - ${formatMonthYear(endDate)}`

        // Count the number of users per month
        sortedData.forEach(item => {
            const createdAt = new Date(item.createdAt)
            const year = createdAt.getFullYear()
            const month = createdAt.getMonth() + 1 // Months are 0-indexed, so +1

            const yearMonthKey = `${year}-${month.toString().padStart(2, '0')}` // YYYY-MM format

            if (userCountByMonth[yearMonthKey]) {
                userCountByMonth[yearMonthKey]++
            } else {
                userCountByMonth[yearMonthKey] = 1
            }
        })

        // Convert the object to an array of { month, count } objects
        const result = Object.keys(userCountByMonth).map(month => ({
            month,
            count: userCountByMonth[month],
        }))

        return {
            dateRange: dateRangeString,
            data: result,
        }
    }

    const formatMonth = (date: Date) => {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    // Function to sum deposit transactions by month and return the date range string
    const sumDepositsByMonth = (transactions: any[]) => {
        const depositSumsByMonth: { [key: string]: number } = {}

        // Filter for "deposit" type transactions
        const depositTransactions = transactions.filter(
            transaction => transaction.type === 'deposit',
        )

        depositTransactions.forEach(transaction => {
            const createdAt = new Date(transaction.createdAt)
            const monthKey = `${formatMonth(createdAt)}`

            const amount = parseFloat(transaction.amount)

            if (depositSumsByMonth[monthKey]) {
                depositSumsByMonth[monthKey] += amount
            } else {
                depositSumsByMonth[monthKey] = amount
            }
        })

        // Convert the object to an array of { month, amount } objects
        const depositsArray = Object.keys(depositSumsByMonth).map(month => ({
            month,
            amount: depositSumsByMonth[month],
        }))

        // Sort the transactions by createdAt to find the first and last months
        const sortedTransactions = depositTransactions.sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
        )

        const firstMonth =
            sortedTransactions.length > 0
                ? formatMonth(new Date(sortedTransactions[0].createdAt))
                : null
        const lastMonth =
            sortedTransactions.length > 0
                ? formatMonth(
                      new Date(
                          sortedTransactions[
                              sortedTransactions.length - 1
                          ].createdAt,
                      ),
                  )
                : null

        // Create the date range string
        const dateRange =
            firstMonth && lastMonth ? `${firstMonth} - ${lastMonth}` : null

        return {
            depositsArray,
            dateRange,
        }
    }

    // Fetch data from the backend API when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This ensures the code runs only on the client-side
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }
        const fetchDashboardData = async () => {
            try {
                const data = await axios({
                    method: 'GET',
                    url: `${baseUrl}/users`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const transactions = await axios({
                    method: 'GET',
                    url: `${baseUrl}/transactions/all`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                let totalTrx = 0
                transactions.data.forEach((item: any) => {
                    totalTrx += item.amount * 1
                })

                setTotalTransactions(totalTrx)
                setDashboardData(data.data)
                countRecentItems(data.data)
                const { dateRange, data: monthlyUsers } = countUsersByMonth(
                    data.data,
                )
                setDate(dateRange)
                setUsersByMonth(monthlyUsers)
                const { dateRange: dates, depositsArray } = sumDepositsByMonth(
                    transactions.data,
                )
                setRevenueData(depositsArray)
                setRevenueDate(dates)
            } catch (error) {
            } finally {
                setLoading(false) // Set loading to false after fetching
            }
        }

        fetchDashboardData() // Invoke the fetch function
    }, [token]) // Empty dependency array ensures this runs only once on component mount

    // Static card data to map over for rendering UI cards
    const cardData: CardProps[] = [
        {
            label: 'Total Transactions',
            icon: HandCoins,
            amount: loading ? 'Loading...' : `$${totalTransactions}`, // Format the number with commas for thousands
            description: 'All time',
        },
        {
            label: 'Total Users',
            icon: ChartNoAxesCombined,
            amount: loading ? 'Loading...' : `${dashboardData?.length}`, // Display revenue with two decimal places
            description: 'All time',
        },
        {
            label: 'New Users',
            icon: User,
            amount: loading ? 'Loading...' : `+${newUsers}`, // Display new users with a "+" sign
            description: 'Last 7 days',
        },
    ]

    /* eslint-disable react/no-unescaped-entities */
    return (
        <div className="flex flex-col gap-5 w-full">
            {' '}
            {/* Container for the entire dashboard */}
            <PageTitle title="Dashboard" /> {/* Display the page title */}
            <section className="grid w-full grid-cols-1 gap-4 lg:gap-3 gap-x-8 transition-all duration-600 sm:grid-cols-2 lg:grid-cols-3">
                {cardData.map(
                    (
                        d,
                        i, // Map over the cardData array to render each card
                    ) => (
                        <Card
                            key={i} // Unique key for each card
                            label={d.label} // Card label
                            icon={d.icon} // Card icon
                            amount={d.amount} // Amount displayed on the card
                            description={d.description} // Description of the card
                        />
                    ),
                )}
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 transition-all">
                {/* Section for additional dashboard components */}
                <div>
                    <CustomerInflow testData={usersByMonth} date={date} />
                </div>
                <div>
                    <RevenueInflow data={revenueData} date={revenueDate} />
                </div>
            </section>
        </div>
    )
}
