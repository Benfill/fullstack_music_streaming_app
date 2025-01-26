package io.benfill.isdb.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.RoleDto;
import io.benfill.isdb.dto.response.UserDtoResp;
import io.benfill.isdb.exception.ResourceNotFoundException;
import io.benfill.isdb.mapper.UserMapper;
import io.benfill.isdb.model.Role;
import io.benfill.isdb.model.RoleEnum;
import io.benfill.isdb.model.User;
import io.benfill.isdb.repository.RoleRepository;
import io.benfill.isdb.repository.UserRepository;
import io.benfill.isdb.service.IUserService;

@Service
public class UserService implements IUserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserMapper mapper;

	@Override
	public User getById(String id) {
		return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
	}

	@Override
	public List<UserDtoResp> getAll(Integer page) {
		int size = 3;

		Pageable pageable = PageRequest.of(page, size);

		List<User> users = repository.findAll(pageable).getContent();
		return mapper.entitiesToDtos(users);
	}

	@Override
	public void assignRole(String id, RoleDto roleDto) {
		User user = getById(id);

		Role role = roleRepository.findByName(RoleEnum.valueOf("ROLE_" + roleDto.getRoleName().toUpperCase()))
				.orElseThrow(
						() -> new ResourceNotFoundException("Role Not Found With This Name: " + roleDto.getRoleName()));

		Optional<Role> checker = user.getRoles().stream().filter(r -> r.getName().equals(role.getName())).findFirst();
		if (checker.isPresent()) {
			throw new RuntimeException(
					"User: " + user.getName() + " already assgined with role " + roleDto.getRoleName());
		}

		user.getRoles().add(role);

		repository.save(user);
	}

}
