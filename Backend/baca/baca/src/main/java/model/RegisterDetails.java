package model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterDetails {
	@NotBlank(message = "Username is blank")
	private final String username;

	@NotBlank(message = "Password is blank")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Password is not valid")
	private final String password;

	@NotBlank(message = "Repassword is blank")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Repassword is not valid")
	private final String rePassword;

	@NotBlank(message = "Name is blank")
	private final String name;
	
	@NotBlank(message = "Email is blank")
	private final String email;

	public RegisterDetails(@JsonProperty("username") String username, @JsonProperty("password") String password, @JsonProperty("repassword") String rePassword, @JsonProperty("name") String name, @JsonProperty("email") String email) {
	        this.username = username;
	        this.password = password;
	        this.rePassword = rePassword;
	        this.name = name;
	        this.email = email;
	    }

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		System.out.println(password);
		return password;
	}

	public String getRePassword() {
		System.out.println(rePassword);
		return rePassword;
	}
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}
}
 