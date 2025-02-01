package io.benfill.isdb.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileValidator implements ConstraintValidator<ValidFile, MultipartFile> {

	private static final long MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
	private static final String[] ALLOWED_CONTENT_TYPES = { "audio/mp3", "audio/wav", "audio/ogg" }; // Allowed file
																										// types

	@Override
	public void initialize(ValidFile constraintAnnotation) {
	}

	@Override
	public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
		if (file == null || file.isEmpty()) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate("File cannot be empty").addConstraintViolation();
			return false;
		}

		// Validate file size
		if (file.getSize() > MAX_FILE_SIZE) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate("File size must be less than 15 MB").addConstraintViolation();
			return false;
		}

		// Validate file type
		String contentType = file.getContentType();
		if (contentType == null || !isAllowedContentType(contentType)) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate("Invalid file type. Only MP3, OGG and WAV files are allowed")
					.addConstraintViolation();
			return false;
		}

		return true;
	}

	private boolean isAllowedContentType(String contentType) {
		for (String allowedType : ALLOWED_CONTENT_TYPES) {
			if (allowedType.equalsIgnoreCase(contentType)) {
				return true;
			}
		}
		return false;
	}
}