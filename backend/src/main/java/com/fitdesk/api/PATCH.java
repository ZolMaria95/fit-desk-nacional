package com.fitdesk.api;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.ws.rs.HttpMethod;

/**
 * JAX-RS no define @PATCH (solo GET/POST/PUT/DELETE). Lo agregamos para poder
 * imitar el PATCH parcial de Firebase RTDB en los endpoints legacy de escritura
 * (p. ej. actualizar solo el `status` de una tarjeta).
 */
@Target({ ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@HttpMethod("PATCH")
public @interface PATCH {
}
