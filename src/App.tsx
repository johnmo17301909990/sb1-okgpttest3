import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import POList from './pages/POList';
import CreatePO from './pages/CreatePO';
import './index.css';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: 0, background: '#fff', position: 'fixed', width: '100%', zIndex: 1 }}>
          <div style={{ padding: '0 24px', fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
            PO Automation System
          </div>
        </Header>
        <Layout style={{ marginTop: 64 }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="pos" icon={<FileTextOutlined />}>
                <Link to="/pos">Purchase Orders</Link>
              </Menu.Item>
              <Menu.Item key="create" icon={<PlusOutlined />}>
                <Link to="/create">Create PO</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pos" element={<POList />} />
                <Route path="/create" element={<CreatePO />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;