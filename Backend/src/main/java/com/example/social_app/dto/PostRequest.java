package com.example.social_app.dto;

import com.example.social_app.model.Post.Visibility;

public class PostRequest {
	private String content;
	private Visibility visibility;
	private String postImage;
	
	public PostRequest() {}
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public Visibility getVisibility() {
		return visibility;
	}
	public void setVisibility(Visibility visibility) {
		this.visibility = visibility;
	}
	
	public String getPostImage() {
		return postImage;
	}
	public void setPostImage(String postImage) {
		this.postImage = postImage;
	}
}
