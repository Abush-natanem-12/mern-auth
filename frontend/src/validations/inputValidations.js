import * as yup from "yup";

export const signupValidations = yup.object({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address")
    .min(3, "Email must be at least 3 characters"),
  password: yup.string().required("Please enter your password"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const signInValidations = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email address")
    .min(3, "Email must be at least 3 characters"),
  password: yup.string().required("Please enter your password"),
});
