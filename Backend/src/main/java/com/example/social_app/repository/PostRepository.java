package com.example.social_app.repository;

import com.example.social_app.model.Post;
import com.example.social_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>{
	List<Post> findByUser(User user, Sort sort);
	List<Post> findByVisibility(Post.Visibility visibility, Sort sort);
}
