import { useState, useEffect } from "react"

import dayjs from "dayjs"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { decryptData } from "../../utils/security"
import { Modal } from "../../components/moleclues"
import { Field, Formik, ErrorMessage, Form } from "formik"
import { profileFormSchema } from "../../schema/profileFormSchema"
import { createProfile, updateProfile, getUserProfile } from "../../services/profile.services"
import { getUserData } from "../../services/adminDashboard.services"

const Profile = () => {
  const [profileData, setProfileData] = useState<any>({})
  const [userData, setUserData] = useState<any>()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const mytoken = JSON.parse(decryptData("userData", null))
    getUserData(mytoken?.user?.id)
      .then((data: any) => {
        const profileId = data[0]?.profile?.id
        setUserData(data)
        console.log(profileId)
        if (profileId) {
          return getUserProfile(profileId)
        }
      })
      .then((profileData: any) => {
        setProfileData({ mytoken: mytoken, users: profileData })
      })
      .catch((error: any) => {
        console.error("Error fetching user data:", error)
      })
  }, [])

  const handleOpenModal = () => {
    setShowModal(true)
  }
  console.log(profileData)
  const handleCloseModal = () => {
    console.log("Close modal")
    setShowModal(false)
  }
  const handleSubmit = (values: any) => {
    const data = JSON.parse(decryptData("userData", null))
    const payload = {
      userId: data?.user?.id,
      ...values,
    }

    if (userData?.[0]?.profile) {
      const res = updateProfile(userData[0].profile.id, payload)
      res
        .then((data) => {
          console.log("Profile updated:", data)
          handleCloseModal()
          setProfileData((prevProfileData: any) => ({
            ...prevProfileData,
            users: [data],
          }))
        })
        .catch((err) => {
          console.error("Error updating profile:", err)
        })
    } else {
      const res = createProfile(payload)
      res
        .then((data) => {
          console.log("New profile created:", data)
          handleCloseModal()
          setProfileData((prevProfileData: any) => ({
            ...prevProfileData,
            users: [data],
          }))
        })
        .catch((err) => {
          console.error("Error creating profile:", err)
        })
    }
  }

  return (
    <>
      <div className="p-10 max-[600px]:p-5">
        <div className="p-8 max-[600px]:p-1 max-[600px]:mt-12 bg-white dark:bg-[#404040] shadow mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative">
              <div className="w-48 h-48 max-[600px]:w-40 max-[600px]:h-40 bg-indigo-100 dark:bg-[#404040] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-blue-400">
                <span className="w-12 h-12 p-2 rounded-full capitalize dark:text-white font-semibold text-8xl text-center flex items-center justify-center">
                  {userData?.[0]?.username.charAt(0)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12 max-[600px]:mt-28">
            <h1 className="text-4xl font-medium text-gray-700 dark:text-[#ffffff] first-letter:uppercase">
              {userData?.[0]?.username}
            </h1>
            <p className="font-light dark:text-[#ffffff] text-gray-600 mt-3">
              {userData?.[0]?.email}, {userData?.[0]?.mobileNumber}
            </p>
            <p className="mt-2 dark:text-[#ffffff] text-gray-500">{profileData?.users?.[0]?.university}</p>

            <p className="mt-2 dark:text-[#ffffff] text-gray-500">
              {profileData?.users?.[0]?.degree} - {profileData?.users?.[0]?.fieldOfStudy}
            </p>
            <p className="mt-2 dark:text-[#ffffff] text-gray-500">
              {profileData?.users?.[0]?.graduationYear && `Passed Out - ${profileData?.users?.[0]?.graduationYear}`}
            </p>
            <p className="mt-2 dark:text-[#ffffff] text-gray-500">
              {" "}
              {dayjs(profileData?.users?.[0]?.dateOfBirth).format("MMM D, YYYY")}
            </p>
            <div className="w-[200px] m-auto mt-1 text-sm">
              {userData?.[0] && (
                <button
                  className="border border-gray-300 p-3 m-3 rounded-md hover:bg-blue-400 hover:text-white dark:text-white shadow-md"
                  onClick={handleOpenModal}
                >
                  {userData?.[0]?.profile ? "Edit Profile" : "Add More Info"}
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light dark:text-[#ffffff] lg:px-16">
              {profileData?.users?.[0]?.description}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title={userData?.[0]?.profile ? "Update Profile" : "Add Profile"} handleCloseModal={handleCloseModal}>
          <Formik
            initialValues={{
              degree: profileData?.users?.[0]?.degree || "",
              university: profileData?.users?.[0]?.university || "",
              fieldOfStudy: profileData?.users?.[0]?.fieldOfStudy || "",
              graduationYear: profileData?.users?.[0]?.graduationYear || "",
              description: profileData?.users?.[0]?.description || "",
              hobbies: profileData?.users?.[0]?.hobbies || "",
              dateOfBirth: profileData?.users?.[0]?.dateOfBirth || "",
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profileFormSchema.map((form, index) => (
                    <div key={index}>
                      <label
                        htmlFor={form.name}
                        className="block text-sm max-[600px]:text-left font-medium text-gray-700"
                      >
                        {form.label}
                      </label>
                      <Field
                        as={form.type === "textArea" ? "textArea" : ""}
                        name={form.name}
                        type={form.type}
                        placeholder={form.placeholder}
                        className="appearance-none mt-1 max-[650px]:mt-2 block w-[220px] max-[650px]:w-[300px] px-3 py-2 border border-gray-300 dark:border-black dark:bg-[#282828] dark:text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />

                      <ErrorMessage name={form.name} component="div" className="text-red-500 text-sm" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-end mt-5">
                  <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-md">
                    {userData?.[0]?.profile ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400  px-5 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

export default withProtectedRoute(Profile)
