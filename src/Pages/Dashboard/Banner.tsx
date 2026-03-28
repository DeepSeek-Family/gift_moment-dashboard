import { useState } from "react";
import { Button, Modal, Form, Upload, Select } from "antd";
import { PlusOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import {
  useAllBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerStatusMutation,
} from "@/redux/apiSlices/bannerSlice";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { imageUrl } from "@/redux/api/baseApi";

interface BannerData {
  key: string;
  bannerId: string;
  image: string;
  status: string;
}

/** API may return Mongo `_id` / `id`; older code assumed `bannerId`. */
interface BannerApiItem {
  _id?: string;
  id?: string;
  bannerId?: string;
  image?: string;
  status?: string;
}

function normalizeBanner(item: BannerApiItem, index: number): BannerData {
  const bannerId = item._id ?? item.id ?? item.bannerId ?? "";
  return {
    key: bannerId || `banner-${index}`,
    bannerId,
    image: item.image ?? "",
    status: item.status ?? "",
  };
}

const Banner = () => {
  const { data, isLoading, refetch } = useAllBannerQuery(undefined);
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] =
    useUpdateBannerStatusMutation();

  const [editing, setEditing] = useState<BannerData | null>(null);
  const [visible, setVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form] = Form.useForm();

  const openAdd = () => {
    setEditing(null);
    setImageFile(null);
    form.resetFields();
    setVisible(true);
  };

  const openEdit = (banner: BannerData) => {
    setEditing(banner);
    form.setFieldsValue({ status: banner.status });
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setEditing(null);
    setImageFile(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      if (editing) {
        const values = await form.validateFields();
        if (!editing.bannerId) {
          toast.error("Invalid banner id. Please refresh and try again.");
          return;
        }
        await updateBanner({
          id: editing.bannerId,
          status: values.status,
        }).unwrap();
        toast.success("Banner updated successfully");
      } else {
        if (!imageFile) {
          toast.error("Please upload an image");
          return;
        }
        const payload = new FormData();
        payload.append("image", imageFile);
        await createBanner(payload).unwrap();
        toast.success("Banner created successfully");
      }
      closeModal();
      refetch();
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "message" in err.data &&
        typeof (err.data as { message?: unknown }).message === "string"
          ? (err.data as { message: string }).message
          : "Failed to save banner";
      toast.error(message);
    }
  };

  const rawList: BannerApiItem[] = Array.isArray(data?.data) ? data.data : [];
  const banners: BannerData[] = rawList.map(normalizeBanner);

  if (isLoading) return <LoadingSpinner />;

  const previewSrc = imageFile
    ? URL.createObjectURL(imageFile)
    : editing
      ? imageUrl + editing.image
      : null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Banners</h1>
        <Button
          type="default"
          className="!bg-[#F6339A] !text-white !border-none hover:!bg-[#e02a8a]"
          icon={<PlusOutlined />}
          onClick={openAdd}
          disabled={isCreating || isUpdating}
        >
          Add Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div
              key={banner.key}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={imageUrl + banner.image}
                alt="banner"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => openEdit(banner)}
                    disabled={isCreating || isUpdating}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No banners found
          </div>
        )}
      </div>

      <Modal
        title={editing ? "Edit Banner" : "Add New Banner"}
        open={visible}
        onOk={handleOk}
        onCancel={closeModal}
        okButtonProps={{
          className:
            "!bg-[#F6339A] !border-none !text-white hover:!bg-[#e02a8a]",
          loading: isCreating || isUpdating,
        }}
        okText={editing ? "Update" : "Add"}
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-4">
          {!editing && (
            <Form.Item label="Banner Image" required>
              <Upload
                maxCount={1}
                beforeUpload={(file) => {
                  setImageFile(file);
                  return false;
                }}
                onRemove={() => setImageFile(null)}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          )}

          {previewSrc && (
            <img
              src={previewSrc}
              alt="preview"
              className="mb-4 max-w-xs rounded"
            />
          )}

          {editing && (
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Select status">
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Banner;
