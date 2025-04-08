package com.bluenucleus.model;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserTaskDetail {
    private int taskid;
    private int completed;
    @JsonProperty("is_active")
    private int is_active;

    public int getTaskid() {
        return taskid;
    }

    public void setTaskid(int taskid) {
        this.taskid = taskid;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    @JsonProperty("is_active")
    public int getIsActive() {
        return is_active;
    }

    @JsonProperty("is_active")
    public void setIsActive(int is_active) {
        this.is_active = is_active;
    }
}
