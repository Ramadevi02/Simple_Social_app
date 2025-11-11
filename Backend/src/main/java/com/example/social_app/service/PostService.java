package com.example.social_app.service;

import com.example.social_app.model.User;
import com.example.social_app.model.Post;
import com.example.social_app.dto.PostResponse;
import com.example.social_app.repository.UserRepository;
import com.example.social_app.repository.PostRepository;
import com.example.social_app.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;

@Service

public class PostService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private LikeRepository likeRepository;
	
		//create post
	public String creatPost(String username, String content, Post.Visibility visibility, String imageUrl) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if (userOpt.isEmpty()) {
			return "User not fond";
		}
		
		Post post = new Post();
		post.setUser(userOpt.get());
		post.setContent(content);
		post.setVisibility(visibility);
		post.setPostImage(imageUrl);
		postRepository.save(post);
		
		return "Post created successfully";
	}
	
		// Get user post
//	public List<Post> getUserPost(String username) {
//		Optional<User> userOpt = userRepository.findByUsername(username);
//		if (userOpt.isEmpty()) return List.of();
//		return postRepository.findByUser(userOpt.get());
//	}
	public List<PostResponse> getUserPost(String username) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if (userOpt.isEmpty()) return List.of();
		User currentUser = userOpt.get();
		
		Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
		
		return postRepository.findByUser(currentUser, sort).stream()
						.map(post -> {
							long likeCount = likeRepository.countByPost(post);
							boolean liked = likeRepository.findByUserAndPost(currentUser, post).isPresent();
							return new PostResponse(
									post.getId(),
									post.getContent(),
									post.getUser().getUsername(),
									post.getPostImage(),
									post.getUser().getProfilePicture(),	
									post.getVisibility().name(),
									post.getCreatedAt(),
									likeCount,
									liked
							);
						}).toList();
	}
//		Get public post
//	public List<Post> getPublicPost() {
//		return postRepository.findByVisibility(Post.Visibility.PUBLIC);
//	}
	public List<PostResponse> getPublicPost(User currentUser) {
		//Optional<User> userOpt = userRepository.findByUsername(username);
		//User currentUser = userOpt.orElse(null);
		Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
		return postRepository.findByVisibility(Post.Visibility.PUBLIC, sort).stream()
				.map(post -> {
					long likeCount = likeRepository.countByPost(post);
					boolean liked = (currentUser != null) && 
							likeRepository.findByUserAndPost(currentUser, post).isPresent();
					return new PostResponse(
							post.getId(),
							post.getContent(),
							post.getUser().getUsername(),
							post.getPostImage(),
							post.getUser().getProfilePicture(),
							post.getVisibility().name(),
							post.getCreatedAt(),
							likeCount,
							liked);
				}).toList();
	}
	
		// delete post
//	public List<PostResponse> deletePost(long id) {
//		
//	}
}
