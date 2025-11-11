package com.example.social_app.service;

import com.example.social_app.model.User;
import com.example.social_app.dto.UserDetailsResponse;
import com.example.social_app.dto.PostResponse;
import com.example.social_app.model.PasswordHistory;
import com.example.social_app.repository.UserRepository;

import jakarta.transaction.Transactional;

import com.example.social_app.repository.PasswordHistoryRepository;
import com.example.social_app.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service 

public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordHistoryRepository passwordHistoryRepository;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private LikeRepository likeRepository;
		
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
			// Sign up new user
	public User registerUser(User user) {
		// have to encrypt password before saving 
		user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
		User savedUser = userRepository.save(user);
		
		// save first password to history
		PasswordHistory history = new PasswordHistory();
		history.setUser(savedUser);
		history.setPasswordHash(savedUser.getPasswordHash());
		passwordHistoryRepository.save(history);
		System.out.println("Received password: " + user.getPasswordHash());
		return savedUser;
	}
	
			// Login
	public Optional<User> login(String username, String password) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if (userOpt.isPresent()) {
			User user = userOpt.get();
			if (passwordEncoder.matches(password, user.getPasswordHash())) {
				return Optional.of(user);
			}
		}
		return Optional.empty();
	}
	
		// Change user name
	public String changeUsername(String OldUsername, String newUsername) {
		Optional<User> userOpt = userRepository.findByUsername(OldUsername);
		if(userOpt.isEmpty()) {
			return "User not found";
		}
		
		User user = userOpt.get();
		user.setUsername(newUsername);
		userRepository.save(user);
		
		return "Username updated successfully";
	}
			// change password
	public String changePassword(String username, String newPassword) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if (userOpt.isEmpty()) {
			return "User not found";
		}
		
		User user = userOpt.get();
		
			// get last 3 password
		List<PasswordHistory> lastPassword = passwordHistoryRepository.findTop3ByUserOrderByCreatedAtDesc(user);
			// check if new password matches any of last 3
		for (PasswordHistory p : lastPassword) {
			if (passwordEncoder.matches(newPassword, p.getPasswordHash())) {
				return "New password cannot be one of the last 3 passwords";
			}
		}
		
			//Encrypt new password and update
		String encodedNewPassword = passwordEncoder.encode(newPassword);
		user.setPasswordHash(encodedNewPassword);
		userRepository.save(user);
		
			// save new password in history
		PasswordHistory newHistory = new PasswordHistory();
		newHistory.setUser(user);
		newHistory.setPasswordHash(encodedNewPassword);
		passwordHistoryRepository.save(newHistory);
		
		return "Password updated successfully";
	}
	
		// update profile picture
	public String updateProfilePicture(String username, String profilePictureUrl) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if (userOpt.isEmpty()) {
			return "User not found";
		}
		
		User user = userOpt.get();
		user.setProfilePicture(profilePictureUrl);
		userRepository.save(user);
		
		return "Profile picture uploaded successfully";
	}
	
		// User details service
	public UserDetailsResponse getUserDetails(String username) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		
		if(userOpt.isEmpty()) return null;
		
		User currentUser = userOpt.get();
		List<PostResponse> posts = postService.getUserPost(username);
		
		return new UserDetailsResponse(
				currentUser.getId(),
				currentUser.getUsername(),
				currentUser.getEmail(),
				currentUser.getCreatedAt(),
				currentUser.getProfilePicture(),
				posts
				);
	}
	
		// delete user account
	@Transactional
	public void deleteUser(Long userId) {
		User currentUser = userRepository.findById(userId).orElse(null);
		likeRepository.deleteAllByUserId(userId);
		userRepository.delete(currentUser);
	}
}
