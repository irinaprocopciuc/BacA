package dao;

import model.LoginDetails;
import model.RegisterDetails;

public interface LoginRegisterInterface {
	
	public Boolean checkUser(LoginDetails details);
	public int findUser(String userame);
	public boolean addUser(RegisterDetails details);
	
}
