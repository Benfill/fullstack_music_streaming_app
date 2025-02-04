package io.benfill.isdb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.AlbumDtoReq;
import io.benfill.isdb.dto.response.AlbumDtoResp;
import io.benfill.isdb.model.Album;

@Service
public interface IAlbumService {

	Album getById(String id);

	List<AlbumDtoResp> getAll(Integer page);

	AlbumDtoResp getDetails(String id);

	AlbumDtoResp create(AlbumDtoReq dto);

	AlbumDtoResp update(AlbumDtoReq dto, String id);

	void delete(String id);

	List<AlbumDtoResp> search(String query, String type, Integer page);

	List<AlbumDtoResp> sort(Integer year, Integer page);
}
