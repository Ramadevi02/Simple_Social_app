package com.example.social_app.dto;

import java.time.LocalDateTime;

public class PostResponse {
	private Long id;
	private String content;
	private String postImage;
	private String username;
	private String profilePicture;
	private String visibility;
	private LocalDateTime createdAt;
	private long likeCount;
	private boolean liked;
	
	public PostResponse(Long id,String content, String username, String postImage, String profilePicture, String visibility,
			LocalDateTime createdAt, long likeCount, boolean liked) {
		this.id = id;
		this.content = content;
		this.username = username;
		this.postImage = postImage;
		this.profilePicture = profilePicture;
		this.visibility = visibility;
		this.createdAt = createdAt;
		this.likeCount = likeCount;
		this.liked = liked;
	}
	
	public Long getId() {
		return id;
	}
	public String getContent() {
		return content;
	}
	public String getUsername() {
		return username;
	}
	public String getVisibility() {
		return visibility;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public long getLikeCount() {
		return likeCount;
	}
	public boolean getLiked() {
		return liked;
	}
	public String getPostImage() {
		return postImage;
	}
	public String getProfilePicture() {
		return profilePicture;
	}
}
