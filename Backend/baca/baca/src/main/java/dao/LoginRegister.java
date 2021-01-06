package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

import model.LoginDetails;
import model.RegisterDetails;

@Repository("LoginRegister")
public class LoginRegister implements LoginRegisterInterface {

	private static Connection conn;

	public LoginRegister() throws ClassNotFoundException, SQLException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/baca", "root", "root");
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public int checkUser(LoginDetails credentials) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select iduser from user where user_name ='" + credentials.getUsername()
					+ "' and password='" + credentials.getPassword() + "';");
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public int findUser(String username) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from user where user_name ='" + username + "';");
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public boolean addUser(RegisterDetails credentials) {
		int userID = this.generateUserID();
		if (userID != -1) {
			try {
				Statement stmt = conn.createStatement();
				stmt.executeUpdate("insert into user (iduser, user_name, password, name, email) values ('" + userID
						+ "', '" + credentials.getUsername() + "', '" + credentials.getPassword() + "', '"
						+ credentials.getName() + "', '" + credentials.getEmail() + "');");
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return false;
	}

	private int generateUserID() {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select count(iduser) from user;");
			rs.next();
			return Integer.parseInt(rs.getString(1)) + 99;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

}
