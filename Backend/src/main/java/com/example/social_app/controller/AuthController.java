package com.example.social_app.controller;

import com.example.social_app.model.User;
import com.example.social_app.repository.UserRepository;
import com.example.social_app.service.UserService;
import com.example.social_app.dto.UserDetailsResponse;
import com.example.social_app.security.JwtUtil;
import com.example.social_app.dto.LoginRequest;
import com.example.social_app.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;
	
		// Register a new user
	@PostMapping("/register")
	
	public String register(@RequestBody User user) {
		userService.registerUser(user);
		return "User registered successfully";
	}
	
		//login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		Optional<User> user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
		
		if(user.isPresent()) {
			String token = jwtUtil.generateToken(user.get().getUsername());
			return ResponseEntity.ok(new LoginResponse("Login successful", token));
		} else {
			return ResponseEntity.status(401).body("Invalid username or password");
		}
	}
		//change password
	@PostMapping("/changePasswordJson")
	public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {
		String username = payload.get("username");
		String newPassword = payload.get("newPassword");
		
		String message = userService.changePassword(username, newPassword);
		return ResponseEntity.ok(message);
	}
	
		//user details
	@GetMapping("/userDetails")
	public ResponseEntity<UserDetailsResponse> userDetails(Authentication authentication) {
		String username = authentication.getName();
		UserDetailsResponse userDetails = userService.getUserDetails(username);
		
		if (userDetails == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(userDetails);
	}
	
		// delete account
	@DeleteMapping("/deleteAccount/{userId}")
	public ResponseEntity<String> deleteAccount(@PathVariable long userId,
			Authentication authentication) {
		String currentUsername = authentication.getName();
		
		User user = userRepository.findById(userId).orElse(null);
		if(user == null) {
			return ResponseEntity.notFound().build();
		}
		
		if(!user.getUsername().equals(currentUsername)) {
			return ResponseEntity.status(403).body("You are not authorized to delete this account");
		}
		
		userService.deleteUser(userId);
		return ResponseEntity.ok("Account deleted successfully");
	}
}

