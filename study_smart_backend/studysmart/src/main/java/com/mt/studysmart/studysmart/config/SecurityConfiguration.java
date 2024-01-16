package com.mt.studysmart.studysmart.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

public class SecurityConfiguration {
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers("/api/")
                                .authenticated()
                                .anyRequest().permitAll())
                .oauth2ResourceServer(oAuth -> oAuth.jwt(Customizer.withDefaults()));



        //sending 401 when token is invalid (friendly response)-----
        http.setSharedObject(ContentNegotiationStrategy.class, new
                HeaderContentNegotiationStrategy());

        Okta.configureResourceServer401ResponseBody(http);
        //-----------------------------------------------------------
        //disable csrf since we are not using cookies for session tracking
        http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
