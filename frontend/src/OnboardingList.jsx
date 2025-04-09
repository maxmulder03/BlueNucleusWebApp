import React, { useState, useEffect } from "react"
import "./OnboardingList.css"
import ProgressWheel from "./ProgressWheel.jsx"

import { returnTaskCategoryGroups } from "./helper_functions/task_category.js"
import { postUserTask, putUserTask, getUserTask } from "./network/usertasks.js"
import Collapsable from "./components/Collapsable.jsx"

function OnboardingCell({ task, onClick }) {
  const [isComplete, setIsComplete] = useState(task?.completed ?? false)

  const handleButtonClick = () => {
    const userid = localStorage.getItem("uid")
    if (!userid) return console.log("no-user-id found")
    setIsComplete((prev) => !prev)
    onClick(task, !isComplete ? 1 : 0)
  }

  return (
    <td>
      <button
        className={`circle-checkbox ${isComplete ? "complete" : ""}`}
        onClick={handleButtonClick}
      >
        {isComplete ? "✔" : ""}
      </button>
      <Collapsable title={task?.taskTitle} description={task?.description} />
    </td>
  )
}

function OnboardingList() {
  const [onboardingTasks, setOnBoardingTasks] = useState([])
  const [AssignedUserTasks, setAssignedUserTasks] = useState([])
  const [userTask, setUserTask] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    console.log("fetching...", refreshTrigger)
    getUserTask(
      localStorage.getItem("uid"),
      (res) => {
        console.log("res", res)
        const groupT = returnTaskCategoryGroups(res.data)
        setUserTask(res)
        setAssignedUserTasks(res?.assignedUserTasks ?? [])
        setOnBoardingTasks(groupT)
      },
      (error) => console.log("getDetailUserTask Error", error),
    )
  }, [refreshTrigger])

  const onSubmit = (data, status) => {
    console.log("AssignedUserTasks before", AssignedUserTasks, userTask)
    // check if user has any assigned tasks
    // and make a put request else make a POST request

    if (userTask) {
      const findTask = AssignedUserTasks.find((t) => t.taskid === data.taskId)
      if (findTask) {
        AssignedUserTasks.map((item) => {
          if (item.taskid === data.taskId) item["completed"] = status
          return item
        })
        console.log("In find", AssignedUserTasks)
        const json = {
          id: userTask.id,
          taskids: JSON.stringify(AssignedUserTasks),
          userid: userTask.userid,
        }
        putUserTask(
          json,
          (data) => {
            console.log("put-user-task-success", data)
            setRefreshTrigger(refreshTrigger + 1)
          },
          (error) => console.log("put-user-task-error", error),
        )
      } else {
        const json = {
          id: userTask.id,
          taskids: JSON.stringify([
            ...AssignedUserTasks,
            {
              taskid: data.taskId,
              completed: status,
              is_active: data.taskIsActive,
            },
          ]),
          userid: userTask.userid,
        }
        putUserTask(
          json,
          (data) => {
            console.log("post-user-task-success", data)
            setRefreshTrigger(refreshTrigger + 1)
          },
          (error) => console.log("post-user-task-error", error),
        )
      }
    } else {
      const userid = localStorage.getItem("uid")
      if (!userid) return console.log("no-user-id found")
      const json = {
        taskids: JSON.stringify([
          {
            taskid: data.taskId,
            completed: status,
            is_active: data.taskIsActive,
          },
        ]),
        userid: localStorage.getItem("uid"),
      }
      postUserTask(
        json,
        (data) => {
          console.log("post-user-task-success", data)
          setRefreshTrigger(refreshTrigger + 1)
        },
        (error) => console.log("post-user-task-error", error),
      )
    }
  }

  const onboardList =
    onboardingTasks.length === 0 ? (
      <></>
    ) : (
      onboardingTasks.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.status && (
              <div className="onboarding-section-title">
                <h2> {item.name} </h2>

                <table>
                  <tbody>
                    {item.data.map((todo, ind) => {
                      return (
                        <tr key={ind}>
                          <OnboardingCell task={todo} onClick={onSubmit} />
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </React.Fragment>
        )
      })
    )

  return (
    <>
      <h1> Onboarding List </h1>
      {onboardList}
    </>
  )
}

export default OnboardingList
