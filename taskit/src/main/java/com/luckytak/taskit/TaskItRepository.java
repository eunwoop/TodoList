package com.luckytak.taskit;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskItRepository extends CrudRepository<TaskEntity, Integer> {
}