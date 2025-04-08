package com.bluenucleus.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name="title", nullable = false)
  private String title;

  @Column(nullable = false)
  private int category;

  @Column(nullable = false)
  private String description;

  @Column(name="is_active", nullable = false)
  private int isActive;

}
