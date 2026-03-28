import { useGetDashboardUserMonthlyProgressQuery } from "@/redux/apiSlices/dashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OverViewChart() {
  const { data, isLoading } =
    useGetDashboardUserMonthlyProgressQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data?.data || []}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#191919",
              border: "none",
              color: "#fff",
            }}
          />
          <Bar dataKey="count" fill="#F6339A" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
