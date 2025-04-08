package com.bluenucleus.controller;

import com.bluenucleus.service.UserTaskService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bluenucleus.model.UserTask;
import com.bluenucleus.repository.UserTaskRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import org.springframework.web.server.ResponseStatusException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.bluenucleus.model.UserTaskDetail;
import java.util.ArrayList;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import com.bluenucleus.service.TaskService;
import com.bluenucleus.dto.TaskCategoryDTO;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/usertasks")
public class UserTaskController {

  private final UserTaskService userTaskService;
  @Autowired
  private TaskService taskService;
  
  private static final Logger logger = LoggerFactory.getLogger(UserTaskController.class);

  public UserTaskController(UserTaskService userTaskService) {
    this.userTaskService = userTaskService;
  }

  @PostMapping("/create")
  public ResponseEntity<UserTask> createUserTask(@RequestBody UserTask userTask) {
    try {
      logger.info("CREATING USERTASK WITH DATA {}", userTask);
      UserTask createdUserTask = userTaskService.saveUserTask(userTask);
      return new ResponseEntity<>(createdUserTask, HttpStatus.CREATED); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @PutMapping("/update")
  public ResponseEntity<UserTask> updateUserTask(@RequestBody UserTask userTask) {
    try {
      logger.info("UPDATING USERTASK WITH DATA {}", userTask);
      UserTask updatedUserTask = userTaskService.updateUserTask(userTask);
      return new ResponseEntity<>(updatedUserTask, HttpStatus.OK); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get")
  public ResponseEntity<List<UserTask>> getUserTasks() {
    try {
      List<UserTask> userTasks = userTaskService.getAllUserTasks();
      return new ResponseEntity<List<UserTask>>(userTasks, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get/userid")
  public ResponseEntity<UserTask> getSingleUserTask(@RequestParam(name="userid", required=true) String userid) {
    try {
      UserTask userTask = userTaskService.getSingleUserTask(userid);
      logger.info("FETCHING USERTASK BASED ON userid {}", userTask);
      return new ResponseEntity<>(userTask, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get/tasks")
  public ResponseEntity<Map<String, Object>> getDetailUserTask(@RequestParam(name="userid", required=true) String userid) {
    try {
      UserTask userTask = userTaskService.getSingleUserTask(userid);

      if (userTask == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }

      if (userTask.getTaskids() != null && !userTask.getTaskids().isEmpty()) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
          List<UserTaskDetail> taskDetails = objectMapper.readValue(userTask.getTaskids(), objectMapper.getTypeFactory().constructCollectionType(List.class, UserTaskDetail.class));
          userTask.setTaskDetails(taskDetails);

        } catch (JsonProcessingException e) {
          e.printStackTrace();
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
      }

      if (userTask.getTaskDetails() == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      
      List<TaskCategoryDTO> taskCategoryDetails = taskService.getTaskCategoryDetails();

      List<Map<String, Object>> matchedData = new ArrayList<>();

      List<Integer> taskIdList = new ArrayList<>();

      for (UserTaskDetail taskDetail : userTask.getTaskDetails()) {
        for (TaskCategoryDTO taskCategory : taskCategoryDetails) {
          if (taskDetail.getTaskid() == taskCategory.getTaskId()) {
            Map<String, Object> combinedData = new HashMap<>();
            combinedData.put("categoryId", taskCategory.getCatId());
            combinedData.put("category", taskCategory.getCategory());
            combinedData.put("description", taskCategory.getDescription());
            combinedData.put("status", taskCategory.getStatus());
            combinedData.put("taskId", taskCategory.getTaskId());
            combinedData.put("taskIsActive", taskCategory.getTaskIsActive());
            combinedData.put("taskTitle", taskCategory.getTaskTitle());
            combinedData.put("completed", taskDetail.getCompleted());
            combinedData.put("is_active", taskDetail.getIsActive());

            matchedData.add(combinedData);

            taskIdList.add(taskCategory.getTaskId());
          }
        }
      }

      for (TaskCategoryDTO taskCategory : taskCategoryDetails) {
        if (!taskIdList.contains(taskCategory.getTaskId())){
          if(taskCategory.getTaskIsActive() == 1){
            Map<String, Object> objData = new HashMap<>();
            objData.put("categoryId", taskCategory.getCatId());
            objData.put("category", taskCategory.getCategory());
            objData.put("description", taskCategory.getDescription());
            objData.put("status", taskCategory.getStatus());
            objData.put("taskId", taskCategory.getTaskId());
            objData.put("taskIsActive", taskCategory.getTaskIsActive());
            objData.put("taskTitle", taskCategory.getTaskTitle());

            matchedData.add(objData);
          }
        }
      }

      Map<String, Object> response = new HashMap<>();
      response.put("id", userTask.getId());
      response.put("assignedUserTasks", userTask.getTaskDetails());
      response.put("userid", userTask.getUserid());
      response.put("data", matchedData);

      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/getSingle/{id}")
  public ResponseEntity<UserTask> getUserTask(@PathVariable int id) {
    try {
      UserTask userTask = userTaskService.getUserTaskById(id);
      return new ResponseEntity<>(userTask, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteUserTask(@PathVariable int id) {
    try {
      userTaskService.deleteUserTaskById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }
}
