import { useState, useCallback } from "react";

interface Task {
  title: string;
  description?: string;
  category: string;
  completed: boolean;
}

interface OnboardingItemProps {
  task: Task;
  setTotalCompleted: (completed: boolean) => void;
}

function OnboardingItem({ task, setTotalCompleted }: OnboardingItemProps) {
  const [completed, setCompleted] = useState(task.completed);

  const updateCompleted = () => {
    setTotalCompleted(completed);
    setCompleted(!completed);
  };

  return (
    <div
      box-="round"
      variant-={completed ? "green" : "background1"}
      className={`m-0 pl-5 ${completed ? "text-[var(--green)]" : "text-[var(--foreground1)]"
        }`}
    >
      <div onClick={() => updateCompleted()}>
        {" "}
        [{completed ? "X" : " "}] {task.title}{" "}
      </div>
    </div>
  );
}

function OnboardingPage() {
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "Complete intro to React Course",
      category: "Technical Onboarding",
      completed: false,
    },
    {
      title: "Take picture for team website",
      category: "General",
      completed: false,
    },
    {
      title: "Create Personal Website",
      description: "Create a directory to share files.",
      category: "Technical Onboarding",
      completed: false,
    },
    {
      title: "Make a pull request to the BlueNucleusWebApp repo",
      description:
        "Pick an issue that's marked as 'good first issue', implement the solution, and submit a pull request.",
      category: "Technical Onboarding",
      completed: false,
    },
    {
      title: "Reach out to Jonathan for Key card access",
      category: "General",
      completed: false,
    },
  ]);

  const onUpdate = useCallback(
    (completed: boolean) => {
      if (completed) {
        setTotalCompleted(totalCompleted - 1);
      } else {
        setTotalCompleted(totalCompleted + 1);
      }
    },
    [totalCompleted],
  );
  return (
    <div className="w-[80%] pl-4">
      <h1 className="pt-8 pl-2">
        {" "}
        Onboarding Tasks{" "}
        <span className="text-[var(--yellow)]">
          {"(" + totalCompleted + "/5)"}
        </span>
      </h1>
      {tasks.map((task, index) => (
        <OnboardingItem setTotalCompleted={onUpdate} key={index} task={task} />
      ))}
    </div>
  );
}

export default OnboardingPage;
