package io.benfill.isdb.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.benfill.isdb.model.Album;

@Repository
public interface AlbumRepository extends MongoRepository<Album, String> {
	List<Album> findByTitleLike(String title, Pageable pageable);

	List<Album> findByArtistLike(String artist, Pageable pageable);

	List<Album> findByYear(Integer year, Pageable pageable);
}
