import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";

import toast from "react-hot-toast";
import {
  useGetRulesTermsQuery,
  useUpdateRulesTermsMutation,
} from "@/redux/apiSlices/rule";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { Button } from "antd";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [updateTermsAndConditions] = useUpdateRulesTermsMutation();
  const { data, isLoading, refetch } = useGetRulesTermsQuery(undefined);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const termsDataSave = async () => {
    try {
      const payload = {
        content: content || data?.data?.content || "",
      };
      const res = await updateTermsAndConditions(payload).unwrap();
      if (res.success) {
        toast.success("Terms and Conditions updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  console.log(termsDataSave, "termsDataSave");

  return (
    <div className="p-6 bg-white">
      <Title className="mb-4">Terms and Conditions</Title>

      <JoditEditor
        ref={editor}
        value={data?.data?.content || content}
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

export default TermsAndCondition;
