import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import "./App.css"

const tasks = [
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


export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <List tasks={tasks}></List>
    </>
  )
}