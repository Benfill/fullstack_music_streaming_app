package io.benfill.isdb.dto.response;

import java.io.InputStream;
import java.time.LocalDateTime;

import io.benfill.isdb.model.Album;
import lombok.Data;

@Data
public class SongDtoResp {
    private String id;

    private String title;

    private Integer duration;

    private Integer number;

    private Album album;

    private String fileId;

    private InputStream content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
  
	private String ID;

	private String title;

	private Integer duration;

	private Integer number;

	private Album album;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
}
