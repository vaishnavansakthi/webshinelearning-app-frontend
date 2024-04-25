import * as Yup from "yup"

export const bookingFormSchema = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "John Victor",
    required: true,
    className: "text-gray-400",
    text: "Username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "name@company.com",
    required: true,
    className: "text-gray-400",
    text: "Your Email",
  },
  {
    name: "phone",
    label: "Mobile Number",
    type: "text",
    placeholder: "Mobile Number",
    required: true,
    className: "text-gray-400",
    text: "Mobile Number",
  },
]

export const bookingValidationSchema = Yup.object().shape({
  username: Yup.string().required("Oops! It seems you forgot to add a username."),
  email: Yup.string()
    .email("Enter in the format: name@example.com")
    .required("Oops! It seems you forgot to add an email."),
  phone: Yup.string()
    .required("Oops! It seems you forgot to add a mobile number.")
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),
})
