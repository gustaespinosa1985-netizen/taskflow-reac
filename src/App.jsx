import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks, addTask, toggleTask } = useTasks();

  return (
    <>
      <header>
        <h1>Mis Pendientes</h1>
        <p className="subtitle">Lo que tengo que sacar esta semana</p>
      </header>

      <main>
        <NewTaskForm onAdd={addTask} />

        {/* controles de la lista */}

        <TaskList tasks={tasks} onToggle={toggleTask} />
        <TaskCounter tasks={tasks} />
      </main>

      <footer>
        <p id="credits">Hecho por Gustavo Espinosa</p>
      </footer>
    </>
  );
}
