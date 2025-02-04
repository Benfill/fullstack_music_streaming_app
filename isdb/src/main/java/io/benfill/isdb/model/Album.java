package io.benfill.isdb.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Document
@Getter
@Setter
@Builder
public class Album {

	@Id
	private String id;

	@NotBlank(message = "Album's title is required")
	@NotNull(message = "Album's title is required")
	@Field()
	private String title;

	@NotBlank(message = "Album's artist is required")
	@NotNull(message = "Album's artist is required")
	@Field()
	private String artist;

	@NotNull(message = "Album's year is required")
	@Field()
	private Integer year;

	@JsonManagedReference
	@DBRef
	private List<Song> songs;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

}
