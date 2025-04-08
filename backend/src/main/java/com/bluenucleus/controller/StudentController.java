package com.bluenucleus.controller;

import com.bluenucleus.service.StudentService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bluenucleus.model.Student;
import com.bluenucleus.repository.StudentRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/students")
public class StudentController {

  private final StudentService studentService;
  private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  @PostMapping("/create")
  public ResponseEntity<Student> createStudent(@RequestBody Student student) {
    try {
      logger.info("CREATING USER WITH DATA {}", student);
      Student createdStudent = studentService.saveStudent(student);
      return new ResponseEntity<>(createdStudent, HttpStatus.CREATED); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @PutMapping("/update")
  public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
    try {
      logger.info("UPDATING USER WITH DATA {}", student);
      Student updatedStudent = studentService.updateStudent(student);
      return new ResponseEntity<>(updatedStudent, HttpStatus.OK); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get")
  public ResponseEntity<List<Student>> getStudents() {
    try {
      List<Student> students = studentService.getAllStudents();
      return new ResponseEntity<List<Student>>(students, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/getSingle/{id}")
  public ResponseEntity<Student> getStudent(@PathVariable int id) {
    try {
      Student student = studentService.getStudentById(id);
      return new ResponseEntity<>(student, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get/firstname")
  public ResponseEntity<List<Student>> getStudentByFirstName(@RequestParam(name="firstname", required=true) String firstname) {
    try {
      List<Student> students = studentService.getStudentByFirstName(firstname);
      logger.info("FETCHING STUDENT BASED ON FIRSTNAME {}", students);
      return new ResponseEntity<List<Student>>(students, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
    try {
      studentService.deleteStudentById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }
}
