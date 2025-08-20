import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Area, CartesianGrid, XAxis, AreaChart as RechartsAreaChart, } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'


type Props = {
    label: string,
    icon: React.ReactNode,
    data: {
        label: string
        value: number
    }[],
}

const AreaChart = ({ data, icon, label }: Props) => {
    const chartConfig = {
        label: {
            label: label,
        },
    } satisfies ChartConfig;
    return (
        <Card className="w-full">
            <CardHeader>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    {icon}
                    {label}
                </h2>
            </CardHeader>
            <CardContent>
                <div className="w-full h-80">
                    <ChartContainer config={chartConfig} className='w-full max-h-full'>
                        <RechartsAreaChart
                            data={data}
                            margin={{
                                left: 12,
                                right: 12
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="label"
                                tickFormatter={(value) => value.slice(0, 3)}
                                tick={{ fontSize: 12 }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                                dataKey="value"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                        </RechartsAreaChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default AreaChart;