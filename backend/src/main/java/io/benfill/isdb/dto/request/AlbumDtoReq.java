package io.benfill.isdb.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class AlbumDtoReq {
	@NotBlank(message = "Album's title is required")
	@NotNull(message = "Album's title is required")

	private String title;

	@NotBlank(message = "Album's artist is required")
	@NotNull(message = "Album's artist is required")

	private String artist;

	@NotNull(message = "Album's year is required")

	private Integer year;
}
