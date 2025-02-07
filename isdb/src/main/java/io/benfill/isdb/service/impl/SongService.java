package io.benfill.isdb.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.tika.Tika;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;

import io.benfill.isdb.dto.request.SongDtoReq;
import io.benfill.isdb.dto.response.AudioResp;
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

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Override
    public Song getById(String id) {
	return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found"));
    }

    @Override
    public List<SongDtoResp> getAll(Integer page) {
	int size = 10;
	Pageable pageable = PageRequest.of(page, size);
	List<Song> songs = repository.findAll(pageable).getContent();
	List<SongDtoResp> dtos = mapper.entitiesToDtos(songs);

	return dtos.stream().map(s -> {
	    try {
		s.setContent(getSongFile(s.getFileId()));
		return s;
	    } catch (IOException e) {
		s.setContent(null);
		return s;
	    }
	}).collect(Collectors.toList());
    }

    @Override
    public SongDtoResp getDetails(String id) throws IllegalStateException, IOException {
	SongDtoResp dto = mapper.entityToDto(getById(id));
	dto.setContent(getSongFile(dto.getFileId()));
	return dto;
    }

    private String getFieldId(MultipartFile file) throws IOException {
	// Save the file to GridFS and return the file ID
	ObjectId fileId = gridFsTemplate.store(file.getInputStream(), // Input stream of the file
		file.getOriginalFilename(), // Original file name
		file.getContentType() // File content type (e.g., audio/mpeg)
	);
	return fileId.toString(); // Convert ObjectId to String
    }

    private InputStream getSongFile(String fileId) throws IllegalStateException, IOException {
	// Find the file in GridFS
	GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(fileId)));

	if (file == null) {
	    return null;
	}

	// Return the file as an InputStream
	return gridFsTemplate.getResource(file).getInputStream();
    }

    @Override
    public AudioResp playSong(String fileId) throws IOException {
	InputStream inputStream = getSongFile(fileId);

	if (inputStream == null) {
	    return null;
	}

	String fileFormat = new Tika().detect(inputStream);

	// Create InputStreamResource from the InputStream
	InputStreamResource resource = new InputStreamResource(inputStream);

	return AudioResp.builder().format(fileFormat).song(resource).build();
    }

    @Override
    public SongDtoResp create(SongDtoReq dto) throws IOException {

	MultipartFile file = dto.getFile();
	if (file == null || file.isEmpty()) {
	    throw new IllegalArgumentException("File cannot be empty");
	}

	Album album = albumService.getById(dto.getAlbumId());
	Song song = mapper.DtoToentity(dto);
	song.setAlbum(album);
	song.setFileId(getFieldId(file));

	Song savedSong = repository.save(song);
	SongDtoResp dtoResp = mapper.entityToDto(savedSong);
	dtoResp.setContent(getSongFile(dtoResp.getFileId()));
	return dtoResp;
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
