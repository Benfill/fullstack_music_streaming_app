package io.benfill.isdb.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.benfill.isdb.model.Role;
import io.benfill.isdb.model.RoleEnum;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
	Optional<Role> findByName(RoleEnum name);
}
