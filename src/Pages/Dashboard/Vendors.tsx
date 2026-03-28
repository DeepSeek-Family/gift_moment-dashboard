import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  ConfigProvider,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllUserForDashboardQuery } from "@/redux/apiSlices/dashboardSlice";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { imageUrl } from "@/redux/api/baseApi";
import { useCreateUserAsAdminMutation } from "@/redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { useBannedUserMutation } from "@/redux/apiSlices/userSlice";

/* ================= TYPES ================= */

interface IUser {
  _id: string;
  name: string;
  email: string;
  profile: string;
  verified: boolean;
  isBanned: boolean;
  createdAt: string;
}

interface IMeta {
  page: number;
  limit: number;
  total: number;
}

interface IApiResponse {
  data: IUser[];
  pagination: IMeta;
}

interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
}

const Vendors = () => {
  const [form] = Form.useForm<ICreateUserPayload>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, isLoading, refetch } = useGetAllUserForDashboardQuery({
    page,
    limit,
    // search: debouncedSearch,
  }) as { data?: IApiResponse; isLoading: boolean; refetch: () => void };
  const [createUserAsAdmin, { isLoading: isCreating }] =
    useCreateUserAsAdminMutation();
  const [bannedUser, { isLoading: isBannedLoading }] = useBannedUserMutation();

  if (isLoading || isCreating) {
    return <LoadingSpinner />;
  }

  const handleBannedUser = async (id: string, nextBanned: boolean) => {
    try {
      const res = await bannedUser({ id, isBanned: nextBanned }).unwrap();
      if (res?.success) {
        toast.success(
          nextBanned ? "User has been banned!!!" : "User has been unbanned!!!",
        );
        refetch();
      } else {
        toast.error(
          res?.message ||
            (nextBanned
              ? "Could not ban this user!!!"
              : "Could not unban this user!!!"),
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          (nextBanned
            ? "Could not ban this user!!!"
            : "Could not unban this user!!!"),
      );
    }
  };
  const handleCreateUser = async (values: ICreateUserPayload) => {
    try {
      const res = await createUserAsAdmin(values).unwrap();

      if (res?.success) {
        toast.success("User created successfully");
        setIsModalOpen(false);
        form.resetFields();
        refetch();
      } else {
        toast.error(res?.message || "Failed to create user");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user");
    }
  };

  const columns = [
    {
      title: "SL",
      key: "serial",
      render: (_: any, __: any, index: number) =>
        (page - 1) * limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      dataIndex: "profile",
      key: "profile",
      render: (img: string) => (
        <img
          src={img ? `${imageUrl}${img}` : "/image.png"}
          alt="user"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (val: boolean) => (
        <span className={val ? "text-green-500" : "text-red-500"}>
          {val ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <Link to={`/staff/profile/${record._id}`}>
            <EyeOutlined className="cursor-pointer text-gray-700 text-lg" />
          </Link>
          {record.isBanned ? (
            <Tooltip title="Unban user">
              <UnlockOutlined
                className="cursor-pointer text-green-600 text-lg hover:text-green-700"
                onClick={() => handleBannedUser(record._id, false)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Ban user">
              <LockOutlined
                className="cursor-pointer text-red-600 text-lg hover:text-red-700"
                onClick={() => handleBannedUser(record._id, true)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-5">Total User List</h1>

        <div className="flex items-center gap-5">
          <Input
            placeholder="Search users..."
            style={{ width: 300, height: 45, borderRadius: 30 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
          />

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#F6339A] border-none text-white py-5 px-6 rounded-3xl"
          >
            <PlusOutlined /> Add User
          </Button>
        </div>
      </div>

      {/* Table Theme */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F6339A",
              headerColor: "#fff",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          loading={isLoading || isBannedLoading}
          scroll={{ x: 800 }}
          pagination={{
            total: data?.pagination?.total || 0,
            onChange: (p) => setPage(p),
            pageSize: data?.pagination?.limit || 10,
            current: page,
          }}
        />
      </ConfigProvider>

      {/* Modal */}
      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        confirmLoading={isCreating}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateUser}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vendors;
