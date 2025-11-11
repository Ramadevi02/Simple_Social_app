package com.example.social_app.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UserDetailsResponse {

	private long id;
	private String username;
	private String email;
	private LocalDateTime createdAt;
	private String profilePicture;
	private List<PostResponse> posts;
	
	public UserDetailsResponse(long id, String username, String email, LocalDateTime createdAt, 
			String profilePicture, List<PostResponse> posts) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.createdAt = createdAt;
		this.profilePicture = profilePicture;
		this.posts = posts;
	}
	
	public long getId() {
		return id;
	}
	public String getUsername() {
		return username;
	}
	public String getEmail() {
		return email;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public String getProfilePicture() {
		return profilePicture;
	}
	public List<PostResponse> getPosts() {
		return posts;
	}
}
