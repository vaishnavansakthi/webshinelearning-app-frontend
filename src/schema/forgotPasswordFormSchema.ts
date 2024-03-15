import * as Yup from "yup"



export const forgotPasswordFormSchema = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "name@company.com",
    required: true,
    className: "text-gray-400",
    text: "Your Email",
  }
]

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter in the format: name@example.com")
    .required("Oops! It seems you forgot to add an email.")
})
