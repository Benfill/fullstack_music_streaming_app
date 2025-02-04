package io.benfill.isdb.service;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import io.benfill.isdb.dto.request.SongDtoReq;
import io.benfill.isdb.dto.response.AudioResp;
import io.benfill.isdb.dto.response.SongDtoResp;
import io.benfill.isdb.model.Song;

@Service
public interface ISongService {

    Song getById(String id);

    List<SongDtoResp> getAll(Integer page) throws IllegalStateException, IOException;

    SongDtoResp getDetails(String id) throws IllegalStateException, IOException;

    SongDtoResp create(SongDtoReq dto) throws IOException;

    SongDtoResp update(SongDtoReq dto, String id);

    void delete(String id);

    List<SongDtoResp> search(String query, Integer page);

    AudioResp playSong(String fileId) throws IOException;

}
