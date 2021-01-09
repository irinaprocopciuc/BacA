package model;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TripDetails {

	@NotBlank(message = "Trip name is blank")
	private final String tripName;
	
	@NotBlank(message = "Destination is blank")
	private final String startingPoint;

	@NotBlank(message = "Destination is blank")
	private final String destination;

	@NotBlank(message = "Start date is blank")
	private final String startDate;

	@NotBlank(message = "End date is blank")
	private final String endDate;

	@NotBlank(message = "User id is blank")
	private final String userId;

	public TripDetails(@JsonProperty("tripName") String tripName, @JsonProperty("startingPoint") String startingPoint, @JsonProperty("destination") String destination,
			@JsonProperty("startDate") String startDate, @JsonProperty("endDate") String endDate,
			@JsonProperty("userId") String userId) {
		this.tripName = tripName;
		this.startingPoint = startingPoint;
		this.destination = destination;
		this.startDate = startDate;
		this.endDate = endDate;
		this.userId = userId;
	}
	
	public String getTripname() {
		return tripName;
	}
	
	public String getStartingPoint() {
		return startingPoint;
	}
	
	public String getDestination() {
		return destination;
	}
	
	public String getStartDate() {
		return startDate;
	}
	
	public String getEndDate() {
		return endDate;
	}
	
	public String getUserid() {
		return userId;
	}
}
