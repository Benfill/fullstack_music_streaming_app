package io.benfill.isdb.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import io.benfill.isdb.validation.ValidFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SongDtoReq {
    @NotBlank(message = "Song's title is required")
    @NotNull(message = "Song's title is required")
    private String title;

    @NotNull(message = "Song's duration is required")
    private Integer duration;

    @NotNull(message = "Song's number is required")
    private Integer number;

    @NotNull(message = "Album's id is required")
    private String albumId;

    @NotNull(message = "File cannot be null")
    @ValidFile
    private MultipartFile file;
}
