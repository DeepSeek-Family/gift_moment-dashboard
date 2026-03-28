import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import OverViewChart from "@/components/ui/Home/OverViewChart";
import RevenueChart from "@/components/ui/Home/RevenueChart";
import RecentSubscriber from "@/components/ui/Home/RecentSubscriber";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useGetDashboardAnalyticQuery } from "@/redux/apiSlices/dashboardSlice";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <Card>
    <Statistic
      title={title}
      value={value}
      prefix={icon}
      valueStyle={{ color }}
    />
  </Card>
);

const Home: React.FC = () => {
  const { data, isLoading } = useGetDashboardAnalyticQuery([]);
  if (isLoading) {
    <LoadingSpinner />;
  }
  console.log("Dashboard Analytic Data:", data);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      <Row gutter={[12, 12]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Total Users"
            value={data?.data?.totalUsers || 0}
            icon={<UserOutlined />}
            color="#191919"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Revenue"
            value={data?.data?.totalAmount || 0}
            icon={<DollarCircleOutlined />}
            color="#191919"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatCard
            title="Total Gifts"
            value={data?.data?.totalGift || 0}
            icon={<CalendarOutlined />}
            color="#191919"
          />
        </Col>
      </Row>
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">User Progress</h2>
          <OverViewChart />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <RecentSubscriber />
      </div>
    </div>
  );
};

export default Home;
