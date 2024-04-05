export const taskTrackerFormSchema = [
    {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter title",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "storyPoints",
        label: "Story Points",
        type: "number",
        placeholder: "Enter your points",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "comments",
        label: "Comments",
        type: "textArea",
        placeholder: "Enter your comments",
        required: true,
        className: "text-gray-400",
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { value: "todo", label: "Todo" },
            { value: "inprogress", label: "In Progress" },
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
        ],
        placeholder: "Select status",
        required: true,
        className: "text-gray-400",
    }
]