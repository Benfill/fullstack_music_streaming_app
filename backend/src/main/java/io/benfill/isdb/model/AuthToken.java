package io.benfill.isdb.model;

import java.util.Set;

import lombok.Builder;
import lombok.Data;

/**
 * Represents an authentication token.
 */
@Data
@Builder
public class AuthToken {
	private String name;
	private String username;
	private Set<Role> roles;

}