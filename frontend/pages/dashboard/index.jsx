import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Head from 'next/head';
// import List from './list';

const { Header, Sider, Content } = Layout;

const Dashboard = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard/list if the current route is '/'
    if (router.pathname === '/') {
      router.push('/dashboard/list');
    }
  }, [router]);

  const handleMenuClick = (e) => {
    router.push(e.key); // Redirect to the key (route) of the clicked menu item
  };

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
          style={{ height: '100vh' }}
        >
          <div className="demo-logo-vertical" />
          {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />, 
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />, 
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />, 
              label: 'nav 3',
            },
          ]}
        /> */}
          <Menu
            theme="dark"
            mode="inline"
            // selectedKeys={[router.pathname || "/"]}
            defaultSelectedKeys={['1']}
            onClick={handleMenuClick} // Handle click event
          >
            <Menu.Item key="/dashboard/list" icon={<VideoCameraOutlined />}>
              List
            </Menu.Item>
            <Menu.Item key="/dashboard/add" icon={<UserOutlined />}>
              Add
            </Menu.Item>
            <Menu.Item key="/dashboard/scan" icon={<UploadOutlined />}>
              Scan
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              height: '64px',
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
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {router.pathname === '/dashboard/list' && 
            // (
              // <div>List Content</div> // Replace this with the actual content for List
              children
            // )
            }
            {router.pathname === '/dashboard/add' && (
              <div>Add Content</div> // Replace this with the actual content for Add
            )}
            {router.pathname === '/dashboard/scan' && (
              <div>Scan Content</div> // Replace this with the actual content for Scan
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
