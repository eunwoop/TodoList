package com.luckytak.taskit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class TaskItController {
    private static Logger logger = LoggerFactory.getLogger(TaskItController.class.getCanonicalName());
    private final TaskItRepository repo;

    TaskItController(TaskItRepository repo) {
        this.repo = repo;
    }

    @GetMapping(value = "/task/{taskId}", produces = "application/json")
    public TaskEntity getTask(@PathVariable int taskId) {
        final Optional<TaskEntity> entity = repo.findById(taskId);
        if (entity.isPresent()) {
            return entity.get();
        } else {
            throw new NoSuchElementException("entity not found");
        }
    }

    @PostMapping(value = "/task", consumes = "application/json", produces = "application/json")
    public int createTask(@RequestBody TaskEntity entity) {
        if (entity.getCreatedBy() == null) {
            throw new IllegalArgumentException("createdBy should be provided");
        }
        if (entity.getText() == null || entity.getText().isEmpty()) {
            throw new IllegalArgumentException("text should be provided");
        }
        entity.setCreatedAt(new Date());
        return repo.save(entity).getId();
    }

    @GetMapping(value = "/task/all", produces = "application/json")
    public Iterable<TaskEntity> getTaskAll() {
        return repo.findAll();
    }

    @DeleteMapping(value = "/task/{taskId}")
    public void deleteTask(@PathVariable int taskId) {
        repo.deleteById(taskId);
    }

    @PatchMapping(value = "/task/{taskId}")
    public TaskEntity patchTask(@PathVariable int taskId, @RequestBody TaskEntity newEntity) {
        final Optional<TaskEntity> oldEntityOption = repo.findById(taskId);
        if (!oldEntityOption.isPresent()) {
            throw new NoSuchElementException("original entity not found");
        }
        final TaskEntity entity = oldEntityOption.get();
        if (newEntity.getText() != null) {
            entity.setText(newEntity.getText());
        }
        if (newEntity.getCompleted() != null) {
            entity.setCompleted(newEntity.getCompleted());
        }
        if (newEntity.getCreatedBy() != null) {
            entity.setCreatedBy(newEntity.getCreatedBy());
        }
        if (newEntity.getDueDate() != null) {
            entity.setDueDate(newEntity.getDueDate());
        }
        if (newEntity.getAssignee() != null) {
            entity.setAssignee(newEntity.getAssignee());
        }
        return repo.save(entity);
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public String login(@RequestBody LoginCredential cred) {
        if (cred.getPassword() == null) {
            throw new IllegalArgumentException("password null");
        }
        if (cred.getPassword().equals("taskit")) {
            return "success";
        }
        throw new UnauthorizedException("login cred invalid");
    }
}