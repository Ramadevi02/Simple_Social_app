package com.example.social_app.controller;

import com.example.social_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/changeUsername")
	public ResponseEntity<?> changeUsername(@RequestBody Map<String, String> request) {
		String oldUsername = request.get("oldUsername");
		String newUsername = request.get("newUsername");
		String message = userService.changeUsername(oldUsername, newUsername);
		
		return ResponseEntity.ok(message);
	}
	
//	@PostMapping("/updateProfilePicture")
//	public ResponseEntity<?> updateProfilePicture(@RequestBody Map<String, String> request) {
//		String username = request.get("username");
//		String profilePictureUrl = request.get("profilePicture");
//		
//		String message = userService.updateProfilePicture(username, profilePictureUrl);
//		return ResponseEntity.ok(message);
//	}
	
	@PostMapping("/updateProfilePicture") 
		public ResponseEntity<?> updateProfilePicture(@RequestBody Map<String, String> request,
				Principal principle) {
			String profilePictureUrl = request.get("profilePicture");
			String username = principle.getName();
			String message = userService.updateProfilePicture(username, profilePictureUrl);
			
			return ResponseEntity.ok(Map.of("message",message, "profilePictureUrl", profilePictureUrl));
	}
}
