import React from 'react';
import { Form, Input, DatePicker, Select, Button, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { PurchaseOrder } from '../../types/po';
import FoilSelectionForm from './FoilSelectionForm';

interface POFormProps {
  initialValues?: PurchaseOrder;
  onSubmit: (values: any) => void;
}

const POForm: React.FC<POFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFoilSelectionChange = (values: any) => {
    // 更新表单中的烫金相关字段
    form.setFieldsValue({
      foilArea: values.foilArea,
      foilPattern: values.foilPattern,
      surfaceTreatment: values.surfaceTreatment,
      processOrder: values.processOrder,
      selectedFoil: values.selectedFoil
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="poNumber"
        label="PO Number"
        rules={[{ required: true, message: 'Please input PO number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="supplier"
        label="Supplier"
        rules={[{ required: true, message: 'Please input supplier!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="orderDate"
        label="Order Date"
        rules={[{ required: true, message: 'Please select order date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="deliveryDate"
        label="Delivery Date"
        rules={[{ required: true, message: 'Please select delivery date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      {/* 烫金选择表单 */}
      <FoilSelectionForm onChange={handleFoilSelectionChange} />

      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'productName']}
                  rules={[{ required: true, message: 'Missing product name' }]}
                >
                  <Input placeholder="Product Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'quantity']}
                  rules={[{ required: true, message: 'Missing quantity' }]}
                >
                  <InputNumber placeholder="Quantity" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'unitPrice']}
                  rules={[{ required: true, message: 'Missing unit price' }]}
                >
                  <InputNumber placeholder="Unit Price" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select status!' }]}
      >
        <Select>
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="approved">Approved</Select.Option>
          <Select.Option value="rejected">Rejected</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default POForm;