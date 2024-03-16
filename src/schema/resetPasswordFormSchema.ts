import * as Yup from "yup"

export const resetPasswordFormSchema = [
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "At least 8 digits",
    required: true,
    className: "text-gray-400",
    text: "Password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    className: "text-gray-400",
    text: "Confirm Password",
  },
]

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Oops! It seems you forgot to add a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must be at least 8 characters long with one uppercase, one lowercase, and one number",
    ),
  confirmPassword: Yup.string()
    .required("Oops! It seems you forgot to add a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must be at least 8 characters long with one uppercase, one lowercase, and one number",
    ),
})
