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

const chartConfig = {
    Profit: {
        label: 'Profit',
        color: '#2563eb',
    },
} satisfies ChartConfig

interface RoiChartProps {
    data: Array<{ date: string; profit: number }>
}

const RoiChart = ({ data = [] }: RoiChartProps) => {
    const chartWidth = data.length > 20 ? data.length * 50 : '100%'
    console.log('This is the data', { data })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest ROI Statistics</CardTitle>
                <CardDescription>
                    Here is last 30 days statistics of your ROI (Return on
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
                                data={data}
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
                                    fill="var(--color-Amount)"
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
