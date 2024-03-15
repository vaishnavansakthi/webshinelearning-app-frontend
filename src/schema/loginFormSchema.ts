import * as Yup from "yup"

export const loginFormSchema = [
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
  }
]

export const loginalidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter in the format: name@example.com")
    .required("Oops! It seems you forgot to add an email."),
    password: Yup.string()
    .required("Oops! It seems you forgot to add a password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must be at least 8 characters long with one uppercase, one lowercase, and one number'
    )
})
