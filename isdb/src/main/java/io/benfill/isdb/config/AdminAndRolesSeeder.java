package io.benfill.isdb.config;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import io.benfill.isdb.model.Role;
import io.benfill.isdb.model.RoleEnum;
import io.benfill.isdb.model.User;
import io.benfill.isdb.repository.RoleRepository;
import io.benfill.isdb.repository.UserRepository;

@Component
public class AdminAndRolesSeeder implements ApplicationRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private Set<Role> roles = new HashSet<Role>();

	private void rolesInitializr() {
		Optional<Role> adminOptional = roleRepository.findByName(RoleEnum.ROLE_ADMIN);
		Optional<Role> userOptional = roleRepository.findByName(RoleEnum.ROLE_USER);

		if (!adminOptional.isPresent()) {
			Role adminRole = Role.builder().name(RoleEnum.ROLE_ADMIN).build();
			roles.add(roleRepository.save(adminRole));
		}

		if (!userOptional.isPresent()) {
			Role userRole = Role.builder().name(RoleEnum.ROLE_USER).build();
			roleRepository.save(userRole);
		}

	}

	private void adminInitializr() {
		Optional<User> optional = userRepository.findByUsername("admin");

		if (!optional.isPresent()) {
			String encodedPassword = passwordEncoder.encode("password");
			User admin = User.builder().name("admin").password(encodedPassword).roles(roles).username("admin")
					.enable(true).build();
			userRepository.save(admin);
		}

	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		rolesInitializr();
		adminInitializr();

	}

}
