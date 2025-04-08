package com.bluenucleus.repository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.bluenucleus.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, Integer> { 
    @Query("SELECT u FROM UserTask u WHERE u.userid = :userid")
    UserTask getSingleUserTask(String userid);
}
