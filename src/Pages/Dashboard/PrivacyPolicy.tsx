import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import {
  useGetRulesPrivacyQuery,
  useUpdateRulesPrivacyMutation,
} from "@/redux/apiSlices/rule";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { Button } from "antd";

const PrivacyPolicy = () => {
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>("");

  const {
    data: privacyPolicy,
    isLoading,
    refetch,
  } = useGetRulesPrivacyQuery(undefined);
  const [updatePrivacyPolicy, { isLoading: isUpdating }] =
    useUpdateRulesPrivacyMutation();

  if (isLoading || isUpdating) {
    return <LoadingSpinner />;
  }

  const privacyPolicyData = privacyPolicy?.data?.content || "";
  const termsDataSave = async () => {
    try {
      const res = await updatePrivacyPolicy({
        content: content || privacyPolicyData,
      }).unwrap();
      if (res.success) {
        toast.success("Privacy Policy updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };
  console.log(termsDataSave, "termsDataSave");

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>

      <JoditEditor
        ref={editor}
        value={privacyPolicy?.data?.content || content}
        onChange={(newContent: string) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <Button
          htmlType="submit"
          type="primary"
          style={{
            width: 178,
            height: 45,
            fontWeight: "400px",
            background: "#6DBD44",
            color: "black",
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
