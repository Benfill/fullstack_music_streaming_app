package io.benfill.isdb.mapper;

import io.benfill.isdb.dto.request.AlbumDtoReq;
import io.benfill.isdb.dto.response.AlbumDtoResp;
import io.benfill.isdb.model.Album;
import io.benfill.isdb.model.Song;
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
public class AlbumMapperImpl implements AlbumMapper {

    @Override
    public AlbumDtoResp entityToDto(Album entity) {
        if ( entity == null ) {
            return null;
        }

        AlbumDtoResp albumDtoResp = new AlbumDtoResp();

        albumDtoResp.setId( entity.getId() );
        albumDtoResp.setTitle( entity.getTitle() );
        albumDtoResp.setArtist( entity.getArtist() );
        albumDtoResp.setYear( entity.getYear() );
        List<Song> list = entity.getSongs();
        if ( list != null ) {
            albumDtoResp.setSongs( new ArrayList<Song>( list ) );
        }
        albumDtoResp.setCreatedAt( entity.getCreatedAt() );
        albumDtoResp.setUpdatedAt( entity.getUpdatedAt() );

        return albumDtoResp;
    }

    @Override
    public List<AlbumDtoResp> entitiesToDtos(List<Album> entities) {
        if ( entities == null ) {
            return null;
        }

        List<AlbumDtoResp> list = new ArrayList<AlbumDtoResp>( entities.size() );
        for ( Album album : entities ) {
            list.add( entityToDto( album ) );
        }

        return list;
    }

    @Override
    public Album DtoToentity(AlbumDtoReq dto) {
        if ( dto == null ) {
            return null;
        }

        Album.AlbumBuilder album = Album.builder();

        album.title( dto.getTitle() );
        album.artist( dto.getArtist() );
        album.year( dto.getYear() );

        return album.build();
    }
}
