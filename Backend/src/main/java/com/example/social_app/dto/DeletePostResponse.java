package com.example.social_app.dto;

import java.util.List;

public class DeletePostResponse<T> {
	private String message;
	private List<PostResponse> userPost;
	private List<PostResponse> publicPost;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public List<PostResponse> getUserPost() {
		return userPost;
	}
	public void setUserPost(List<PostResponse> userPost) {
		this.userPost = userPost;
	}
	
	public List<PostResponse> getPublicPost() {
		return publicPost;
	}
	public void setPubliPost(List<PostResponse> publicPost) {
		this.publicPost = publicPost;
	}
}
