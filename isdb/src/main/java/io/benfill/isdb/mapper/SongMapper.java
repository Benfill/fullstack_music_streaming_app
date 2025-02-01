package io.benfill.isdb.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.benfill.isdb.dto.request.SongDtoReq;
import io.benfill.isdb.dto.response.SongDtoResp;
import io.benfill.isdb.model.Song;

@Mapper(componentModel = "spring")
public interface SongMapper {
	SongDtoResp entityToDto(Song entity);

	List<SongDtoResp> entitiesToDtos(List<Song> entities);

	Song DtoToentity(SongDtoReq dto);
}
