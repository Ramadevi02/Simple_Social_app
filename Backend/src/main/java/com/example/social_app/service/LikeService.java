package com.example.social_app.service;

import com.example.social_app.model.Like;
import com.example.social_app.model.User;
import com.example.social_app.model.Post;
import com.example.social_app.repository.LikeRepository;
import com.example.social_app.repository.PostRepository;
import com.example.social_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LikeService {
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	public String toggleLike(String username, long postId) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		Optional<Post> postOpt = postRepository.findById(postId);
		
		if (userOpt.isEmpty() || postOpt.isEmpty()) {
			return "User or Post not found";
		}
		
		User user = userOpt.get();
		Post post = postOpt.get();
		
		Optional<Like> existingLike = likeRepository.findByUserAndPost(user, post);
		
		if(existingLike.isPresent()) {
			likeRepository.delete(existingLike.get());
			return "UnLiked";
		} else {
			Like like = new Like(user, post);
			likeRepository.save(like);
			return "Liked";
		}
	}
	
	public long getLikeCount(Long postId) {
		Optional<Post> postOpt = postRepository.findById(postId);
		if (postOpt.isEmpty()) {
			return 0L;
		}
		return likeRepository.countByPost(postOpt.get());
	}
	
//	public long getLikeCount(Long postId) {
//		Optional<Post> postOpt = postRepository.findById(postId);
//		return postOpt.map(likeRepository::countByPost).orElse(0L);
//	}
	
	public boolean hasUserLiked(String username, Long postId) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		Optional<Post> postOpt = postRepository.findById(postId);
		if (userOpt.isEmpty() || postOpt.isEmpty()) {
			return false;
		}
		return likeRepository.findByUserAndPost(userOpt.get(), postOpt.get()).isPresent();
	}
}
