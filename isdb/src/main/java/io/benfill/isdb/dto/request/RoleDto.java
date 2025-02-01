package io.benfill.isdb.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class RoleDto {
	@NotBlank(message = "Role name is empty or null")
	@NotNull(message = "Role name is empty or null")
	private String roleName;
}
