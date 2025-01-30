package io.benfill.isdb.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UserDtoReq {
	@NotBlank(message = "Name is required")
	@NotNull(message = "Name is required")
	private String name;

	@NotBlank(message = "Username is required")
	@NotNull(message = "Username is required")
	private String username;

	@NotBlank(message = "Password is required")
	@NotNull(message = "Password is required")
	private String password;
}
