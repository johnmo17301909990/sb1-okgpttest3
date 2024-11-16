import React, { useState } from 'react';
import { Card, message } from 'antd';
import POForm from '../components/POForm';
import POPreview from './POPreview';
import type { PurchaseOrder } from '../types/po';

const CreatePO: React.FC = () => {
  const [previewData, setPreviewData] = useState<PurchaseOrder | null>(null);

  const handleSubmit = (values: PurchaseOrder) => {
    console.log('Form values:', values);
    setPreviewData(values);
    message.success('采购订单创建成功！');
  };

  return (
    <div>
      <Card title="创建采购订单">
        <POForm onSubmit={handleSubmit} />
      </Card>
      
      {previewData && (
        <Card style={{ marginTop: 16 }} title="订单预览">
          <POPreview data={previewData} />
        </Card>
      )}
    </div>
  );
};

export default CreatePO;