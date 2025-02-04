package io.benfill.isdb.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.SongDtoReq;
import io.benfill.isdb.dto.response.SongDtoResp;
import io.benfill.isdb.exception.ResourceNotFoundException;
import io.benfill.isdb.mapper.SongMapper;
import io.benfill.isdb.model.Album;
import io.benfill.isdb.model.Song;
import io.benfill.isdb.repository.SongRepository;
import io.benfill.isdb.service.IAlbumService;
import io.benfill.isdb.service.ISongService;

@Service
public class SongService implements ISongService {

	@Autowired
	private SongRepository repository;
	@Autowired
	private SongMapper mapper;

	@Autowired
	private IAlbumService albumService;

	@Override
	public Song getById(String id) {
		return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found"));
	}

	@Override
	public List<SongDtoResp> getAll(Integer page) {
		int size = 3;
		Pageable pageable = PageRequest.of(page, size);
		List<Song> songs = repository.findAll(pageable).getContent();
		return mapper.entitiesToDtos(songs);
	}

	@Override
	public SongDtoResp getDetails(String id) {
		return mapper.entityToDto(getById(id));
	}

	@Override
	public SongDtoResp create(SongDtoReq dto) {
		Album album = albumService.getById(dto.getAlbumId());
		Song song = mapper.DtoToentity(dto);
		song.setAlbum(album);

		Song savedSong = repository.save(song);
		return mapper.entityToDto(savedSong);
	}

	@Override
	public SongDtoResp update(SongDtoReq dto, String id) {
		Song song = getById(id);
		Album album = albumService.getById(dto.getAlbumId());

		song.setTitle(dto.getTitle());
		song.setDuration(dto.getDuration());
		song.setNumber(dto.getNumber());
		song.setAlbum(album);

		return mapper.entityToDto(repository.save(song));
	}

	@Override
	public void delete(String id) {
		Song song = getById(id);

		repository.delete(song);
	}

	@Override
	public List<SongDtoResp> search(String query, Integer page) {
		if (query == null || query.trim().isEmpty()) {
			throw new IllegalArgumentException("Search query cannot be null or empty");
		}
		int size = 3;
		Pageable pageable = PageRequest.of(page, size);
		List<Song> songs = repository.findByTitleLike("%" + query + "%", pageable);
		return mapper.entitiesToDtos(songs);
	}

}
