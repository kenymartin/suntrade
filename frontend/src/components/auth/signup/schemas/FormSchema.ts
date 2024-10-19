import { z } from "zod";

const userSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username is required" })
      .max(20, { message: "Username must be at most 20 characters" })
      .refine((val) => !val.includes(" "), {
        message: "Username cannot contain spaces",
      }),
      
  });
  const signupSchema = userSchema
    .extend({
      accountType: z.enum(["personal", "business", ""]),
      firstName: z.string().min(3, { message: "First Name is required" }),
      lastName: z.string().min(3, { message: "Last Name is required" }),
      email: z
        .string()
        .min(5, { message: "Email is required" })
        .email({ message: "Invalid email address" })
        .max(254, { message: "Email must be at most 254 characters" }), // Email validation
      password: z
        .string()
        .min(8, { message: "Password is required" })
        .max(128, { message: "Password must be at most 128 characters long" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Confirm Password is required" })
        .max(128, {
          message: "Confirm Password must be at most 128 characters long",
        }),
      termsofUser: z.boolean().refine((val) => val, {
        message: "You must agree to the terms and conditions",
      }),
    })
    .superRefine((data, ctx) => {
      debugger;
      if (data.accountType === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account type is required",
          path: ["accountType"],
        });
      }
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
  
      }
    });
  
    export default {
     signupSchema
    }