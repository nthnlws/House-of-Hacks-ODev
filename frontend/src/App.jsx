import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import "./App.css"
import Form from "./components/Form/Form";
import { useState, useEffect } from "react";
import { createProperty, createTaskTemplate, getAllProperties, getAllTaskTemplates, listActiveTasks } from "./HTTPClient";
import { format, differenceInDays } from "date-fns";
const temp = [
    {
        priority: 'high',
        items: [
            {
                title: 'Task 1',
                date: 'June 1 2020',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                deadline: '2 days',
            },
            {
                title: 'Task 2',
                date: 'June 2 2020',
                description: 'Explicabo obcaecati nemo quas molestias.',
                deadline: '3 days',
            },
        ],
    },
    {
        priority: 'medium',
        items: [
            {
                title: 'Task 3',
                date: 'June 3 2020',
                description: 'Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro.',
                deadline: '4 days',
            },
        ],
    },
    {
        priority: 'low',
        items: [
            {
                title: 'Task 4',
                date: 'June 4 2020',
                description: 'Pariatur corporis doloremque? Ullam, deleniti eaque!',
                deadline: '5 days',
            },
        ],
    },
];

const reformatTasks = (tasks) => {
    // Group tasks by priority
    const groupedTasks = tasks.reduce((acc, task) => {
        const { priority, name, createdAt, description, dueDate } = task;

        // Format date and calculate the deadline
        const formattedDate = format(new Date(createdAt), "MMMM d yyyy");
        const deadline = `${differenceInDays(new Date(dueDate), new Date())} days`;

        // Create the reformatted task object
        const formattedTask = {
            title: name,
            date: formattedDate,
            description,
            deadline
        };

        // Add to the priority group
        if (!acc[priority]) {
            acc[priority] = { priority, items: [] };
        }
        acc[priority].items.push(formattedTask);

        return acc;
    }, {});

    // Convert the grouped tasks object to an array
    return Object.values(groupedTasks);
};

// const formattedTasks = reformatTasks(tasks);

export default function App() {
    const [showForm, setShowForm] = useState(false)
    const [data, setData] = useState(null)
    const [tasks, setTasks] = useState(temp)
    useEffect(() => {
        if (data) {
            // const idk = createProperty(data).then((val) => console.log(val))
            // getAllProperties().then((val) => console.log(val))
            listActiveTasks("67267df80107b04ef0f6c11a").then((val) => setTasks(reformatTasks(val)))
        }
    }, [data]);
    useEffect(() => {
        if (showForm) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        // Cleanup function to reset overflow when component unmounts or showForm changes
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [showForm]);
    return (
        <>
            <Navbar setShowForm={setShowForm}></Navbar>
            <List tasks={tasks}></List>
            {showForm && <Form setShowForm={setShowForm} data={data} setData={setData}></Form>
            }
        </>
    )
}