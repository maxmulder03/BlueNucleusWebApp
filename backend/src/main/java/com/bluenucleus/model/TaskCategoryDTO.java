package com.bluenucleus.dto;

public class TaskCategoryDTO {

    private int catId;
    private String category;
    private int status;
    private String description;
    private int taskId;
    private int taskIsActive;
    private String taskTitle;

    public TaskCategoryDTO(int catId, String category, int status, String description, 
                           int taskId, int taskIsActive, String taskTitle) {
        this.catId = catId;
        this.category = category;
        this.status = status;
        this.description = description;
        this.taskId = taskId;
        this.taskIsActive = taskIsActive;
        this.taskTitle = taskTitle;
    }

    // Getters and Setters
    public int getCatId() { return catId; }
    public void setCatId(int catId) { this.catId = catId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getTaskId() { return taskId; }
    public void setTaskId(int taskId) { this.taskId = taskId; }

    public int getTaskIsActive() { return taskIsActive; }
    public void setTaskIsActive(int taskIsActive) { this.taskIsActive = taskIsActive; }

    public String getTaskTitle() { return taskTitle; }
    public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }
}
