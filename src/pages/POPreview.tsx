import React from 'react';
import { Card, Descriptions, Table, Tag } from 'antd';
import { PurchaseOrder, POItem } from '../types/po';

interface POPreviewProps {
  data: PurchaseOrder;
}

const POPreview: React.FC<POPreviewProps> = ({ data }) => {
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '公司编号',
      dataIndex: 'companyCode',
      key: 'companyCode',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierCode',
      key: 'supplierCode',
    },
    {
      title: '烫金纸系列',
      dataIndex: 'foilSeries',
      key: 'foilSeries',
    },
  ];

  return (
    <Card title="采购订单预览" className="po-preview">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="PO编号">{data.poNumber}</Descriptions.Item>
        <Descriptions.Item label="供应商">{data.supplier}</Descriptions.Item>
        <Descriptions.Item label="订单日期">{data.orderDate}</Descriptions.Item>
        <Descriptions.Item label="交付日期">{data.deliveryDate}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={
            data.status === 'approved' ? 'green' :
            data.status === 'pending' ? 'gold' :
            data.status === 'rejected' ? 'red' : 'default'
          }>
            {data.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="总金额">¥{data.totalAmount.toFixed(2)}</Descriptions.Item>
      </Descriptions>

      <Card title="烫金工艺信息" style={{ marginTop: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="烫金面积">
            {data.foilArea === 'small' ? '小面积 (<50mm x 50mm)' :
             data.foilArea === 'medium' ? '中面积 (50-100mm x 50-100mm)' :
             '大面积 (≥100mm x 100mm)'}
          </Descriptions.Item>
          <Descriptions.Item label="图案类型">
            {data.foilPattern === 'fine' ? '幼细线条、文字' :
             data.foilPattern === 'halftone' ? '渐变、网点' :
             data.foilPattern === 'normal' ? '普通图案' :
             '立体、磨砂、有纹理效果'}
          </Descriptions.Item>
          <Descriptions.Item label="表面处理">{data.surfaceTreatment}</Descriptions.Item>
          <Descriptions.Item label="工艺顺序">{data.processOrder}</Descriptions.Item>
          <Descriptions.Item label="耐磨要求">{data.wearResistance}</Descriptions.Item>
          <Descriptions.Item label="松紧度要求">{data.tensionRequirement}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Table
        style={{ marginTop: 16 }}
        columns={columns}
        dataSource={data.items}
        pagination={false}
        rowKey="id"
      />
    </Card>
  );
};

export default POPreview;