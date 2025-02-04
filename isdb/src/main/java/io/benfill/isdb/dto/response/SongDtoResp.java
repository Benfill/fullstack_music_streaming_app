package io.benfill.isdb.dto.response;

import java.time.LocalDateTime;

import io.benfill.isdb.model.Album;
import lombok.Data;

@Data
public class SongDtoResp {
	private String ID;

	private String title;

	private Integer duration;

	private Integer number;

	private Album album;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
}
