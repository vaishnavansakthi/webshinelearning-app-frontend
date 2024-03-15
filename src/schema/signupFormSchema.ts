import * as Yup from "yup"

export const signupFormSchema = [
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
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    className: "text-gray-400",
    text: "Password",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    type: "text",
    placeholder: "mobileNumber",
    required: true,
    className: "text-gray-400",
    text: "Mobile Number",
  },
]

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required("Oops! It seems you forgot to add a username."),
  email: Yup.string()
    .email("Enter in the format: name@example.com")
    .required("Oops! It seems you forgot to add an email."),
    password: Yup.string()
    .required("Oops! It seems you forgot to add a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must be at least 8 characters long with one uppercase, one lowercase, and one number'
    ),
  mobileNumber: Yup.string()
    .required("Oops! It seems you forgot to add a mobile number.")
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),
})
