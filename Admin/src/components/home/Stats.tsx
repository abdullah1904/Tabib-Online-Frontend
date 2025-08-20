"use client";
import { BriefcaseMedical } from "lucide-react"
import AreaChart from "../charts/AreaChart"

const data = [
    { label: "January, 2025", value: 100 },
    { label: "February, 2025", value: 120 },
    { label: "March, 2025", value: 90 },
    { label: "April, 2025", value: 150 },
    { label: "May, 2025", value: 200 },
    { label: "June, 2025", value: 170 },
    { label: "July, 2025", value: 220 }
]


const Stats = () => {
    return (
        <div className="my-4">
            <AreaChart
                label="Appointments"
                data={data}
                icon={<BriefcaseMedical />}
            />
        </div>
    )
}

export default Stats