package api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.TripDetails;
import service.TripService;

@RequestMapping("/trip")
@RestController
public class TripController {

	private final TripService tripService;

	@Autowired
	public TripController(TripService tripService) {
		this.tripService = tripService;
	}

	@GetMapping(path = "/getTrips/userID={userID}")
	public ResponseEntity<String> getTrips(@PathVariable("userID") String userID) throws JsonProcessingException {
		Map<String, Object> map = new HashMap<>();
		if (userID.matches("\\d+")) {
			List<Map<String, String>> tripsList = tripService.getTrips(userID);
			map.put("status", HttpStatus.OK);
			map.put("code", "200");
			map.put("message", "Trips retrieved!");
			map.put("response", tripsList);
			return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
					HttpStatus.OK);
		} else {
			map.put("status", HttpStatus.METHOD_NOT_ALLOWED);
			map.put("code", "405");
			map.put("message", "Failed to retrive trips, user id incorrect!");
			map.put("response", "null");
			return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
					HttpStatus.METHOD_NOT_ALLOWED);
		}
	}

	@GetMapping(path = "/getTrip/tripID={tripID}")
	public ResponseEntity<String> getTripDetails(@PathVariable("tripID") String tripID) throws JsonProcessingException {
		Map<String, Object> map = new HashMap<>();
		if (tripID.matches("\\d+")) {
			Map<String, String> tripDetails = tripService.getTripDetails(tripID);
			if (tripDetails.containsKey("idtrip")) {
				map.put("status", HttpStatus.OK);
				map.put("code", "200");
				map.put("message", "Trip details retrieved!");
				map.put("response", tripDetails);
				return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
						HttpStatus.OK);
			} else {
				map.put("status", HttpStatus.NOT_FOUND);
				map.put("code", "404");
				map.put("message", "Trip details not found!");
				map.put("response", "");
				return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
						HttpStatus.OK);
			}
		} else {
			map.put("status", HttpStatus.METHOD_NOT_ALLOWED);
			map.put("code", "405");
			map.put("message", "Failed to retrive trip details, trip id incorrect!");
			map.put("response", "null");
			return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
					HttpStatus.METHOD_NOT_ALLOWED);
		}
	}

	@PostMapping(path = "/addTrip")
	public ResponseEntity<String> addTrip(@Valid @RequestBody TripDetails credentials, HttpServletResponse response)
			throws JsonProcessingException {

		Map<String, Object> map = new HashMap<>();

		if (!tripService.addTrip(credentials)) {
			map.put("status", HttpStatus.UNAUTHORIZED);
			map.put("code", "401");
			map.put("message", "Trip already exists!");
			return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
					HttpStatus.UNAUTHORIZED);
		} else {
			map.put("status", HttpStatus.OK);
			map.put("code", "200");
			map.put("message", "Trip added successful!");
			return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
					HttpStatus.OK);
		}
	}
	
	@DeleteMapping(value = "/deleteTrip/tripId={tripId}")
	public ResponseEntity<String> deteleTrip(@PathVariable("tripId") String tripId) throws JsonProcessingException {
		Map<String, Object> map = new HashMap<>();
		if (tripId.matches("\\d+")) {
			Boolean tripDeleteResponse = tripService.deleteTrip(tripId);
			if(tripDeleteResponse == true) {
				map.put("status", HttpStatus.OK);
				map.put("code", "200");
				map.put("message", "Trip deleted!");
				map.put("response", tripDeleteResponse);
				return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
						HttpStatus.OK);
			}else {
				map.put("status", HttpStatus.BAD_REQUEST);
				map.put("code", "400");
				map.put("message", "Trip not deleted!");
				map.put("response", tripDeleteResponse);
				return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
						HttpStatus.BAD_REQUEST);
			}
			
		} else {
			map.put("status", HttpStatus.METHOD_NOT_ALLOWED);
			map.put("code", "405");
			map.put("message", "Trip id incorrect!");
			map.put("response", "false");
			return new ResponseEntity<>(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(map),
					HttpStatus.METHOD_NOT_ALLOWED);
		}
	}

}
