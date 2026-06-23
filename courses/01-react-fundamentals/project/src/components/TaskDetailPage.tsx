import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "./TaskList";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  let tasks: Task[] = [];

  try {
    const savedTasks = localStorage.getItem(
      "task-app-tasks"
    );

    if (savedTasks) {
      tasks = JSON.parse(savedTasks) as Task[];
    }
  } catch {
    tasks = [];
  }

  const task = tasks.find(
    (t) => String(t.id) === String(id)
  );

  if (!task) {
    return (
      <div id="task-detail-page">
        <h2>Task not found</h2>

        <button
          id="task-detail-back"
          onClick={() =>
            navigate(
              "/challenge/21-react-router"
            )
          }
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>
        <strong>Priority:</strong>{" "}
        {task.priority}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {task.category}
      </p>

      {task.tags.length > 0 && (
        <div>
          <strong>Tags:</strong>{" "}
          {task.tags.join(", ")}
        </div>
      )}

      {task.dueDate && (
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(
            task.dueDate
          ).toLocaleDateString()}
        </p>
      )}

      <button
        id="task-detail-back"
        onClick={() =>
          navigate(
            "/challenge/21-react-router"
          )
        }
      >
        Back to list
      </button>
    </div>
  );
}