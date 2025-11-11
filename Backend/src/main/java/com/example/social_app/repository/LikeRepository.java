package com.example.social_app.repository;

import com.example.social_app.model.Like;
import com.example.social_app.model.Post;
import com.example.social_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
	Optional<Like> findByUserAndPost(User user, Post post);
	boolean existsByUserAndPost(User user, Post post);
	long countByPost(Post post);
	void deleteAllByUserId(Long userId);
}
