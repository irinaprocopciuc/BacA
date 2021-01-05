package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import dao.LoginRegisterInterface;
import model.RegisterDetails;

@Service
public class RegisterService {

	 private final LoginRegisterInterface db;

	    @Autowired
	    public RegisterService(@Qualifier("LoginRegister") LoginRegisterInterface connection) {
	        this.db = connection;
	    }

	    public boolean addUser(RegisterDetails credentials){
	        if(db.findUser(credentials.getUsername())==-1){
	            return db.addUser(credentials);
	        }else{
	            return false;
	        }
	    }
	    
}
