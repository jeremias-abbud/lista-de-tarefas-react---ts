
import { useState } from "react";
import type { MouseEvent } from "react";

const List = () => {

    const [input, setInput] = useState("");

    const [taskList, setTaskList] = useState<string[]>([]);

    const [editTask, setEditTask] = useState({
        enabled: false,
        item: ""
    });

    

    const handleRegister = (e: MouseEvent) => {
        e.preventDefault();

        if(!input) return;

        if(editTask.enabled) {
            handleSaveEdit();
            return;
        }

        setTaskList([...taskList, input]);

        setInput("");
    };

    const handleDelete = (task: string) => {
        const removedItems = taskList.filter(item => item !== task);

        setTaskList(removedItems);
        setInput("");
    };

    const handleEdit = (task: string) => {
        setInput(task);

        setEditTask({
            enabled: true,
            item: task
        });
    };

    const handleSaveEdit = () => {
        const findIndexTask = taskList.findIndex(task => task === editTask.item);

        const allTasks = [...taskList];

        allTasks[findIndexTask] = input;

        setTaskList(allTasks);

        setEditTask({
            enabled: false,
            item: ""
        });

        setInput("");
    };

    return (
        <div className="list">
            <h1>Lista de tarefas</h1>

            <div className="action-container">
                <label >Digite a sua tarefa :</label>
                <input
                    type="text"
                    placeholder="Digite sua tarefa"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleRegister}>
                    {editTask.enabled? "Editar Tarefa" : "Adicionar Tarefa"}
                </button>
            </div>

            <div className={`task-container ${taskList.length !== 0 ? "" : "hidden"}`}>
                {taskList.map((task) => (
                    <ul key={task}>
                        <li>
                            <span>{task}</span>
                            <div className="action-btn">
                                <button
                                    onClick={() => handleEdit(task)}>Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(task)}>Excluir
                                </button>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>

        </div>
    )
}

export default List