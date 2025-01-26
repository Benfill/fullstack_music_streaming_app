package io.benfill.isdb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "io.benfill.isdb")
public class IsdbApplication {

	public static void main(String[] args) {
		SpringApplication.run(IsdbApplication.class, args);
	}

}
