// import * as Yup from "yup"

export const profileFormSchema = [
    {
        name: "degree",
        label: "Degree",
        type: "text",
        placeholder: "Degree",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "university",
        label: "College",
        type: "text",
        placeholder: "College",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "graduationYear",
        label: "Graducation Year",
        type: "text",
        placeholder: "Graducation Year",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "fieldOfStudy",
        label: "Field Of Study",
        type: "text",
        placeholder: "Field Of Study",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "description",
        label: "Description",
        type: "textArea",
        placeholder: "Description",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "hobbies",
        label: "Hobbies",
        type: "text",
        placeholder: "Hobbies",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "dateOfBirth",
        label: "Date Of Birth",
        type: "Date",
        placeholder: "Date Of Birth",
        required: true,
        className: "text-gray-400",
    }
]