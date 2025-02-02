import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  PlusOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Head from 'next/head';
import { useCurrentUser } from '@/lib/user';

const { Header, Sider, Content } = Layout;

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/dashboard/list');
    }
  }, [router]);

  const handleMenuClick = (e) => {
    router.push(e.key);
  };

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout style={{ height: '100vh', width: '100vw' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ height: '100vh', position: 'fixed'}}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={handleMenuClick}
          >
            <Menu.Item key="/dashboard/list" icon={<AppstoreOutlined />}>
              List
            </Menu.Item>
            <Menu.Item key="/dashboard/add" icon={<PlusOutlined />}>
              Add
            </Menu.Item>
            <Menu.Item key="/dashboard/scan" icon={<UploadOutlined />}>
              Scan
            </Menu.Item>
            <Menu.Item key="/dashboard/webcamcapture" icon={<UploadOutlined />}>
              Webcam
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? '100px' : '200px' }}>
          {/* <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              height: '64px', // Ensure this is consistent with the layout
              zIndex: 1, // Added to make sure the header stays above the content
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header> */}
          <Content
            style={{            
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto', // Handle overflow
            }}
          >
            {router.pathname === '/dashboard/list' && user && children}
            {router.pathname === '/dashboard/add' && user && children}
            {router.pathname === '/dashboard/scan' && user && children}
            {router.pathname === '/dashboard/webcamcapture' && user && children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
