import React, { useState } from 'react';
import { Form, Select, Space, Radio, Card, Table } from 'antd';
import { 
  areaOptions, 
  patternOptions, 
  surfaceOptions, 
  processOrderOptions,
  wearResistanceOptions,
  tensionOptions,
  foilMappings 
} from '../../data/foilMappings';
import type { FoilMapping } from '../../types/po';

interface FoilSelectionFormProps {
  onChange: (values: any) => void;
}

const FoilSelectionForm: React.FC<FoilSelectionFormProps> = ({ onChange }) => {
  const [recommendedFoils, setRecommendedFoils] = useState<FoilMapping[]>([]);
  const [form] = Form.useForm();

  const handleSelectionChange = () => {
    const values = form.getFieldsValue();
    const matchedFoils = matchFoils(values);
    setRecommendedFoils(matchedFoils);
    onChange({ ...values, recommendedFoils: matchedFoils });
  };

  const matchFoils = (criteria: any) => {
    if (!criteria.foilArea || !criteria.foilPattern) return [];

    return foilMappings.filter(mapping => {
      const matchesArea = mapping.supplierCodes.some(supplier => 
        supplier.suitableSize.includes(
          criteria.foilArea === 'small' ? '小面积' : 
          criteria.foilArea === 'medium' ? '中面积' : '大面积'
        )
      );

      const matchesPattern = mapping.supplierCodes.some(supplier =>
        supplier.usage.includes(
          criteria.foilPattern === 'halftone' ? 'Halftone' :
          criteria.foilPattern === 'fine' ? '幼细线条' :
          criteria.foilPattern === 'textured' ? '立体、磨砂' : '普通烫金'
        )
      );

      return matchesArea && matchesPattern;
    });
  };

  const columns = [
    {
      title: '公司编号',
      dataIndex: 'companyCode',
      key: 'companyCode',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierCode',
      key: 'supplierCode',
      render: (_: any, record: FoilMapping) => record.supplierCodes.map(s => s.code).join(', '),
    },
    {
      title: '系列',
      dataIndex: 'series',
      key: 'series',
      render: (_: any, record: FoilMapping) => record.supplierCodes[0].series,
    },
    {
      title: '用途说明',
      dataIndex: 'usage',
      key: 'usage',
      render: (_: any, record: FoilMapping) => record.supplierCodes[0].usage,
    },
    {
      title: '主要应用',
      dataIndex: 'mainApplication',
      key: 'mainApplication',
      render: (_: any, record: FoilMapping) => record.supplierCodes[0].mainApplication,
    }
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      className="foil-selection-form"
      onValuesChange={handleSelectionChange}
    >
      <Card title="烫金工艺选择">
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Form.Item
            name="foilArea"
            label="烫金面积"
            rules={[{ required: true, message: '请选择烫金面积' }]}
          >
            <Select options={areaOptions} placeholder="请选择烫金面积" />
          </Form.Item>

          <Form.Item
            name="foilPattern"
            label="烫金图案类型"
            rules={[{ required: true, message: '请选择图案类型' }]}
          >
            <Select options={patternOptions} placeholder="请选择图案类型" />
          </Form.Item>

          <Form.Item
            name="surfaceTreatment"
            label="烫金表面处理"
            rules={[{ required: true, message: '请选择表面处理' }]}
          >
            <Select options={surfaceOptions} placeholder="请选择表面处理" />
          </Form.Item>

          <Form.Item
            name="processOrder"
            label="工艺顺序"
            rules={[{ required: true, message: '请选择工艺顺序' }]}
          >
            <Select options={processOrderOptions} placeholder="请选择工艺顺序" />
          </Form.Item>

          <Form.Item
            name="wearResistance"
            label="耐磨要求"
            rules={[{ required: true, message: '请选择耐磨要求' }]}
          >
            <Select options={wearResistanceOptions} placeholder="请选择耐磨要求" />
          </Form.Item>

          <Form.Item
            name="tensionRequirement"
            label="松紧度要求"
            rules={[{ required: true, message: '请选择松紧度要求' }]}
          >
            <Select options={tensionOptions} placeholder="请选择松紧度要求" />
          </Form.Item>

          {recommendedFoils.length > 0 && (
            <>
              <h3>推荐烫金纸</h3>
              <Table
                dataSource={recommendedFoils}
                columns={columns}
                rowKey="companyCode"
                pagination={false}
              />
              <Form.Item
                name="selectedFoil"
                label="选择烫金纸"
                rules={[{ required: true, message: '请选择烫金纸' }]}
              >
                <Select placeholder="请选择烫金纸">
                  {recommendedFoils.map(foil => (
                    <Select.Option key={foil.companyCode} value={foil.companyCode}>
                      {`${foil.companyCode} - ${foil.supplierCodes[0].series}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </Space>
      </Card>
    </Form>
  );
};

export default FoilSelectionForm;