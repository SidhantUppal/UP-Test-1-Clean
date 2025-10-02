// Common location type shared across the application

export interface Location {
  id?: number;
  name: string;
  coordinates?: [number, number];
  what3words?: string;
  qrCode?: string;
}