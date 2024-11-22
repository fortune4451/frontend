'use client'

import React from 'react'
import {
    Pie,
    PieChart,
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { format, subDays } from 'date-fns'

const chartConfig = {
    Profit: {
        label: 'Profit',
        color: '#2563eb',
    },
} satisfies ChartConfig

interface RoiChartProps {
    data: Array<{ date: string; profit: number }>
}

const preprocessData = (rawData: { date: string; profit: number }[]) => {
    // Generate the last 30 days' dates
    const last30Days = Array.from({ length: 30 }, (_, i) =>
        format(subDays(new Date(), i), 'yyyy-MM-dd'),
    ).reverse()

    // Aggregate profits by date
    const profitMap: Record<string, number> = {}
    rawData.forEach(({ date, profit }) => {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd')
        profitMap[formattedDate] = (profitMap[formattedDate] || 0) + profit * 1
    })

    // Ensure every date has an entry, set profit to 0 if missing
    const processedData = last30Days.map(date => ({
        date,
        Profit: profitMap[date] || 0,
    }))

    return processedData
}

// const RoiChart = ({ data = [] }: RoiChartProps) => {
//     const processedData = preprocessData(data)
//     console.log('Processed data', processedData)
//     const chartWidth =
//         processedData.length > 20 ? processedData.length * 50 : '100%'

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Latest ROI Statistics</CardTitle>
//                 <CardDescription>
//                     Here is last 30 days statistics of your ROI (Return on
//                     Investment)
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <div className="w-full overflow-x-auto">
//                     <div
//                         className="min-h-[200px] h-[300px]"
//                         style={{ width: chartWidth }}
//                     >
//                         <ChartContainer
//                             config={chartConfig}
//                             className="min-h-[200px] w-full h-[300px]"
//                         >
//                             <BarChart
//                                 data={data}
//                                 margin={{ left: 12, right: 12 }}
//                             >
//                                 <CartesianGrid vertical={false} />
//                                 <XAxis
//                                     dataKey="date"
//                                     tickLine={false}
//                                     tickMargin={10}
//                                     axisLine={false}
//                                     tickFormatter={value => {
//                                         const date = new Date(value)
//                                         return date.toLocaleDateString(
//                                             'en-US',
//                                             {
//                                                 month: 'short',
//                                                 day: 'numeric',
//                                             },
//                                         )
//                                     }}
//                                 />
//                                 <ChartTooltip
//                                     content={<ChartTooltipContent />}
//                                 />
//                                 <ChartLegend content={<ChartLegendContent />} />
//                                 <Bar
//                                     dataKey="Profit"
//                                     fill="var(--color-Amount)"
//                                     radius={4}
//                                 />
//                             </BarChart>
//                         </ChartContainer>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

const RoiChart = ({ data = [] }: RoiChartProps) => {
    const processedData = preprocessData(data)
    const chartWidth =
        processedData.length > 20 ? processedData.length * 50 : '100%'

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest ROI Statistics</CardTitle>
                <CardDescription>
                    Here is the last 30 days statistics of your ROI (Return on
                    Investment)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div
                        className="min-h-[200px] h-[300px]"
                        style={{ width: chartWidth }}
                    >
                        <ChartContainer
                            config={chartConfig}
                            className="min-h-[200px] w-full h-[300px]"
                        >
                            <BarChart
                                data={processedData}
                                margin={{ left: 12, right: 12 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={value => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'short',
                                                day: 'numeric',
                                            },
                                        )
                                    }}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar
                                    dataKey="Profit"
                                    fill="orange"
                                    radius={4}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default RoiChart
