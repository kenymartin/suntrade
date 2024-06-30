import rateLimit from "express-rate-limit";


const CustomLimitter = (max?: number, time?: number,sfr?:boolean,ssr?:boolean)=> {
  return (next: any) => {
    rateLimit({
      windowMs: (time ?? 60) * 1000, //1 minute(s)
      max: max ?? 100, //Maximum 100 requests per windowMs
      message: "Rate limit exceeded,try again later",
      skipFailedRequests: sfr ?? false, //
      skipSuccessfulRequests: ssr ?? false, //
    });
    next();
  };
    
 }
export default CustomLimitter


