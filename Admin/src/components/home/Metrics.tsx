import { Hospital, Stethoscope, User } from "lucide-react"
import RadicalChart from "../charts/RadialChart"

const data = {
  'doctors': [
    { count: 525, fill: "var(--color-safari)" },
  ],
  'hospitals': [
    { count: 425, fill: "var(--color-emerald)" },
  ],
  'users': [
    { count: 100, fill: "var(--color-violet)" },
  ]
}

const Metrics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <RadicalChart
        label="Users"
        icon={<User />}
        data={data.users}
      />
      <RadicalChart
        label="Doctors"
        icon={<Stethoscope />}
        data={data.doctors}
      />
      <RadicalChart
        label="Hospitals"
        icon={<Hospital />}
        data={data.hospitals}
      />
    </div>
  )
}

export default Metrics