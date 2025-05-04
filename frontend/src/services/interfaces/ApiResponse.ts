interface ApiResponse{
    message?: string;
    success: boolean;
    data?: any;
    error?: any;
    status?: number;
  }
export default ApiResponse;