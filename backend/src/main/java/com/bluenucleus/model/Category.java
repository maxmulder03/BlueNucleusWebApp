package com.bluenucleus.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "category")
@Data
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name="title", nullable = false)
  private String title;

  @Column(name="is_active", nullable = false)
  private int isActive;

}
