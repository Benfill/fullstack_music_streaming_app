package io.benfill.isdb.dto.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserDtoResp {
	private String id;
	private String name;
	private String username;
	private String password;
	private Boolean enable;
	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
}
