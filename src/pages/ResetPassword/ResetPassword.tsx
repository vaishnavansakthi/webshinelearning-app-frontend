import { useState } from "react"

import axios from "axios"
import { Formik, Form, FormikProps, FormikHelpers } from "formik"
import { Alert, Button, LinkText } from "../../components/atoms"
import { InputBlock } from "../../components/moleclues"
import { useNavigate } from "react-router-dom"
import { resetPasswordFormSchema, resetPasswordValidationSchema } from "../../schema/resetPasswordFormSchema"
import { CgDanger } from "react-icons/cg"

type User = {
  password: string
  confirmPassword: string
}

const initialValues: User = {
  password: "",
  confirmPassword: "",
}

const ResetPassword = () => {
  const [message, setsMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (values: User, formikHelpers: FormikHelpers<User>) => {
    console.log(values)
    formikHelpers.resetForm()

    if (values.password === values.confirmPassword) {
      const email = sessionStorage.getItem("userEmail")
      axios
        .post(
          "https://webshinelearning-app-backend.vercel.app/auth/reset-password",
          { email: email, newPassword: values.confirmPassword },
          {
            headers: {
              "x-api-key": `${import.meta.env.VITE_X_API_Key}`,
            },
          },
        )
        .then(() => {
          sessionStorage.removeItem("userEmail")
          navigate("/")
        })
        .catch((err: any) => {
          console.log(err)
          setsMessage(err.response.data.message)
        })
    } else {
      setsMessage("password not matching...")
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-[#404040] dark:border-none rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {message && <Alert message={message} />}
            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps: FormikProps<any>) => {
                const { errors, touched }: any = formikProps
                return (
                  <Form className="space-y-4 md:space-y-6">
                    {Array.isArray(resetPasswordFormSchema) &&
                      resetPasswordFormSchema.map((form, index) => {
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
                    <Button
                      type="submit"
                      text="Reset"
                      color="primary"
                      className="tracking-wide leading-normal"
                      size="medium"
                    />
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

export default ResetPassword
