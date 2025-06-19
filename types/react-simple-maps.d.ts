declare module 'react-simple-maps' {
  import { ComponentType } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string;
    children: (data: { geographies: any[] }) => React.ReactNode;
  }

  export interface GeographyProps {
    key?: string | number;
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  }

  export interface MarkerProps {
    key?: string | number;
    coordinates: [number, number];
    children?: React.ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
} 