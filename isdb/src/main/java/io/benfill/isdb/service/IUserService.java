package io.benfill.isdb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.RoleDto;
import io.benfill.isdb.dto.response.UserDtoResp;
import io.benfill.isdb.model.User;

@Service
public interface IUserService {
	User getById(String id);

	List<UserDtoResp> getAll(Integer page);

	void assignRole(String id, RoleDto role);

}
