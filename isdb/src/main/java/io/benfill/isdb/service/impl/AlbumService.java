package io.benfill.isdb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.AlbumDtoReq;
import io.benfill.isdb.dto.response.AlbumDtoResp;
import io.benfill.isdb.exception.ResourceNotFoundException;
import io.benfill.isdb.exception.ResourceValidationException;
import io.benfill.isdb.exception.SearchTypeException;
import io.benfill.isdb.mapper.AlbumMapper;
import io.benfill.isdb.model.Album;
import io.benfill.isdb.repository.AlbumRepository;
import io.benfill.isdb.repository.SongRepository;
import io.benfill.isdb.service.IAlbumService;

@Service
public class AlbumService implements IAlbumService {

    @Autowired
    private AlbumRepository repository;

    @Autowired
    private AlbumMapper mapper;

    @Autowired
    private SongRepository songRepository;

    @Override
    public Album getById(String id) {
	return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Album not found"));
    }

    @Override
    public List<AlbumDtoResp> getAll(Integer page) {
	int size = 3;
	Pageable pageable = PageRequest.of(page, size);
	List<Album> albums = repository.findAll(pageable).getContent();
	return mapper.entitiesToDtos(albums).stream().map(a -> {
	    a.setSongs(songRepository.findByAlbumId(a.getId()));
	    return a;
	}).collect(Collectors.toList());
    }

    @Override
    public AlbumDtoResp getDetails(String id) {
	Album album = getById(id);
	album.setSongs(songRepository.findByAlbumId(id));
	return mapper.entityToDto(album);
    }

    @Override
    public AlbumDtoResp create(AlbumDtoReq dto) {
	Album album = mapper.DtoToentity(dto);
	return mapper.entityToDto(repository.save(album));
    }

    @Override
    public AlbumDtoResp update(AlbumDtoReq dto, String id) {
	Album album = getById(id);

	album.setTitle(dto.getTitle());
	album.setArtist(dto.getArtist());
	album.setYear(dto.getYear());

	Album updatedAlbum = repository.save(album);
	return mapper.entityToDto(updatedAlbum);
    }

    @Override
    public void delete(String id) {
	Album album = getById(id);
	repository.delete(album);
    }

    @Override
    public List<AlbumDtoResp> search(String query, String type, Integer page) {
	if (query == null || query.trim().isEmpty()) {
	    throw new IllegalArgumentException("Search query cannot be null or empty");
	}
	List<Album> albums = null;
	int size = 3;
	Pageable pageable = PageRequest.of(page, size);

	if (type.equalsIgnoreCase("title")) {
	    albums = repository.findByTitleLike("%" + query + "%", pageable);
	} else if (type.equalsIgnoreCase("artist")) {
	    albums = repository.findByArtistLike("%" + query + "%", pageable);
	} else {
	    throw new SearchTypeException("type is incorrect");
	}

	return mapper.entitiesToDtos(albums);
    }

    @Override
    public List<AlbumDtoResp> sort(Integer year, Integer page) {
	if (year == null) {
	    throw new IllegalArgumentException("Year cannot be null");
	}
	int size = 3;
	Pageable pageable = PageRequest.of(page, size);
	List<Album> albums = repository.findByYear(year, pageable);
	if (albums.isEmpty()) {
	    throw new ResourceValidationException("There is no data related to this year: " + year);
	}
	return mapper.entitiesToDtos(albums);
    }

}
