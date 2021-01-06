package api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ControllerAdvice
public class ErrorController {

	@ExceptionHandler(value = { MethodArgumentNotValidException.class })
	protected ResponseEntity<Object> methodArgumentNotValidException(MethodArgumentNotValidException e)
			throws JsonProcessingException {
		Map<String, Object> map = new HashMap<>();
		map.put("status", HttpStatus.BAD_REQUEST);
		map.put("code", "400");
		map.put("message", e.getBindingResult().getFieldError().getDefaultMessage());
		return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
				new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { HttpMessageNotReadableException.class })
	protected ResponseEntity<Object> httpMessageNotReadableException(HttpMessageNotReadableException e)
			throws JsonProcessingException {
		Map<String, Object> map = new HashMap<>();
		map.put("status", HttpStatus.BAD_REQUEST);
		map.put("code", "400");
		map.put("message", e.getMessage().substring(0, e.getMessage().indexOf('(') - 1));
		return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
				new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

}
