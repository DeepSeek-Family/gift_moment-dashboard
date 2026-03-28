import { useNavigate, useSearchParams } from "react-router-dom";
import { Result, Card, Typography, Space } from "antd";
import { FaCheckCircle, FaBox } from "react-icons/fa";
import { useEffect } from "react";

const { Text, Title } = Typography;

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  // need to navigate after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Card
        style={{
          maxWidth: 480,
          width: "100%",
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
        bodyStyle={{ padding: "40px 32px" }}
      >
        {/* Success Result */}
        <Result
          icon={
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#dcfce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <FaCheckCircle style={{ fontSize: 48, color: "#22c55e" }} />
            </div>
          }
          title={
            <Title level={2} style={{ marginTop: 16, marginBottom: 8 }}>
              Payment Successful!
            </Title>
          }
          subTitle={
            <Text type="secondary" style={{ fontSize: 16 }}>
              Thank you for your purchase. Your order has been confirmed and is
              being processed.
            </Text>
          }
        />

        {/* Order Info Box */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <Space>
            <FaBox style={{ color: "#16a34a" }} />
            <Text strong style={{ color: "#16a34a" }}>
              Order Confirmed
            </Text>
          </Space>
          {sessionId && (
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Session ID: {sessionId.slice(0, 25)}...
              </Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
