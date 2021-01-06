package service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import dao.TripInterface;
import model.TripDetails;

@Service
public class TripService {

	private final TripInterface conn;

	@Autowired
	public TripService(@Qualifier("Trip") TripInterface connection) {
		this.conn = connection;
	}

	public List<Map<String, String>> getTrips(String userID) {
		return conn.getUserTrips(userID);
	}

	public Map<String, String> getTripDetails(String taskID) {
		return conn.getTripDetails(taskID);
	}
	
	 public boolean addTrip(TripDetails credentials){
	        if(conn.findTrip(credentials.getTripname())==-1){
	            return conn.addTrip(credentials);
	        }else{
	            return false;
	        }
	    }
}
