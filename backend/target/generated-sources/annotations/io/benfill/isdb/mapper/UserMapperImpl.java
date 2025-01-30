package io.benfill.isdb.mapper;

import io.benfill.isdb.dto.request.UserDtoReq;
import io.benfill.isdb.dto.response.UserDtoResp;
import io.benfill.isdb.model.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-30T05:52:51+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDtoResp entityToDto(User entity) {
        if ( entity == null ) {
            return null;
        }

        UserDtoResp userDtoResp = new UserDtoResp();

        userDtoResp.setId( entity.getId() );
        userDtoResp.setCreatedAt( entity.getCreatedAt() );
        userDtoResp.setUpdatedAt( entity.getUpdatedAt() );
        userDtoResp.setName( entity.getName() );
        userDtoResp.setUsername( entity.getUsername() );
        userDtoResp.setEnable( entity.getEnable() );

        return userDtoResp;
    }

    @Override
    public List<UserDtoResp> entitiesToDtos(List<User> entities) {
        if ( entities == null ) {
            return null;
        }

        List<UserDtoResp> list = new ArrayList<UserDtoResp>( entities.size() );
        for ( User user : entities ) {
            list.add( entityToDto( user ) );
        }

        return list;
    }

    @Override
    public User DtoToentity(UserDtoReq dto) {
        if ( dto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.name( dto.getName() );
        user.username( dto.getUsername() );
        user.password( dto.getPassword() );

        return user.build();
    }
}
