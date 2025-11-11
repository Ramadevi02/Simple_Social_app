package com.example.social_app.repository;

import com.example.social_app.model.PasswordHistory;
import com.example.social_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Long>{
	List<PasswordHistory> findTop3ByUserOrderByCreatedAtDesc(User user);
}
