package dao;

import model.LoginDetails;
import model.RegisterDetails;

public interface LoginRegisterInterface {
	
	public int checkUser(LoginDetails details);
	public int findUser(String userame);
	public boolean addUser(RegisterDetails details);
	
}
