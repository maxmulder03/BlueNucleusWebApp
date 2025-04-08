package com.bluenucleus.repository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.bluenucleus.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> { 
    @Query("SELECT s FROM Student s WHERE s.firstname = :firstname")
    List<Student> getStudentByFirstName(String firstname);
}
