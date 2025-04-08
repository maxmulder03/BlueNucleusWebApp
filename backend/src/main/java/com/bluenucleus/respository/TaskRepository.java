package com.bluenucleus.repository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.bluenucleus.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bluenucleus.dto.TaskCategoryDTO;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> { 
    @Query("SELECT new com.bluenucleus.dto.TaskCategoryDTO(c.id, c.title, c.isActive, t.description, t.id, t.isActive, t.title) " +
           "FROM Task t JOIN Category c ON t.category = c.id")

    List<TaskCategoryDTO> findTaskCategoryDetails();
}
