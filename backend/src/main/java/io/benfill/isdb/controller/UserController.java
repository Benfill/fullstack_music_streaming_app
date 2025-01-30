package io.benfill.isdb.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.benfill.isdb.dto.request.RoleDto;
import io.benfill.isdb.service.impl.UserService;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Secured("ROLE_ADMIN")
	@GetMapping
	public ResponseEntity<?> index(@RequestParam(defaultValue = "0", name = "page") Integer page) {
		return ResponseEntity.ok(userService.getAll(page));
	}

	@Secured("ROLE_ADMIN")
	@PatchMapping("/{id}/roles")
	public ResponseEntity<?> asssignRole(@PathVariable String id, @RequestBody @Valid RoleDto role) {
		userService.assignRole(id, role);

		return ResponseEntity.ok("User Assigned with Role " + role.getRoleName() + " Successfully");
	}
}
