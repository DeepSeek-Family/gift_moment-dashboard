import { useGetRecentSubscribersQuery } from "@/redux/apiSlices/dashboardSlice";
import { Table } from "antd";

const RecentSubscriber = () => {
  const { data, isLoading } = useGetRecentSubscribersQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$ ${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Start Date",
      dataIndex: "currentPeriodStart",
      key: "start",
      render: (date: string) =>
        new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "currentPeriodEnd",
      key: "end",
      render: (date: string) =>
        new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Recent Subscribers
      </h2>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        rowKey="_id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default RecentSubscriber;