package com.bluenucleus.service;

import org.springframework.data.jpa.repository.Query;

import com.bluenucleus.model.Task;
import com.bluenucleus.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.bluenucleus.dto.TaskCategoryDTO; // this can be import com.bluenucleus.model.TaskCategoryDTO;

@Service
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  public List<Task> getAllTasks() {
    return this.taskRepository.findAll();
  }

  public List<TaskCategoryDTO> getTaskCategoryDetails() {
    return taskRepository.findTaskCategoryDetails();
  }

  public Task getTaskById(int id) {
    return this.taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with ID: " + id));
  }

  public Task saveTask(Task task) {
    return this.taskRepository.save(task);
  }

  public Task updateTask(Task task) {
    Task existingTask = this.getTaskById(task.getId());
    
    existingTask.setTitle(task.getTitle());
    existingTask.setCategory(task.getCategory());
    existingTask.setDescription(task.getDescription());
    existingTask.setIsActive(task.getIsActive());
    return this.taskRepository.save(existingTask);
  }

  public void deleteTaskById(int id) {
    Task task = this.getTaskById(id);
    this.taskRepository.delete(task);
  }
}
