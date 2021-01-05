package model;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginDetails {

	 @NotBlank(message = "Username is blank")
	    private final String username;

	    @NotBlank(message = "Password is blank")
	    private final String password;

	    public LoginDetails(@JsonProperty("username") String username, @JsonProperty("password") String password) {
	        this.username = username;
	        this.password = password;
	    }

	    public String getUsername() {
	        return username;
	    }

	    public String getPassword() {
	        return password;
	    }
	    
}
