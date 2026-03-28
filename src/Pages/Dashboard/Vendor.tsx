import { Card, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useUserByIdQuery } from "@/redux/apiSlices/userSlice";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { imageUrl } from "@/redux/api/baseApi";
type ProfileRecord = Record<string, unknown>;

function unwrapProfile(data: unknown): ProfileRecord | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const inner = o.data;
  if (inner && typeof inner === "object" && !Array.isArray(inner)) {
    const layer = inner as Record<string, unknown>;
    if (layer.user && typeof layer.user === "object") {
      return layer.user as ProfileRecord;
    }
    return layer as ProfileRecord;
  }
  if (o.user && typeof o.user === "object") {
    return o.user as ProfileRecord;
  }
  return o as ProfileRecord;
}

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  if (key.toLowerCase().includes("at") && typeof value === "string") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  }
  return String(value);
}

const HIDDEN_KEYS = new Set([
  "profile",
  "photo",
  "image",
  "password",
  "__v",
  "updatedAt",
]);

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useUserByIdQuery(id!, {
    skip: !id,
  });
  if (!id) {
    return (
      <div className="p-6 min-h-screen">
        <p className="text-red-500">Invalid user!!!</p>
        <Link to="/staff-list" className="text-blue-500">Back to list</Link>
        <Card>
          <p className="text-red-600">
            Could not load this user!!! They may have been removed or you may not
            have access.
          </p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const user = unwrapProfile(data);

  if (isError || !user) {
    return (
      <div className="p-6 min-h-screen">
        <Link
          to="/staff-list"
          className="inline-flex items-center gap-1 text-base mb-4"
        >
          <BiLeftArrowAlt size={22} />
          <span className="text-blue-500">Back to user list</span>
        </Link>
        <Card>
          <p className="text-red-600">
            Could not load this user!!! They may have been removed or you may not
            have access.
          </p>
        </Card>
      </div>
    );
  }

  const profilePath =
    (user.profile as string | undefined) ||
    (user.photo as string | undefined) ||
    "";
  const avatarSrc = profilePath ? `${imageUrl}${profilePath}` : "/image.png";

  const name = (user.name as string) || (user.fullName as string) || "User";
  const displayRows = Object.entries(user).filter(([key]) => {
    if (HIDDEN_KEYS.has(key)) return false;
    const val = user[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Link
        to="/staff-list"
        className="inline-flex items-center gap-1 text-base mb-4"
      >
        <BiLeftArrowAlt size={22} />
        Back to user list
      </Link>

      <div className="flex flex-col lg:flex-row w-full gap-4">
        <Card className="p-4 flex-1 shadow-md">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col items-center gap-6 shrink-0">
              <img
                src={avatarSrc}
                alt={name}
                className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/image.png";
                }}
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold">{name}</h2>
                {(user.email as string) && (
                  <p className="text-blue-500 text-lg mt-1">
                    {String(user.email)}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-3 mt-2 flex-1 min-w-0">
              {displayRows.map(([key, value]) => (
                <p key={key} className="break-words">
                  <span className="font-semibold capitalize text-gray-600">
                    {key.replace(/_/g, " ")}:
                  </span>{" "}
                  {formatValue(key, value)}
                </p>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4 w-full lg:w-80 shrink-0 shadow-md">
          <h1 className="text-xl font-semibold mb-4">Account status</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-gray-600">Verified</span>
              <Tag color={user.verified === true ? "green" : "red"}>
                {user.verified === true ? "Yes" : "No"}
              </Tag>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-gray-600">Banned</span>
              <Tag color={user.isBanned === true ? "red" : "green"}>
                {user.isBanned === true ? "Yes" : "No"}
              </Tag>
            </div>
            {user.role != null && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">Role</span>
                <Tag>{String(user.role)}</Tag>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetails;
