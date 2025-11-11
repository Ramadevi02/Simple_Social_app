package com.example.social_app.controller;

import com.example.social_app.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.Authentication;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/like")
public class LikeController {

	@Autowired
	private LikeService likeService;
	
	@PostMapping("/{postId}")
	public Map<String, Object> toggleLike(@PathVariable Long postId, Authentication authentication) {
		String username = authentication.getName();
		String message = likeService.toggleLike(username, postId);
		long likeCount = likeService.getLikeCount(postId);
		boolean liked = message.equals("Liked");
		
		Map<String, Object> response = new HashMap<>();		
		response.put("liked", liked);
		response.put("message", message);
		response.put("likeCount", likeCount);
		
		return response;
	}
	
	@GetMapping("/{postId}/status")
	public Map<String, Object> getLikeStatus(@PathVariable Long postId, Authentication authentication) {
		String username = authentication.getName();
		boolean liked = likeService.hasUserLiked(username, postId);
		long likeCount = likeService.getLikeCount(postId);
		
		Map<String, Object> response = new HashMap<>();
		response.put("liked", liked);
		response.put("likeCount", likeCount);
		
		return response;
	}
}
