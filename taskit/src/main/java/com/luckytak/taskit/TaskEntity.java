package com.luckytak.taskit;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@ToString
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class TaskEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String text;

    @JsonProperty(value = "isCompleted")
    @Column(nullable = false)
    private Boolean completed;

    @JsonProperty(value = "createdBy")
    @Column(nullable = false)
    private String createdBy;

    @JsonProperty(value = "createdAt")
    @Column(nullable = false)
    private Date createdAt;

    @JsonProperty(value = "dueDate")
    private Date dueDate;

    @JsonProperty(value = "assignee")
    private String assignee;

    public TaskEntity() {
        this.completed = false;
        this.dueDate = null;
        this.assignee = null;
    }
}
