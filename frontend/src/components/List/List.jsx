import "./List.css"
export default function List() {
    return (
        <div id="list-container">
            <h1>Tasks</h1>
            <div id="high-priority-tasks">
                <h2 className="priority" id="high-priority">high priority tasks</h2>
                <ul>
                    <li>
                        <div id="task">
                            <header>
                                <h3 className="title">Title</h3>
                                <p className="date">June 1 2020</p>
                            </header>
                            <section>
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati nemo quas molestias. Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro, pariatur corporis doloremque? Ullam, deleniti eaque!</p>
                                <p className="deadline">2 days</p>
                            </section>

                        </div>
                    </li>
                    <li>
                        <div id="task">
                            <header>
                                <h3 className="title">Title</h3>
                                <p className="date">June 1 2020</p>
                            </header>
                            <section>
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati nemo quas molestias. Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro, pariatur corporis doloremque? Ullam, deleniti eaque!</p>
                                <p className="deadline">2 days</p>
                            </section>

                        </div>
                    </li>
                </ul>
            </div>
            <div id="mid-priority-tasks">
                <h2 className="priority" id="mid-priority">medium priority tasks</h2>
                <ul>
                    <li>
                        <div id="task">
                            <header>
                                <h3 className="title">Title</h3>
                                <p className="date">June 1 2020</p>
                            </header>
                            <section>
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati nemo quas molestias. Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro, pariatur corporis doloremque? Ullam, deleniti eaque!</p>
                                <p className="deadline">2 days</p>
                            </section>

                        </div>
                    </li>
                    <li>
                        <div id="task">
                            <header>
                                <h3 className="title">Title</h3>
                                <p className="date">June 1 2020</p>
                            </header>
                            <section>
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati nemo quas molestias. Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro, pariatur corporis doloremque? Ullam, deleniti eaque!</p>
                                <p className="deadline">2 days</p>
                            </section>

                        </div>
                    </li>
                </ul>
            </div>
            <div id="low-priority-tasks">

                <h2 className="priority" id="low-priority">low priority tasks</h2>
                <ul>
                    <li>
                        <div id="task">
                            <header>
                                <h3 className="title">Title</h3>
                                <p className="date">June 1 2020</p>
                            </header>
                            <section>
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati nemo quas molestias. Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro, pariatur corporis doloremque? Ullam, deleniti eaque!</p>
                                <p className="deadline">2 days</p>
                            </section>

                        </div>
                    </li>
                    <li>
                        <div id="task">
                            <header>
                                <h3 className="title">Title</h3>
                                <p className="date">June 1 2020</p>
                            </header>
                            <section>
                                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati nemo quas molestias. Error ad dicta, dolore blanditiis obcaecati deserunt tempora placeat id porro, pariatur corporis doloremque? Ullam, deleniti eaque!</p>
                                <p className="deadline">2 days</p>
                            </section>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}