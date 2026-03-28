import { Result, Card, Typography, Space } from "antd";
import { useEffect } from "react";
import { FaTimesCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const CheckoutCancel = () => {
  const navigate = useNavigate();
  // need to navigate after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
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
        {/* Cancel Result */}
        <Result
          icon={
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <FaTimesCircle style={{ fontSize: 48, color: "#ef4444" }} />
            </div>
          }
          title={
            <Title level={2} style={{ marginTop: 16, marginBottom: 8 }}>
              Payment Cancelled
            </Title>
          }
          subTitle={
            <Text type="secondary" style={{ fontSize: 16 }}>
              Your payment was cancelled. Don't worry, no charges were made to
              your account.
            </Text>
          }
        />

        {/* Info Box */}
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <Space>
            <FaShoppingCart style={{ color: "#d97706" }} />
            <Text strong style={{ color: "#d97706" }}>
              Your cart items are still saved
            </Text>
          </Space>
          <div style={{ marginTop: 8 }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              You can complete your purchase anytime.
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutCancel;
