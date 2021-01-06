package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import model.RegisterDetails;
import model.TripDetails;

@Repository("Trip")
public class Trip implements TripInterface {

	public static Connection conn;

	public Trip() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/baca", "root", "root");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Map<String, String>> getUserTrips(String userID) {
		List<Map<String, String>> tripsList = new ArrayList<>();
		if (userID.equals("-1")) {
			return tripsList;
		} else {
			try {
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(
						"select idtrip, tripName, destination, startDate, endDate, userId from trip where userId = "
								+ userID + ";");
				while (rs.next()) {
					Map<String, String> trip = new HashMap<>();
					trip.put("idtrip", rs.getString(1));
					trip.put("tripName", rs.getString(2));
					trip.put("destination", rs.getString(3));
					trip.put("startDate", rs.getString(4));
					trip.put("endDate", rs.getString(5));
					trip.put("userId", rs.getString(6));
					tripsList.add(trip);
				}
				return tripsList;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return tripsList;
	}

	@Override
	public Map<String, String> getTripDetails(String tripID) {
		Map<String, String> trip = new HashMap<>();

		if (tripID.equals("-1")) {
			return trip;
		} else {
			try {
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(
						"select idtrip, tripName, destination, startDate, endDate, userId from trip where idtrip = "
								+ tripID + ";");
				while (rs.next()) {
					trip = new HashMap<>();
					trip.put("idtrip", rs.getString(1));
					trip.put("tripName", rs.getString(2));
					trip.put("destination", rs.getString(3));
					trip.put("startDate", rs.getString(4));
					trip.put("endDate", rs.getString(5));
					trip.put("userId", rs.getString(6));
				}
				return trip;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return trip;
	}

	@Override
	public int findTrip(String tripName) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from trip where tripName ='" + tripName + "';");
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public boolean addTrip(TripDetails credentials) {
		int tripID = this.generateTripID();
		if (tripID != -1) {
			try {
				Statement stmt = conn.createStatement();
				stmt.executeUpdate(
						"insert into trip (idtrip, tripName, destination, startDate, endDate, userId) values ('"
								+ tripID + "', '" + credentials.getTripname() + "', '" + credentials.getDestination()
								+ "', '" + credentials.getStartDate() + "', '" + credentials.getEndDate() + "', '"
								+ credentials.getUserid() + "');");
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return false;
	}

	private int generateTripID() {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select count(idtrip) from trip;");
			rs.next();
			return Integer.parseInt(rs.getString(1)) + 99;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

}
