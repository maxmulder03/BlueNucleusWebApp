package com.bluenucleus.controller;

import com.bluenucleus.service.CategoryService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bluenucleus.model.Category;
import com.bluenucleus.repository.CategoryRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

  private final CategoryService categoryService;
  private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @PostMapping("/create")
  public ResponseEntity<Category> createCategory(@RequestBody Category category) {
    try {
      logger.info("CREATING Category WITH DATA {}", category);
      Category createdCategory = categoryService.saveCategory(category);
      return new ResponseEntity<>(createdCategory, HttpStatus.CREATED); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @PutMapping("/update")
  public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
    try {
      logger.info("UPDATING CATEGORY WITH DATA {}", category);
      Category updatedCategory = categoryService.updateCategory(category);
      return new ResponseEntity<>(updatedCategory, HttpStatus.OK); 
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/get")
  public ResponseEntity<List<Category>> getCategories() {
    try {
      List<Category> categories = categoryService.getAllCategories();
      return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @GetMapping("/getSingle/{id}")
  public ResponseEntity<Category> getCategory(@PathVariable int id) {
    try {
      Category category = categoryService.getCategoryById(id);
      return new ResponseEntity<>(category, HttpStatus.OK);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
    try {
      categoryService.deleteCategoryById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (ResponseStatusException e) {
      throw e;
    }
  }
}
