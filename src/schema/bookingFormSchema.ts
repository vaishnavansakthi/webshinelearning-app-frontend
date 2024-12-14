import * as Yup from "yup"

export const bookingFormSchema = [
  {
    name: "username",
    label: "Your Name",
    type: "text",
    placeholder: "eg:- sakthi",
    required: true,
    className: "text-gray-400",
    text: "Username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "xxxxxxx@gmail.com",
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
  {
    name: "chooseYourCourse",
    label: "Choose your course",
    type: "select",
    options: [
      { value: "MERN Stack", label: "MERN Stack" },
      { value: "UI/UX Design", label: "UI/UX Design" },
      { value: "React & Python Stack", label: "React & Python Stack" },
    ],
    placeholder: "Select your course",
    required: true,
    className: "text-gray-400",
  },
  {
    name: "desc",
    label: "Give some intro about you",
    type: "textArea",
    placeholder: "Please provide some background of you eg:- Where you are coming from, College and degree",
    required: true,
    className: "text-gray-400",
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
  chooseYourCourse: Yup.string().required("Please choose your preferred course"),
  desc: Yup.string().required("Give some intro about yourself to proceed further"),
})
