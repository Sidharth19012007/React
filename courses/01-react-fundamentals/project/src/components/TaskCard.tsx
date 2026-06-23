import { memo } from "react";
import { Link } from "react-router-dom";

interface TaskCardProps {
  id?: string | number;
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
  category?: string;
  tags?: string[];
  dueDate?: string | number;

  onToggle?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;

  linkToTaskDetail?: boolean;
}

function TaskCard({
  id,
  title,
  description,
  priority,
  completed = false,
  category = "General",
  tags = [],
  dueDate,
  onToggle,
  onDelete,
  linkToTaskDetail = false,
}: TaskCardProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let isOverdue = false;
  let isDueToday = false;
  let isDueSoon = false;

  if (dueDate) {
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const difference =
      (due.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

    isOverdue = difference < 0 && !completed;
    isDueToday = difference === 0;
    isDueSoon =
      difference > 0 && difference <= 3;
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
      data-overdue={isOverdue}
      style={{
        backgroundColor: completed
          ? "#e5ffe5"
          : "white",
        border: isOverdue
          ? "2px solid red"
          : "1px solid #cccccc",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id!)}
        />
      )}

      <h2
        style={{
          textDecoration: completed
            ? "line-through"
            : "none",
        }}
      >
        {linkToTaskDetail ? (
          <Link
            to={`/challenge/21-react-router/task/${id}`}
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>

      <p
        style={{
          textDecoration: completed
            ? "line-through"
            : "none",
        }}
      >
        {description}
      </p>

      <p>Priority: {priority}</p>

      <div id="task-category">
        Category: {category}
      </div>

      <div id="task-tags">
        {tags.map((tag) => (
          <span
            key={tag}
            data-tag={tag}
            className="tag-badge"
            style={{
              display: "inline-block",
              padding: "2px 8px",
              marginRight: "6px",
              borderRadius: "12px",
              backgroundColor: "#eeeeee",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {dueDate && (
        <p id="task-due-date">
          Due:{" "}
          {new Date(
            dueDate
          ).toLocaleDateString()}
        </p>
      )}

      {isOverdue && (
        <p style={{ color: "red" }}>
          Overdue
        </p>
      )}

      {isDueToday && (
        <p style={{ color: "orange" }}>
          Due Today
        </p>
      )}

      {isDueSoon && !isDueToday && (
        <p style={{ color: "green" }}>
          Due Soon
        </p>
      )}

      {onDelete && (
        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure?"
              )
            ) {
              onDelete(id!);
            }
          }}
        >
          Delete
        </button>
      )}
    </article>
  );
}

export default memo(TaskCard);