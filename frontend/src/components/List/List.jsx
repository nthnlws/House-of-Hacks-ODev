import "./List.css"
export default function List({ tasks }) {
    const handleCheckmarkClick = (title) => {
        alert(`Checkmark clicked for: ${title}`);
    };

    return (
        <div id="list-container">
            <h1>Tasks</h1>
            {tasks.map((task, index) => (
                <div key={index} id={`${task.priority}-priority-tasks`}>
                    <h2 className="priority" id={`${task.priority}-priority`}>
                        {task.priority} priority tasks
                    </h2>
                    <ul>
                        {task.items.map((item, idx) => (
                            <li key={idx}>
                                <div id="task">
                                    <header>
                                        <h3 className="title">
                                            {item.title}
                                            <button
                                                className="checkmark"
                                                onClick={() => handleCheckmarkClick(item.title)}
                                            >
                                                ✓
                                            </button>
                                        </h3>
                                        <p className="date">{item.date}</p>
                                    </header>
                                    <section>
                                        <p className="description">{item.description}</p>
                                        <p className="deadline">{item.deadline}</p>
                                    </section>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
        
