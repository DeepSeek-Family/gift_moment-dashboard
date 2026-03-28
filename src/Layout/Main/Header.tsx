import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { imageUrl } from "@/redux/api/baseApi";
import { useNotificationQuery } from "@/redux/apiSlices/notificationSlice";

interface UserData {
  name?: string;
  role?: string;
  profile?: string;
}

interface AdminProfileResponse {
  data?: UserData;
}

const Header = () => {
  const { data: userData, isLoading } = useFetchAdminProfileQuery() as {
    data?: AdminProfileResponse;
    isLoading: boolean;
  };
  const { data: notifications, isLoading: notificationLoading } = useNotificationQuery(undefined);
  

  if (isLoading || notificationLoading) {
    return <LoadingSpinner />;
  }
  const notificationUnreadLength = Array.isArray(notifications?.data)    ? notifications.data.filter((notification: any) => !notification.read).length
    : 0;  

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge count={notificationUnreadLength} size="small">
          <FaRegBell color="#4E4E4E" size={24} />
        </Badge>
      </Link>

      <div className="flex gap-2 items-center justify-center border-4 p-1 rounded-full">
        <img
          style={{
            clipPath: "circle()",
            width: 45,
            height: 45,
          }}
          src={
            userData?.data?.profile
              ? `${imageUrl}${userData?.data?.profile}`
              : logo
          }
          alt="person-male--v2"
          className="clip"
        />
        <div className="flex pr-2 flex-col">
          <p className="text-xl">{userData?.data?.name || "Unknown Admin"}</p>
          <p className="text-sm text-gray-500">{userData?.data?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
