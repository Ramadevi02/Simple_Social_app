package com.example.social_app.dto;

public class LoginResponse {
	private String message;
	private String token;
	
	public LoginResponse(String message, String token) {
		this.message = message;
		this.token = token;
	}
	
	public String getMessage() {
		return message;
	}
	
	public String getToken() {
		return token;
	}
} 
