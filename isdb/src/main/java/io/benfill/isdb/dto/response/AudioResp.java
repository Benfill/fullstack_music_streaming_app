package io.benfill.isdb.dto.response;

import org.springframework.core.io.InputStreamResource;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AudioResp {
    private String format;
    private InputStreamResource song;

}
