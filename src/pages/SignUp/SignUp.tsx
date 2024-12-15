import axios from "axios"
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom"
import { Formik, Form, FormikProps, FormikHelpers } from "formik"
import { CgDanger } from "react-icons/cg"

import { Alert, Button, Label, LinkText } from "../../components/atoms"
import { InputBlock } from "../../components/moleclues"
import { signupFormSchema, signupValidationSchema } from "../../schema/signupFormSchema"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

type User = {
  username: string
  email: string
  password: string
  mobileNumber: string
}

const initialValues: User = {
  username: "",
  email: "",
  password: "",
  mobileNumber: "",
}

const SignUp = () => {
  const [message, setsMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Track page view when component mounts
    ReactGA.send({ hitType: "pageview", page: "/signup", title: "SignUp Page" });
  }, []);

  const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
    setLoading(true)
    axios
      .post("https://webshinelearning-app-backend.vercel.app/auth/register", values, {
        headers: {
          "x-api-key": `${import.meta.env.VITE_X_API_Key}`,
        },
      })
      .then(() => {
        setLoading(false)
        formikHelpers.resetForm()
        ReactGA.event({
          category: "User",
          action: "Sign Up Successful",
          label: "User Created Account",
        });
        navigate("/login")
      })
      .catch((err: any) => {
        setLoading(false)
        console.log(err)
        setsMessage(err.response.data.message)
        setAlertColor("bg-red-400 rounded-sm")
        ReactGA.event({
          category: "User",
          action: "Sign Up Failed",
          label: err.response.data.message,
        });
      })
  }

  return (
    <>
      <Helmet>
        <title>Webshine talents - SignUp</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-[#404040] dark:border-none rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {message && <Alert message={message} bgColor={alertColor} />}
            <Formik initialValues={initialValues} validationSchema={signupValidationSchema} onSubmit={handleSubmit}>
              {(formikProps: FormikProps<any>) => {
                const { errors, touched }: any = formikProps
                return (
                  <Form className="space-y-4 md:space-y-6">
                    {Array.isArray(signupFormSchema) &&
                      signupFormSchema.map((form, index) => {
                        const hasError = errors?.[form.name] && touched?.[form.name]
                        return (
                          <>
                            <InputBlock
                              key={index}
                              name={form.name}
                              text={form.label}
                              type={form.type}
                              placeholder={form.placeholder}
                              labelClassName={`${hasError ? "text-red-400" : ""}`}
                              className={
                                form.className + " " + `${hasError ? "outline outline-red-400" : "outline-blue-500"}`
                              }
                              isErrors={hasError}
                            />
                            {errors?.[form.name] && touched?.[form.name] ? (
                              <span id="errors" className="text-red-500 text-[14px] ml-1 mt-5">
                                <CgDanger className="inline-block mr-1 mt-[-4px]" />
                                {errors?.[form.name]}
                              </span>
                            ) : null}
                          </>
                        )
                      })}
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <Label text="Remember me" htmlFor="remember" labelClassName="text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <Button
                      type={"submit"}
                      text="Sign Up"
                      color="primary"
                      className="tracking-wide leading-normal"
                      size="medium"
                      loading={loading}
                    />
                    <p className="text-sm font-light dark:text-[#ffffff] text-gray-500">
                      Already have an account?{" "}
                      <LinkText href="/login" text="Login" className="tracking-wide leading-normal" />
                    </p>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
