package com.example.social_app.controller;

import com.example.social_app.model.Post;
//import com.example.social_app.model.Post;
import com.example.social_app.model.User;
import com.example.social_app.repository.UserRepository;
import com.example.social_app.repository.PostRepository;
import com.example.social_app.service.PostService;
import com.example.social_app.service.FileUploadService;
//import com.example.social_app.dto.PostRequest;
import com.example.social_app.dto.PostResponse;
import com.example.social_app.dto.DeletePostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/post")

public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired 
	private FileUploadService fileUploadService;
	
		//create new post
	@PostMapping("/create")
	public String createPost(Authentication authentication,
			@RequestParam("content") String content,
			@RequestParam("visibility") Post.Visibility visibility,
			@RequestParam(value = "postImage", required = false) MultipartFile postImage
	) throws IOException {
		String username = authentication.getName();
		String imageUrl = null;
		
		if(postImage != null && !postImage.isEmpty()) {
			imageUrl = fileUploadService.uploadFile(postImage);
		}
		
		return postService.creatPost(username, content, visibility, imageUrl);
	}
		//get all post of a user
	@GetMapping("/my")
	public List<PostResponse> getMyPost(Authentication authentication) {
		String username = authentication.getName();
		return postService.getUserPost(username);
	}
		//get all public post
	@GetMapping("/public")
	public List<PostResponse> getPublicPost(Authentication authentication) {
		User currentUser = null;
		if (authentication != null) {
			currentUser = userRepository.findByUsername(authentication.getName()).orElse(null);
		}
		//String username = (authentication != null) ? authentication.getName() : null;
		return postService.getPublicPost(currentUser);
	}
		// delete post
	@DeleteMapping("/deletePost/{postId}")
	public ResponseEntity<DeletePostResponse<PostResponse>> deletePost(
			@PathVariable long postId, Authentication authentication) {
		String username = authentication.getName();
		User currentUser = userRepository.findByUsername(authentication.getName()).orElse(null);
		postRepository.deleteById(postId);
		
		DeletePostResponse<PostResponse> response = new DeletePostResponse<>();
		response.setMessage("success");
		response.setUserPost(postService.getUserPost(username));
		response.setPubliPost(postService.getPublicPost(currentUser));
		
		return ResponseEntity.ok(response);
	}
}
