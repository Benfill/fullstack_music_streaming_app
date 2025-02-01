package io.benfill.isdb.service.impl;

import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.bson.types.ObjectId;

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
    private GridFsTemplate gridFsTemplate;

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
		// Validate the file
		MultipartFile file = dto.getFile();
		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("File cannot be empty");
		}

		// Process the album and song
		Album album = albumService.getById(dto.getAlbumId());
		Song song = mapper.DtoToentity(dto);
		song.setAlbum(album);

		// Save the file to GridFS and get the file ID
		String fileId = saveFileToGridFS(file);

		// Associate the file ID with the song entity
		song.setFileId(fileId);

		// Save the song entity to MongoDB
		Song savedSong = repository.save(song);

		// Return the response DTO
		return mapper.entityToDto(savedSong);
	}

	private String saveFileToGridFS(MultipartFile file) {
		try {
			// Save the file to GridFS and return the file ID
			ObjectId fileId = gridFsTemplate.store(file.getInputStream(), // Input stream of the file
					file.getOriginalFilename(), // Original file name
					file.getContentType() // File content type (e.g., audio/mpeg)
			);
			return fileId.toString(); // Convert ObjectId to String
		} catch (IOException e) {
			throw new RuntimeException("Failed to store file in GridFS", e);
		}
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
