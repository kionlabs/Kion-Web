export interface PanelData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  stats: { label: string; value: string }[];
  depth: 'foreground' | 'midground' | 'background';
  blur: number; // in pixels
  scale: number; // scale multiplier
  angle: number; // Angle in degrees relative to center (0 is right, 270 is top)
  xOffset: number; // default positioning offset in percentage
  yOffset: number;
}

export interface SystemStatus {
  coreActive: boolean;
  cpuLoad: number;
  memoryUsage: number;
  networkLatency: number;
  activeNodes: number;
}

export interface InterfaceSettings {
  parallaxStrength: number;
  rotationSpeed: number;
  isRotating: boolean;
  glowIntensity: 'low' | 'medium' | 'high';
  viewMode: '3D' | 'Compact';
}
