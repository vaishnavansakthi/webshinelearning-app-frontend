export const attendanceFormSchema = [
    {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter title",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "desc",
        label: "Description",
        type: "textArea",
        placeholder: "Enter description",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { value: "present", label: "Present" },
            { value: "absent", label: "Absent" },
        ],
        placeholder: "Select status",
        required: true,
        className: "text-gray-400",
    },
]