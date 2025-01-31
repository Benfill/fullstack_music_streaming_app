package io.benfill.isdb.mapper;

import io.benfill.isdb.dto.request.SongDtoReq;
import io.benfill.isdb.dto.response.SongDtoResp;
import io.benfill.isdb.model.Song;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-31T12:51:36+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class SongMapperImpl implements SongMapper {

    @Override
    public SongDtoResp entityToDto(Song entity) {
        if ( entity == null ) {
            return null;
        }

        SongDtoResp songDtoResp = new SongDtoResp();

        songDtoResp.setTitle( entity.getTitle() );
        songDtoResp.setDuration( entity.getDuration() );
        songDtoResp.setNumber( entity.getNumber() );
        songDtoResp.setAlbum( entity.getAlbum() );
        songDtoResp.setCreatedAt( entity.getCreatedAt() );
        songDtoResp.setUpdatedAt( entity.getUpdatedAt() );

        return songDtoResp;
    }

    @Override
    public List<SongDtoResp> entitiesToDtos(List<Song> entities) {
        if ( entities == null ) {
            return null;
        }

        List<SongDtoResp> list = new ArrayList<SongDtoResp>( entities.size() );
        for ( Song song : entities ) {
            list.add( entityToDto( song ) );
        }

        return list;
    }

    @Override
    public Song DtoToentity(SongDtoReq dto) {
        if ( dto == null ) {
            return null;
        }

        Song.SongBuilder song = Song.builder();

        song.title( dto.getTitle() );
        song.duration( dto.getDuration() );
        song.number( dto.getNumber() );

        return song.build();
    }
}
