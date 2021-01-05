package api;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.RegisterDetails;
import service.RegisterService;

@RequestMapping(value = "/register")
@RestController
public class RegisterController {

	private final RegisterService registerService;

	@Autowired
	public RegisterController(RegisterService registerService) {
		this.registerService = registerService;
	}

	
	@PostMapping(path = "/registerUser")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDetails credentials, HttpServletResponse response) throws JsonProcessingException {

        Map<String,Object> map = new HashMap<>();

        if(!credentials.getPassword().equals(credentials.getRePassword())){//passwords are not identical
            map.put("status",HttpStatus.UNAUTHORIZED);
            map.put("code", "401");
            map.put("message","Register failed, passwords do not match!");
            return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map), HttpStatus.UNAUTHORIZED);
        }else{
            if (!registerService.addUser(credentials)) {//user already exists
                map.put("status", HttpStatus.UNAUTHORIZED);
                map.put("code", "401");
                map.put("message", "Register failed, user already exists!");
                return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map), HttpStatus.UNAUTHORIZED);
            } else {
                map.put("status", HttpStatus.OK);
                map.put("code", "200");
                map.put("message", "Register successful!");
                return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map), HttpStatus.OK);
            }
        }
    }
}
