// 映射规则
export const mappingRules = [
  {
    id: 1,
    name: '面积规则',
    description: '根据烫金面积大小选择合适的烫金纸系列',
    conditions: [
      {
        size: '小面积',
        description: '< 50mm x 50mm',
        recommendedSeries: ['SY6-系列', 'SY1-系列']
      },
      {
        size: '中面积',
        description: '50mm x 50mm ≤ X < 100mm x 100mm',
        recommendedSeries: ['SY6-系列', 'G1系列', 'A23系列']
      },
      {
        size: '大面积',
        description: '≥ 100mm x 100mm',
        recommendedSeries: ['SY+系列', 'SH的标准金纸']
      }
    ]
  },
  {
    id: 2,
    name: '图案类型规则',
    description: '根据烫金图案类型选择合适的烫金纸系列',
    conditions: [
      {
        type: '幼细线条、文字',
        recommendedSeries: ['SY6-系列', 'A23系列']
      },
      {
        type: '渐变、网点',
        recommendedSeries: ['SY1-系列', 'SH的标准金纸']
      },
      {
        type: '普通图案',
        recommendedSeries: ['G1系列', 'A23系列', 'SY6-系列']
      },
      {
        type: '立体、磨砂、有纹理效果',
        recommendedSeries: ['ST系列', 'GN系列']
      }
    ]
  },
  {
    id: 3,
    name: '应用场景规则',
    description: '根据应用场景选择合适的烫金纸系列',
    conditions: [
      {
        scene: '贺卡',
        recommendedSeries: ['SY1-系列', 'ST系列', 'SH的标准金纸']
      },
      {
        scene: '精装书',
        recommendedSeries: ['SY6-系列', 'G1系列', 'A23系列']
      },
      {
        scene: '包装',
        recommendedSeries: ['SY6-系列', 'G1系列']
      },
      {
        scene: '综合',
        recommendedSeries: ['A23系列', 'SY6-系列', 'G1系列']
      },
      {
        scene: '卡书',
        recommendedSeries: ['A23系列', 'SY6-系列', 'G1系列']
      },
      {
        scene: '精平装',
        recommendedSeries: ['SY6-系列', 'G1系列']
      }
    ]
  },
  {
    id: 4,
    name: '表面处理规则',
    description: '根据烫金表面处理要求选择合适的烫金纸系列',
    conditions: [
      {
        surface: 'UV涂层（亮光）',
        recommendedSeries: ['ST系列', 'GN系列']
      },
      {
        surface: 'UV涂层（哑光）',
        recommendedSeries: ['ST系列', 'GN系列']
      },
      {
        surface: '粉纸面',
        recommendedSeries: ['E8系列']
      },
      {
        surface: '无粉纸面',
        recommendedSeries: ['L817系列']
      },
      {
        surface: '普通纸张',
        recommendedSeries: ['SY6-系列', 'G1系列', 'A23系列', 'SY1-系列']
      }
    ]
  },
  {
    id: 5,
    name: '工艺顺序规则',
    description: '根据烫金工艺顺序选择合适的烫金纸系列',
    conditions: [
      {
        process: '在UV涂层上烫金',
        recommendedSeries: ['ST系列', 'GN系列']
      },
      {
        process: '先烫金后过UV',
        recommendedSeries: ['ST系列', 'GN系列']
      },
      {
        process: '先烫金后过胶',
        recommendedSeries: ['G1系列', 'SY6-系列']
      },
      {
        process: '烫金后印刷',
        recommendedSeries: ['L817系列', 'SY6-系列']
      }
    ]
  }
];

// 规则匹配函数
export const matchRules = (criteria) => {
  const matchedRules = [];
  
  mappingRules.forEach(rule => {
    rule.conditions.forEach(condition => {
      let isMatch = false;
      
      if (condition.size && criteria.foilArea === condition.size) {
        isMatch = true;
      }
      if (condition.type && criteria.foilPattern === condition.type) {
        isMatch = true;
      }
      if (condition.scene && criteria.application === condition.scene) {
        isMatch = true;
      }
      if (condition.surface && criteria.surfaceTreatment === condition.surface) {
        isMatch = true;
      }
      if (condition.process && criteria.processOrder === condition.process) {
        isMatch = true;
      }

      if (isMatch) {
        matchedRules.push({
          ruleName: rule.name,
          description: rule.description,
          recommendedSeries: condition.recommendedSeries
        });
      }
    });
  });
  
  return matchedRules;
};