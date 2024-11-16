import React, { useState } from 'react';
import { Layout, Card, Row, Col, Statistic } from 'antd';
import { ShoppingCartOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [stats] = useState({
    totalPOs: 150,
    pendingApproval: 23,
    completedToday: 15,
  });

  return (
    <Content style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total POs"
              value={stats.totalPOs}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Approval"
              value={stats.pendingApproval}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Completed Today"
              value={stats.completedToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;