package com.bluenucleus.service;

import org.springframework.data.jpa.repository.Query;

import com.bluenucleus.model.UserTask;
import com.bluenucleus.repository.UserTaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserTaskService {

  @Autowired
  private UserTaskRepository userTaskRepository;

  public UserTask getSingleUserTask(String userid) {
    return this.userTaskRepository.getSingleUserTask(userid);
  }

  public List<UserTask> getAllUserTasks() {
    return this.userTaskRepository.findAll();
  }

  public UserTask getUserTaskById(int id) {
    return this.userTaskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with ID: " + id));
  }

  public UserTask saveUserTask(UserTask usertask) {
    return this.userTaskRepository.save(usertask);
  }

  public UserTask updateUserTask(UserTask usertask) {
    UserTask existingUserTask = this.getUserTaskById(usertask.getId());
    
    existingUserTask.setTaskids(usertask.getTaskids());
    existingUserTask.setUserid(usertask.getUserid());
    return this.userTaskRepository.save(existingUserTask);
  }

  public void deleteUserTaskById(int id) {
    UserTask userTask = this.getUserTaskById(id);
    this.userTaskRepository.delete(userTask);
  }
}
