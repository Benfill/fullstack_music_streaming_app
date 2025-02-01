package io.benfill.isdb.model;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Document
@Getter
@Setter
@Builder
public class Song {
	@Id
	private String id;

	@NotBlank(message = "Song's title is required")
	@NotNull(message = "Song's title is required")
	@Field()
	private String title;

	@NotNull(message = "Song's duration is required")
	@Field()
	private Integer duration;

	@NotNull(message = "Song's number is required")
	@Field()
	private Integer number;

	@JsonBackReference
	@Field()
	@DBRef
	private Album album;

	@Field()
	private String fileId;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;
}
