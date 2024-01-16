package com.mt.studysmart.studysmart.service;

import org.springframework.security.core.Authentication;

public interface AuthorizationService {
    boolean isUserAuthorized(Authentication authentication,Long userId);
}
