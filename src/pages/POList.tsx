import React, { useState } from 'react';
import { Card } from 'antd';
import POListComponent from '../components/POList';
import { PurchaseOrder } from '../types/po';
import POPreview from './POPreview';

const POList: React.FC = () => {
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  
  // 示例数据
  const sampleData: PurchaseOrder[] = [
    {
      id: '1',
      poNumber: 'PO-2023-001',
      supplier: '供应商A',
      orderDate: '2023-12-20',
      deliveryDate: '2023-12-30',
      status: 'pending',
      items: [
        {
          id: '1',
          productName: '烫金纸A',
          quantity: 100,
          unitPrice: 10,
          totalPrice: 1000,
          companyCode: 'HS#1G',
          supplierCode: 'SH111',
          foilSeries: 'SY1-系列'
        }
      ],
      totalAmount: 1000,
      foilArea: 'small',
      foilPattern: 'fine',
      surfaceTreatment: 'normal',
      processOrder: 'uvThenFoil',
      wearResistance: 'normal',
      tensionRequirement: 'standard',
      application: '贺卡',
      specialRequirements: []
    },
    {
      id: '2',
      poNumber: 'PO-2023-002',
      supplier: '供应商B',
      orderDate: '2023-12-21',
      deliveryDate: '2023-12-31',
      status: 'approved',
      items: [
        {
          id: '2',
          productName: '烫金纸B',
          quantity: 200,
          unitPrice: 15,
          totalPrice: 3000,
          companyCode: 'HS#2G',
          supplierCode: 'SY606-',
          foilSeries: 'SY6-系列'
        }
      ],
      totalAmount: 3000,
      foilArea: 'medium',
      foilPattern: 'normal',
      surfaceTreatment: 'uvCoating',
      processOrder: 'foilThenUv',
      wearResistance: 'high',
      tensionRequirement: 'standard',
      application: '精装书',
      specialRequirements: []
    }
  ];

  const handleView = (record: PurchaseOrder) => {
    setSelectedPO(record);
  };

  const handleEdit = (record: PurchaseOrder) => {
    console.log('Edit record:', record);
  };

  return (
    <div>
      <Card title="采购订单列表">
        <POListComponent
          data={sampleData}
          onView={handleView}
          onEdit={handleEdit}
        />
      </Card>
      
      {selectedPO && (
        <Card style={{ marginTop: 16 }}>
          <POPreview data={selectedPO} />
        </Card>
      )}
    </div>
  );
};

export default POList;