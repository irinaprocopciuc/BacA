package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import dao.LoginRegisterInterface;
import model.LoginDetails;

@Service
public class LoginService {

	private final LoginRegisterInterface db;

	@Autowired
	public LoginService(@Qualifier("LoginRegister") LoginRegisterInterface db) {
		this.db = db;
	}

	public Boolean checkUser(LoginDetails credentials) {
		return db.checkUser(credentials);
	}
}
