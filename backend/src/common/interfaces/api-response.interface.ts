export interface ApiResponse<T = any> {
  success: boolean;
  code: string;
  message: string;
  data?: T;
  errors?: any[];
  meta: {
    timestamp: string;
    path: string;
    requestId?: string;
  };
}
