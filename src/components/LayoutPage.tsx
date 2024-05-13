import React, { ReactNode } from "react";
import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;

  const headerTitleStyle: React.CSSProperties = {
    color: "white",
    paddingTop: "10px",
  };

  const contentContainerStyle: React.CSSProperties = {
    padding: "20px",
  };

  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Header>
        <Title level={3} style={headerTitleStyle}>
          Events
        </Title>
      </Header>
      <Content style={contentContainerStyle}>
        <Outlet />
      </Content>
      <Footer style={{ zIndex: "5" }}>
        Developed by{" "}
        <a href="mailto:osypenkoviktorgit@gmail.com">
          osypenkoviktorgit@gmail.com
        </a>
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
