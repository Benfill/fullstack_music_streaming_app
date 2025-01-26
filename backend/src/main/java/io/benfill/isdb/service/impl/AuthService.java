package io.benfill.isdb.service.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.LoginDto;
import io.benfill.isdb.dto.request.UserDtoReq;
import io.benfill.isdb.dto.response.UserDtoResp;
import io.benfill.isdb.exception.CustomDuplicateKeyException;
import io.benfill.isdb.exception.ResourceNotFoundException;
import io.benfill.isdb.mapper.UserMapper;
import io.benfill.isdb.model.AuthToken;
import io.benfill.isdb.model.Role;
import io.benfill.isdb.model.RoleEnum;
import io.benfill.isdb.model.User;
import io.benfill.isdb.repository.RoleRepository;
import io.benfill.isdb.repository.UserRepository;
import io.benfill.isdb.security.jwt.TokenProvider;
import io.benfill.isdb.service.IAuthService;

@Service
public class AuthService implements IAuthService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private TokenProvider jwtUtil;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UserMapper mapper;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public UserDtoResp registerHandler(UserDtoReq dto) {

		Optional<User> existingUser = userRepo.findByUsername(dto.getUsername());

		if (existingUser.isPresent()) {
			throw new CustomDuplicateKeyException();
		}

		String encodedPass = passwordEncoder.encode(dto.getPassword());

		User user = mapper.DtoToentity(dto);
		user.setPassword(encodedPass);

		// Add default USER role
		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Default role not found"));
		roles.add(userRole);
		user.setRoles(roles);
		user.setEnable(true);

		user = userRepo.save(user);

		return mapper.entityToDto(user);
	}

	@Override
	public AuthToken loginHandler(LoginDto body, HttpServletResponse resp) {
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));

		User savedUser = userRepo.findByUsername(body.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

		if (!encoder.matches(body.getPassword(), savedUser.getPassword())) {
			throw new RuntimeException("Password is wrong");
		}

		org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
				savedUser.getUsername(), savedUser.getPassword(), savedUser.getRoles().stream()
						.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtUtil.generateToken(userDetails);

		Cookie jwtCookie = new Cookie("Authorization", token);

		jwtCookie.setHttpOnly(true);
		jwtCookie.setSecure(true);
		jwtCookie.setPath("/");
		jwtCookie.setMaxAge(7 * 24 * 60 * 60);

		resp.addCookie(jwtCookie);

		// Optionally, send some additional response if needed zs
		resp.setStatus(HttpServletResponse.SC_OK);
		resp.addCookie(jwtCookie);

		return AuthToken.builder().name(savedUser.getName()).username(savedUser.getUsername())
				.roles(savedUser.getRoles()).build();
	}

}
