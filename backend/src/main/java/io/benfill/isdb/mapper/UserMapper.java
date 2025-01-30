package io.benfill.isdb.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.benfill.isdb.dto.request.UserDtoReq;
import io.benfill.isdb.dto.response.UserDtoResp;
import io.benfill.isdb.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

	@Mapping(target = "id", source = "entity.id")
	@Mapping(target = "createdAt", source = "entity.createdAt")
	@Mapping(target = "updatedAt", source = "entity.updatedAt")
	UserDtoResp entityToDto(User entity);

	@Mapping(target = "id", source = "entity.id")
	@Mapping(target = "createdAt", source = "entity.createdAt")
	@Mapping(target = "updatedAt", source = "entity.updatedAt")
	List<UserDtoResp> entitiesToDtos(List<User> entities);

	User DtoToentity(UserDtoReq dto);

}
