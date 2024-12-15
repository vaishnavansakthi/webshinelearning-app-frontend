import { Formik, Form, FormikProps, FormikHelpers } from "formik"
import { Alert, Button, Label, LinkText } from "../../components/atoms"
import { InputBlock } from "../../components/moleclues"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ReactGA from "react-ga4";
import { CgDanger } from "react-icons/cg"
import { loginFormSchema, loginalidationSchema } from "../../schema/loginFormSchema"
import { encryptData } from "../../utils/security"
import { loginUsers } from "../../services/login.services"
import { Helmet } from "react-helmet"

type User = {
  email: string
  password: string
}

const initialValues: User = {
  email: "",
  password: "",
}
const Login = () => {
  const [loading, setLoading] = useState(false)
  const [message, setsMessage] = useState("")
  const [alertColor, setAlertColor] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    // Track page view when component mounts
    ReactGA.send({ hitType: "pageview", page: "/login", title: "Login Page" });
  }, []);

  const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
    // navigate("/dashboard")
    setLoading(true)

    const res = loginUsers(values)
    res.then((d) => {
      console.log(d)
    })
    res
      .then((res: any) => {
        setLoading(false)
        formikHelpers.resetForm()
        if (res.user.isActivate) {
          encryptData(res, "userData", "object")
          ReactGA.event({
            category: "User",
            action: "Logged In",
            label: "Login Success",
          });
          ReactGA.set({
            user_id: res.user.id, // Optionally, track user_id
            username: res.user.username, // Custom user property
          });
          window.location.reload()
          navigate("/dashboard")
        } else {
          setsMessage(
            `Welcome, ${res.user.username}! Your profile awaits for activation by our diligent admin team. Stay tuned!`,
          )
          setAlertColor("bg-green-500")
          ReactGA.event({
            category: "User",
            action: "Login Attempt",
            label: "Profile Not Activated",
          });
        }
      })
      .catch((err: any) => {
        console.log(err)
        setsMessage(err.response.data.message)
        setLoading(false)
        setAlertColor("bg-red-400 rounded-sm")
        ReactGA.event({
          category: "User",
          action: "Login Failed",
          label: err.response.data.message,
        });
      })
  }

  return (
    <>
      <Helmet>
        <title>Webshine talents - Login</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-[#404040] rounded-lg shadow border-none dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {message && <Alert message={message} bgColor={alertColor} />}
            <Formik initialValues={initialValues} validationSchema={loginalidationSchema} onSubmit={handleSubmit}>
              {(formikProps: FormikProps<any>) => {
                const { errors, touched }: any = formikProps
                return (
                  <Form className="space-y-4 md:space-y-6">
                    {Array.isArray(loginFormSchema) &&
                      loginFormSchema.map((form, index) => {
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
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary-600 hover:underline text-blue-400"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      text="Login"
                      color="primary"
                      className="tracking-wide leading-normal"
                      size="medium"
                      loading={loading}
                    />
                    <p className="text-sm font-light dark:text-[#ffffff] text-gray-500">
                      Don’t have an account yet?{" "}
                      <LinkText href="/signup" text="Sign Up" className="tracking-wide leading-normal" />
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

export default Login
