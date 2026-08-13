import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import {
  getRuleContent,
  useGetRulesAboutQuery,
  useUpdateRulesAboutMutation,
} from "@/redux/apiSlices/rule";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { Button } from "antd";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isLoading, refetch } = useGetRulesAboutQuery();
  const [updateRulesAbout, { isLoading: isUpdating }] =
    useUpdateRulesAboutMutation();

  const initialContent = getRuleContent(data?.data);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = async () => {
    try {
      const res = await updateRulesAbout({ content }).unwrap();
      if (res.success) {
        toast.success(res.message || "About Us updated successfully");
        setContent(getRuleContent(res.data));
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Update failed. Please try again.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold">About Us</h1>

      {!initialContent && (
        <p className="mt-2 mb-4 text-gray-500">
          No about content created yet. Add content and submit to create it.
        </p>
      )}

      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <Button
          type="primary"
          loading={isUpdating}
          onClick={handleSubmit}
          style={{
            width: 178,
            height: 45,
            fontWeight: 400,
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
