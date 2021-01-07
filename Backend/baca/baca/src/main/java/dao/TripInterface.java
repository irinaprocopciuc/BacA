package dao;

import java.util.List;
import java.util.Map;

import model.RegisterDetails;
import model.TripDetails;

public interface TripInterface {

	public List<Map<String, String>> getUserTrips(String userID);

	public Map<String, String> getTripDetails(String tripID);

	public int findTrip(String tripName);

	public boolean addTrip(TripDetails details);
	
	public boolean deleteTrip(String tripId);
}
