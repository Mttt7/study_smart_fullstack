package com.mt.studysmart.studysmart.dao;

import com.mt.studysmart.studysmart.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile,Long> {
}
