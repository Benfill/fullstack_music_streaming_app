package io.benfill.isdb.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileValidator implements ConstraintValidator<ValidFile, MultipartFile> {

    @Value("${app.max-file-size}") // 10 MB in bytes
    private long maxFileSize;

    private static final String[] ALLOWED_CONTENT_TYPES = { "audio/mpeg", // MP3
	    "audio/wav", // WAV
	    "audio/ogg" // OGG
    };

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
	if (file.getSize() > maxFileSize) {
	    context.disableDefaultConstraintViolation();
	    context.buildConstraintViolationWithTemplate("File size must be less than 10 MB").addConstraintViolation();
	    return false;
	}

	// Validate file type
	String contentType = file.getContentType();
	if (contentType == null || !isAllowedContentType(contentType)) {
	    context.disableDefaultConstraintViolation();
	    context.buildConstraintViolationWithTemplate("Invalid file type. Only MP3, WAV, and OGG files are allowed")
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