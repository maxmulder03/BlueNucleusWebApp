package com.bluenucleus.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "usertasks")
@Data
public class UserTask {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(nullable = false)
  private String userid;

  @Column(nullable = false)
  private String taskids;

  @Transient
  private List<UserTaskDetail> taskDetails;

  public List<UserTaskDetail> getTaskDetails() {
    return taskDetails;
  }

  public void setTaskDetails(List<UserTaskDetail> taskDetails) {
    this.taskDetails = taskDetails;
  }

}
