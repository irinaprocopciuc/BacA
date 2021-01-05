package api;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.LoginDetails;
import service.LoginService;

@RequestMapping(value = "/login")
@RestController
public class LoginController {

	private final LoginService loginService;
	
	@Autowired
	public LoginController(LoginService loginService) {
		this.loginService = loginService;
	}
	
	@PostMapping(path = "/checkUser")
	public ResponseEntity<String> login(@RequestBody LoginDetails loginInfo, HttpServletResponse r) throws JsonProcessingException {
		Map<String,Object> map = new HashMap<>();
		System.out.println(loginInfo.getUsername());
        Boolean resp = loginService.checkUser(loginInfo);
        if(resp == false){
            map.put("status", HttpStatus.UNAUTHORIZED);
            map.put("code", "401");
            map.put("message","Login failed, try again!");
            return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map), HttpStatus.UNAUTHORIZED);
        }else{
            map.put("status", HttpStatus.OK);
            map.put("code", "200");
            map.put("message","Login successful!");
            return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map), HttpStatus.OK);
        }
	}
}
