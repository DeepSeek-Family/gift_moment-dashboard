import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import {
  useGetRulesAboutQuery,
  useUpdateRulesAboutMutation,
} from "@/redux/apiSlices/rule";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { Button } from "antd";

interface PrivacyPolicyData {
  content?: string;
}

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab] = useState("about");

  const { data, isLoading } = useGetRulesAboutQuery(undefined);
  const [updateRulesAbout, { isLoading: isUpdating }] =
    useUpdateRulesAboutMutation();

  if (isLoading || isUpdating) {
    return <LoadingSpinner />;
  }

  const privacyPolicy: PrivacyPolicyData[] = [];
  const privacyPolicyData = privacyPolicy?.[0]?.content || "";

  const termsDataSave = async () => {
    const data = {
      content: content,
      userType: selectedTab,
    };

    try {
      await updateRulesAbout(data);
      toast.success("About Us updated successfully");
      setContent(data.content);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold">About Us</h1>

      <JoditEditor
        ref={editor}
        value={data?.data?.content || privacyPolicyData}
        onChange={(newContent) => {
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

export default AboutUs;
