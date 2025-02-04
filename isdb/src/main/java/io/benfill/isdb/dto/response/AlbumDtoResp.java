package io.benfill.isdb.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import io.benfill.isdb.model.Song;
import lombok.Data;

@Data
public class AlbumDtoResp {
	private String Id;

	private String title;

	private String artist;

	private Integer year;

	private List<Song> songs;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
}
