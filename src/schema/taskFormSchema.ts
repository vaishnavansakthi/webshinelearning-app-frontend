import * as Yup from "yup"

export const taskFormSchema = [
    {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter title",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "githubUrl",
        label: "Github Url",
        type: "text",
        placeholder: "Enter Github URL",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "deployedUrl",
        label: "Deployed URL",
        type: "text",
        placeholder: "Enter Deployed URL",
        required: true,
        className: "text-gray-400",
    }
]

export const taskValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    githubUrl: Yup.string().required("Github URL is required"),
    deployedUrl: Yup.string().required("Deployed URL is required"),
})