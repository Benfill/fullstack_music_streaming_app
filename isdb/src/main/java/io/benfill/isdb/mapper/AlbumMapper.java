package io.benfill.isdb.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import io.benfill.isdb.dto.request.AlbumDtoReq;
import io.benfill.isdb.dto.response.AlbumDtoResp;
import io.benfill.isdb.model.Album;

@Mapper(componentModel = "spring")
public interface AlbumMapper {
	AlbumDtoResp entityToDto(Album entity);

	List<AlbumDtoResp> entitiesToDtos(List<Album> entities);

	Album DtoToentity(AlbumDtoReq dto);
}
