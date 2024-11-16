export interface ProcessParameters {
  temperature: number;    // 烫金温度 (°C)
  pressure: number;       // 压力 (MPa)
  dwellTime: number;      // 停留时间 (s)
  speed: number;         // 生产速度 (m/min)
}

export interface QualityControl {
  adhesion: 'excellent' | 'good' | 'fair' | 'poor';
  coverage: number;      // 覆盖率百分比
  definition: 'high' | 'medium' | 'low';
  uniformity: 'excellent' | 'good' | 'fair' | 'poor';
  issues: string[];      // 质量问题列表
}

export interface ProcessHistory {
  id: string;
  timestamp: Date;
  parameters: ProcessParameters;
  quality: QualityControl;
  operator: string;
  result: 'success' | 'failure';
  foilType: string;
  substrate: string;
  notes?: string;
}

export interface HistoryStatistics {
  totalProcesses: number;
  successRate: number;
  averageParameters: ProcessParameters;
  commonIssues: string[];
}