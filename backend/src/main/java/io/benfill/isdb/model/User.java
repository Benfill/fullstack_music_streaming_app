package io.benfill.isdb.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	private String id;
	@NotBlank(message = "Name is required")
	@NotNull(message = "Name is required")
	private String name;

	@NotBlank(message = "Username is required")
	@NotNull(message = "Username is required")
	private String username;

	@NotBlank(message = "Password is required")
	@NotNull(message = "Password is required")
	private String password;

	private Boolean enable;

	@DBRef
	private Set<Role> roles = new HashSet<>();

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;
}
