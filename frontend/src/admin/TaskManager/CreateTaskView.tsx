import React from "react";
import { useEffect, useRef, useState } from "react";
import { autocomplete } from "../../utils/autocomplete";

const tmpEmployeeNames = [
  "Max Mulder",
  "Matt Smith",
  "Jonathan Englesma",
  "Lucy Roop",
  "Hoan Lam",
];

type TextColor = "" | "text-[var(--green)]" | "text-[var(--red)]";

function CreateTaskView() {
  const assigneeInputRef = useRef<HTMLInputElement>(null);
  const [assigneeInput, setAssigneeInput] = useState<string>("");
  const [filteredNames, setFilteredNames] = useState<string[]>([]);

  const [attemptedAssignee, setAttemptedAssignee] = useState<boolean>(false);
  const [validInputColor, setValidInputColor] = useState<TextColor>("");

  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    autocomplete({
      superSet: tmpEmployeeNames,
      input: assigneeInput,
      setSubset: setFilteredNames,
      setSuggestion: setSuggestion,
    });
  }, [assigneeInput]);

  const handleAssigneeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && filteredNames.length > 0) {
      if (attemptedAssignee && tmpEmployeeNames.includes(assigneeInput)) {
        return;
      }
      e.preventDefault();
      setAssigneeInput(filteredNames[0]); // autocomplete with the first match
      setAttemptedAssignee(true);
      // Optionally move cursor to end of text
      requestAnimationFrame(() => {
        const input = assigneeInputRef.current;
        if (input) {
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }
  };

  useEffect(() => {
    if (!attemptedAssignee) {
      setValidInputColor("");
    } else if (tmpEmployeeNames.includes(assigneeInput)) {
      setValidInputColor("text-[var(--green)]");
    } else {
      setValidInputColor("text-[var(--red)]");
    }
  }, [attemptedAssignee, assigneeInput]);

  return (
    <div>
      <form className="flex flex-col gap-2 m-2">
        <label htmlFor="assignee">
          Assignee:
          <input
            type="text"
            placeholder="Assignee"
            id="assignee"
            ref={assigneeInputRef}
            onChange={(e) => setAssigneeInput(e.target.value)}
            onKeyDown={handleAssigneeKeyDown}
            onBlur={() => setAttemptedAssignee(true)}
            className={`w-fit ${validInputColor}`}
            value={assigneeInput}
          ></input>
        </label>
        <label htmlFor="taskName">
          Task Name:
          <input
            type="text"
            placeholder="Task Name"
            className="w-fit"
            id="taskName"
          />
        </label>
        <label htmlFor="description">Description: </label>
        <textarea
          type="text"
          placeholder="Description"
          className="w-[50%] h-[50pt] bg-[var(--background1)] focus:outline-none"
          id="description"
        />
      </form>
    </div>
  );
}

export default CreateTaskView;
/* TODO: Need to create a submit button when the user is done creating the task
Also, where should the submit button take the user once submitted? */
