package io.benfill.isdb.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
@EnableMongoRepositories(basePackages = "io.benfill.isdb.repository")
public class MongoConfig {

	@Value("${spring.data.mongodb.uri:mongodb://localhost:27017}")
	private String mongoUri;

	@Value("${spring.data.mongodb.database:isdb}")
	private String databaseName;

	@Lazy
	@Autowired
	private MappingMongoConverter mongoConverter; // Autowired to use in GridFsTemplate

	@Bean
	public MongoClient mongoClient() {
		return MongoClients.create(mongoUri);
	}

	@Bean
	public MongoTemplate mongoTemplate() {
		return new MongoTemplate(mongoClient(), databaseName);
	}

	@Bean
	public GridFsTemplate gridFsTemplate() throws Exception {
		return new GridFsTemplate(mongoTemplate().getMongoDbFactory(), mongoConverter);
	}
}