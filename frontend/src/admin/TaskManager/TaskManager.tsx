import { useState } from "react";
import PreviewTaskView from "./PreviewTaskView";
import CreateTaskView from "./CreateTaskView";
import EditTaskView from "./EditTaskView";

const taskComponentMap = {
  view: PreviewTaskView,
  create: CreateTaskView,
  edit: EditTaskView,
} as const;

type TaskViews = keyof typeof taskComponentMap;

function TaskManager() {
  const [taskView, setTaskView] = useState<TaskViews>("view");

  return (
    <>
      <div box-="round" shear-="top" className="mt-4">
        <div is-="badge" variant-="background0">
          Employee Tasks
        </div>
        <TaskManagerMenu onViewUpdate={setTaskView} />
        <ActiveTaskView taskView={taskView} />
      </div>
    </>
  );
}

function ActiveTaskView({ taskView }: { taskView: TaskViews }) {
  const Component = taskComponentMap[taskView];
  return <Component />;
}

interface TaskManagerMenuProps {
  onViewUpdate: (view: TaskViews) => void;
}

function TaskManagerMenu({ onViewUpdate }: TaskManagerMenuProps) {
  return (
    <div box-="square" className="flex flex-row justify-start mb-1 gap-2">
      {Object.keys(taskComponentMap).map((view) => (
        <button
          key={view}
          is-="button"
          size-="small"
          variant-="background3"
          className="first:ml-1"
          onClick={() => onViewUpdate(view)}
        >
          {view}
        </button>
      ))}
    </div>
  );
}

export default TaskManager;
