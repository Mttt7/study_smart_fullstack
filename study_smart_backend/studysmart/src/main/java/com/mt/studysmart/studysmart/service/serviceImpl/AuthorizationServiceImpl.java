package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.UserProfileRepository;
import com.mt.studysmart.studysmart.entity.UserProfile;
import com.mt.studysmart.studysmart.service.AuthorizationService;
import com.mt.studysmart.studysmart.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final UserProfileRepository userProfileRepository;
    @Override
    public boolean isUserAuthorized(Authentication authentication,Long userId) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String requestUid = jwt.getClaims().get("uid").toString();
        String resourceUid = userProfileRepository.findById(userId).orElse(null).getOktaId();

        return Objects.equals(requestUid, resourceUid);
    }
}
