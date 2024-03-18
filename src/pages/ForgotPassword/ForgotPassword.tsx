import { useState } from "react"
import { Alert, Button, LinkText } from "../../components/atoms"
import { InputBlock } from "../../components/moleclues"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Formik, Form, FormikProps, FormikHelpers } from "formik"
import { forgotPasswordFormSchema, forgotPasswordValidationSchema } from "../../schema/forgotPasswordFormSchema"
import { CgDanger } from "react-icons/cg"

type User = {
  email: string
}

const initialValues: User = {
  email: "",
}

const ForgotPassword = () => {
  const [message, setsMessage] = useState("")
  const navigate = useNavigate()
  
  const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
    axios.post('https://webshinelearning-app-backend.vercel.app/auth/forgot-password', {email: values.email}, {
      headers: {
        'x-api-key': `${import.meta.env.VITE_X_API_Key}`
      }
    })
    .then(() => {
      sessionStorage.setItem('userEmail', values.email);
      formikHelpers.resetForm()
      navigate("/verify-otp")
    }).catch((err: any) => {
      setsMessage(err.response.data.message)
    })
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-[#404040] dark:border-none rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {message && <Alert message={message} />}
          <Formik initialValues={initialValues} validationSchema={forgotPasswordValidationSchema} onSubmit={handleSubmit}>
              {(formikProps: FormikProps<any>) => {
                const { errors, touched }: any = formikProps
                return (
                  <Form className="space-y-4 md:space-y-6">
                  {Array.isArray(forgotPasswordFormSchema) &&
                      forgotPasswordFormSchema.map((form, index) => {
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
                      <div className="text-sm dark:text-[#ffffff]">
                        Back to <LinkText href="/" text="Login" className="tracking-wide leading-normal" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" text="Send" color="primary" className="tracking-wide leading-normal" size="medium" />
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

export default ForgotPassword
