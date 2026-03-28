import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Tabs,
  InputNumber,
  Switch,
  Upload,
} from "antd";
import {
  PlusOutlined,
  GiftOutlined,
  CalendarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useCreateOccasionsAndGiftMutation,
  useGetAllOccasionsAndGiftQuery,
  useCreateGiftMutation,
  useGetAllGiftQuery,
} from "@/redux/apiSlices/occasionsAndGiftSlice";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { imageUrl } from "@/redux/api/baseApi";

const { Option } = Select;

interface OccasionData {
  key: string;
  name: string;
  image?: string;
}

interface GiftData {
  key: string;
  file: string;
  occasionId: string;
  occasionName: string;
  isFree: boolean;
  price: number;
  type: "image" | "video";
  isActive: "active" | "inactive";
}

interface OccasionFormValues {
  name: string;
  image?: { originFileObj?: File }[];
}
type GiftFormValues = Omit<GiftData, "key" | "occasionName" | "file"> & {
  file?: { originFileObj?: File }[];
};

// ─── Status badge helper ──────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`px-2 py-1 text-xs rounded-full font-medium ${
      status === "Active"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-600"
    }`}
  >
    {status}
  </span>
);

// ─── OccasionTab ─────────────────────────────────────────────────────────────

const OccasionTab: React.FC<{
  occasions: OccasionData[];
  createOccasionsAndGift: (data: FormData) => Promise<any>;
  refetchOccasions: () => void;
  isCreating: boolean;
}> = ({ occasions, createOccasionsAndGift, refetchOccasions, isCreating }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm<OccasionFormValues>();

  const openAdd = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = new FormData();
      payload.append("name", values.name);

      const imageFile = values.image?.[0]?.originFileObj;
      if (imageFile) {
        payload.append("image", imageFile);
      }

      await createOccasionsAndGift(payload);
      toast.success("Occasion created successfully");
      refetchOccasions();

      setVisible(false);
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create occasion");
    }
  };

  const columns: ColumnsType<OccasionData> = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <img
            src={imageUrl + image}
            alt="occasion"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          ""
        ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">
          {occasions.length} occasions found
        </p>
        <Button
          type="default"
          className="bg-[#F6339A] text-white "
          icon={<PlusOutlined />}
          onClick={openAdd}
        >
          Add Occasion
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={occasions}
        rowKey="key"
        pagination={{ pageSize: 8 }}
        size="middle"
      />

      <Modal
        title={
          <span className="flex items-center gap-2">
            <CalendarOutlined className="text-blue-500" />
            Add New Occasion
          </span>
        }
        open={visible}
        onOk={handleOk}
        confirmLoading={isCreating}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        okText="Add"
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Occasion Name"
            rules={[{ required: true, message: "Please enter occasion name" }]}
          >
            <Input placeholder="e.g. Birthday, Anniversary" />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item
            name="image"
            label="Occasion Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // prevent auto upload, handle manually if needed
            >
              <Button
                className="bg-[#F6339A] text-white hover:bg-[#F6339A] hover:*:text-white"
                icon={<UploadOutlined />}
              >
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// ─── GiftTab ──────────────────────────────────────────────────────────────────

const GiftTab: React.FC<{
  gifts: GiftData[];
  occasions: OccasionData[];
  createGift: (data: FormData) => Promise<any>;
  refetchGifts: () => void;
  isCreatingGift: boolean;
}> = ({ gifts, occasions, createGift, refetchGifts, isCreatingGift }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm<GiftFormValues>();

  const openAdd = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const fileObj = values.file?.[0]?.originFileObj;
      if (!fileObj) {
        toast.error("Please upload gift file");
        return;
      }

      const payload = new FormData();
      payload.append("file", fileObj);
      payload.append("isFree", String(values.isFree));
      payload.append("price", String(values.price || 0));
      payload.append("type", values.type);
      payload.append("isActive", values.isActive);
      payload.append("occasionId", values.occasionId);

      await createGift(payload);
      toast.success("Gift created successfully");
      refetchGifts();

      setVisible(false);
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create gift");
    }
  };

  const columns: ColumnsType<GiftData> = [
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file: string, record: GiftData) =>
        record.type === "image" ? (
          <img
            src={`${imageUrl}${file}`}
            alt="gift"
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          <a href={`${imageUrl}${file}`} target="_blank" rel="noreferrer">
            View Video
          </a>
        ),
    },
    {
      title: "Occasion",
      dataIndex: "occasionName",
      key: "occasionName",
      render: (name: string) => <Tag color="volcano">{name}</Tag>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      title: "Free",
      dataIndex: "isFree",
      key: "isFree",
      render: (free: boolean) => (free ? "Yes" : "No"),
      width: 90,
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      render: (p: number) => `$${p.toFixed(2)}`,
      width: 110,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (s) => (
        <StatusBadge status={s === "active" ? "Active" : "Inactive"} />
      ),
      width: 100,
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{gifts.length} gifts found</p>
        <Button type="default" icon={<PlusOutlined />} onClick={openAdd}>
          Add Gift
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={gifts}
        rowKey="key"
        pagination={{ pageSize: 8 }}
        size="middle"
      />

      <Modal
        title={
          <span className="flex items-center gap-2">
            <GiftOutlined className="text-rose-500" />
            Add New Gift
          </span>
        }
        open={visible}
        onOk={handleOk}
        confirmLoading={isCreatingGift}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        okText="Add"
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="file"
            label="Gift File"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please upload file" }]}
          >
            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="occasionId"
            label="Occasion"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an occasion">
              {occasions.map((o) => (
                <Option key={o.key} value={o.key}>
                  {o.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item
              name="isFree"
              label="Is Free"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price ($)"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                precision={2}
                style={{ width: "100%" }}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select>
                <Option value="image">Image</Option>
                <Option value="video">Video</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="isActive"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// ─── Root component ───────────────────────────────────────────────────────────

const OccasionManagement: React.FC = () => {
  const [createOccasionsAndGift, { isLoading: isCreating }] =
    useCreateOccasionsAndGiftMutation();
  const { data, isLoading, refetch } =
    useGetAllOccasionsAndGiftQuery(undefined);
  const [createGift, { isLoading: isCreatingGift }] = useCreateGiftMutation();
  const {
    data: giftData,
    isLoading: isGiftLoading,
    refetch: refetchGifts,
  } = useGetAllGiftQuery(undefined);

  if (isLoading || isCreating || isGiftLoading || isCreatingGift) {
    return <LoadingSpinner />;
  }
  console.log("giftData:", giftData);
  const occasionsData: OccasionData[] = (data?.data || []).map((item: any) => ({
    key: item._id,
    name: item.name,
    image: item.image,
  }));

  const giftsData: GiftData[] = (giftData?.data || []).map((item: any) => {
    const occasion = occasionsData.find((o) => o.key === item.occasionId);
    return {
      key: item._id,
      file: item.file,
      occasionId: item.occasionId,
      occasionName: occasion?.name || "N/A",
      isFree: item.isFree,
      price: item.price,
      type: item.type,
      isActive: item.isActive,
    };
  });

  const tabItems = [
    {
      key: "occasions",
      label: (
        <span className="flex items-center gap-1.5">
          <CalendarOutlined />
          Occasions
        </span>
      ),
      children: (
        <OccasionTab
          occasions={occasionsData}
          createOccasionsAndGift={(payload: FormData) =>
            createOccasionsAndGift(payload).unwrap()
          }
          refetchOccasions={refetch}
          isCreating={isCreating}
        />
      ),
    },
    {
      key: "gifts",
      label: (
        <span className="flex items-center gap-1.5">
          <GiftOutlined />
          Gifts
        </span>
      ),
      children: (
        <GiftTab
          gifts={giftsData}
          occasions={occasionsData}
          createGift={(payload: FormData) => createGift(payload).unwrap()}
          refetchGifts={refetchGifts}
          isCreatingGift={isCreatingGift}
        />
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Occasion & Gift Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage occasions and assign gifts to each occasion
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <Tabs defaultActiveKey="occasions" items={tabItems} size="middle" />
      </div>
    </div>
  );
};

export default OccasionManagement;
