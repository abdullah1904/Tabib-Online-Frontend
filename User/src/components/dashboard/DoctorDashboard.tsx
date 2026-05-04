"use client";
import { getProfessionalStats } from "@/services/profile.service";
import { Card, CardBody, CardFooter, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, CalendarClock, Star } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const DoctorDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctor-stats"],
    queryFn: getProfessionalStats,
    staleTime: 5 * 60 * 1000,
  });
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  text-red-500">
        Error loading stats: {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[91vh]  gap-2 text-primary">
        <Spinner /> Loading stats...
      </div>
    )
  }
  const chartData = data?.monthlyStats.map(
    ({ month, year, totalAppointments, totalEarnings }) => ({
      label: new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      appointments: totalAppointments,
      earnings: totalEarnings,
    }),
  );
  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-2">
        <Card className="rounded-2xl bg-primary text-white">
          <CardBody>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white">
                <Calendar className="text-primary" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-white">Total Appointments</span>
                  <h4 className="mt-2 text-2xl font-bold text-white">{data?.totalAppointments}</h4>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="rounded-2xl bg-primary text-white">
          <CardBody>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white">
                <CalendarClock className="text-primary" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-white">
                    Pending Appointments
                  </span>
                  <h4 className="mt-2 text-2xl font-bold text-white">{data?.pendingAppointments}</h4>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="rounded-2xl bg-primary text-white">
          <CardBody>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white">
                <Star className="text-primary" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-white">Average Ratings</span>
                  <h4 className="mt-2 text-2xl font-bold text-white">{data?.averageRating}</h4>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 lg:grid">
        {/* Appointments Chart */}
        <Card className="rounded-2xl bg-primary text-white">
          <CardBody>
            <ResponsiveContainer
              width="100%"
              height={300}
              className="overflow-hidden"
            >
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke="var(--color-border-3)"
                />
                <XAxis dataKey="label" stroke="#ffffff" />
                <YAxis width="auto" stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    background: "var(--primary)",
                    borderWidth: "1px",
                    borderColor: "#ffffff",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#ffffff"
                  fill="#ffffff"
                  fillOpacity={0.3}
                  dot={{ fill: "var(--color-surface-base)" }}
                  activeDot={{ stroke: "var(--color-surface-base)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
          <CardFooter className="text-center flex justify-center">
            <p className="text-sm text-white italic">Appointments in last 6 months</p>
          </CardFooter>
        </Card>

        {/* Earnings Chart */}
        <Card className="rounded-2xl bg-primary text-white">
          <CardBody>
            <ResponsiveContainer
              width="100%"
              height={300}
              className="overflow-hidden"
            >
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke="var(--color-border-3)"
                />
                <XAxis dataKey="label" stroke="#ffffff" />
                <YAxis width="auto" stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    background: "var(--primary)",
                    borderWidth: "1px",
                    borderColor: "#ffffff",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  formatter={(val) => `${val} PKR`}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#ffffff"
                  fill="#ffffff"
                  fillOpacity={0.3}
                  dot={{ fill: "var(--color-surface-base)" }}
                  activeDot={{ stroke: "var(--color-surface-base)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
          <CardFooter className="text-center flex justify-center">
            <p className="text-sm text-white italic">Earnings in last 6 months</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
