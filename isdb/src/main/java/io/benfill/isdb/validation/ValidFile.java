package io.benfill.isdb.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.FIELD }) // This annotation can be applied to fields
@Retention(RetentionPolicy.RUNTIME) // This annotation is available at runtime
@Constraint(validatedBy = FileValidator.class) // The validator class for this annotation
public @interface ValidFile {
    String message() default "Invalid file"; // Default error message

    Class<?>[] groups() default {}; // Groups for validation (optional)

    Class<? extends Payload>[] payload() default {}; // Payload for validation (optional)
}