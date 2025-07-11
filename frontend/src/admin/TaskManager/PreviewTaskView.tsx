import { useState } from "react";

function ViewTask() {
  const [focused, setFocused] = useState<string>("");

  const exampleEmployeeNames = {
    "": [], // TODO: Remove & fix error handling of when focused is not set.
    "Max Mulder": [
      { taskName: "Task 1", completed: false },
      { taskName: "Task 2", completed: true },
    ],
    "Matt Smith": [
      { taskName: "Task 1", completed: false },
      { taskName: "Task 2", completed: true },
      { taskName: "Task 3", completed: false },
    ],
    "Jonathan Englesma": [
      { taskName: "Task 1", completed: false },
      { taskName: "Task 2", completed: true },
      { taskName: "Task 3", completed: true },
      { taskName: "Task 4", completed: false },
    ],
    "Lucy Roop": [
      { taskName: "Task 1", completed: false },
      { taskName: "Task 2", completed: true },
    ],
    "Hoan Lam": [
      { taskName: "Task 1", completed: false },
      { taskName: "Task 2", completed: true },
      { taskName: "Task 3", completed: false },
      { taskName: "Task 4", completed: false },
      { taskName: "Task 5", completed: false },
      { taskName: "Task 6", completed: true },
      { taskName: "Task 7", completed: true },
      { taskName: "Task 8", completed: true },
    ],
  };

  const onFocusChange = (name: string | null) => {
    return name === focused ? "" : name;
  };

  return (
    <div className="ml-3 mr-3 pb-2">
      {/* TODO: update focused to clear when user clicks away from component */}
      <div className="grid grid-cols-[1fr_4fr] gap-2 pl-2">
        <div className="border-r-[0.2ch] border-[var(--background2)]">
          {Object.keys(exampleEmployeeNames).map((name) => (
            <div key={name} className="flex flex-row justify-start p-2">
              {/* TODO: clickable div is bad practive, switch to button & override webtui button styles */}
              <div
                onClick={() => {
                  setFocused(onFocusChange(name));
                }}
                className={
                  focused === name
                    ? "text-[var(--green)]"
                    : focused === ""
                      ? ""
                      : "text-[var(--foreground2)]"
                }
              >
                {" "}
                {name}
              </div>
            </div>
          ))}
        </div>
        <div className="">
          {exampleEmployeeNames[focused].map((task) => (
            <div
              key={task.taskName}
              className="flex flex-row justify-start p-2 gap-2"
            >
              <div
                className={`
                  pr-4 justify-self-end ${task.completed ? "text-[var(--green)]" : "text-[var(--red)]"}`}
              >
                {task.completed ? "[X]" : "[#]"}
              </div>
              <div
                className={
                  task.completed ? "text-[var(--green)]" : "text-[var(--red)]"
                }
              >
                {task.taskName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
