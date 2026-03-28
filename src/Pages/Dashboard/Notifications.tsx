import Title from "../../components/common/Title";
import rentMeLogo from "../../assets/navLogo.png";
import { useNotificationQuery } from "@/redux/apiSlices/notificationSlice";

interface NotificationData {
  _id: string;
  message: string;
  createdAt: string;
}

const Notifications = () => {
  const { data: notifications, isLoading } = useNotificationQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const notificationData: NotificationData[] = Array.isArray(
    notifications?.data,
  )
    ? notifications.data
    : [];

  return (
    <div className="p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-[22px]">All Notifications</Title>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-white p-4 rounded-lg">
        {notificationData.map((notification: NotificationData) => (
          <div
            key={notification._id}
            className="border-b-[1px] pb-2 border-[#d9d9d9]"
          >
            <div className="flex items-start justify-between gap-3">  
              <p className="text-base text-[#222]">{notification.message}</p>
              <p className="text-[10px] text-gray-500 whitespace-nowrap">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
