
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllSubscriberListQuery } from "@/redux/apiSlices/subscription";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

interface TransactionData {
  key: string;
  transactionId: string;
  userName: string;
  amount: number;
  status: string;
  packageTitle: string;
  paymentType: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig: Record<string, { color: string; bg: string }> = {
    Completed: {
      color: "emerald-700",
      bg: "bg-emerald-100 text-emerald-700",
    },
    Active: { color: "emerald-700", bg: "bg-emerald-100 text-emerald-700" },
    Pending: { color: "amber-700", bg: "bg-amber-100 text-amber-700" },
    Failed: { color: "red-600", bg: "bg-red-100 text-red-600" },
  };

  const config = statusConfig[status] || statusConfig.Pending;
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${config.bg}`}>
      {status}
    </span>
  );
};

const Transactions = () => {
  const { data, isLoading } = useGetAllSubscriberListQuery(undefined);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Transform API data to TransactionData format
  const transactionsData: TransactionData[] = (data?.data?.data || []).map(
    (subscription: any, index: number) => ({
      key: index + 1,
      transactionId: subscription.trxId,
      userName: subscription.user.name,
      amount: subscription.price,
      status:
        subscription.status.charAt(0).toUpperCase() +
        subscription.status.slice(1),
      packageTitle: subscription.package.title,
      paymentType: subscription.package.paymentType,
      currentPeriodStart: new Date(
        subscription.currentPeriodStart,
      ).toLocaleDateString(),
      currentPeriodEnd: new Date(
        subscription.currentPeriodEnd,
      ).toLocaleDateString(),
    }),
  );

  const columns: ColumnsType<TransactionData> = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 120,
      render: (id: string) => (
        <span className="font-semibold text-gray-800">{id}</span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      render: (amount: number) => (
        <span className="font-semibold text-gray-800">
          ${amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Package",
      dataIndex: "packageTitle",
      key: "packageTitle",
      width: 140,
      render: (title: string) => <Tag color="blue">{title}</Tag>,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => <StatusBadge status={status} />,
    },
    {
      title: "Period Start",
      dataIndex: "currentPeriodStart",
      key: "currentPeriodStart",
      width: 130,
    },
    {
      title: "Period End",
      dataIndex: "currentPeriodEnd",
      key: "currentPeriodEnd",
      width: 130,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
      </div>

      <Table
        columns={columns}
        dataSource={transactionsData}
        rowKey="key"
        scroll={{ x: 1400 }}
      />
    </div>
  );
};

export default Transactions;
