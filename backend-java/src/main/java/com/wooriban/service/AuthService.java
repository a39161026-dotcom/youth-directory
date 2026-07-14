package com.wooriban.service;

import com.wooriban.domain.User;
import com.wooriban.dto.LoginRequest;
import com.wooriban.dto.SignupRequest;
import com.wooriban.dto.TokenResponse;
import com.wooriban.repository.UserRepository;
import com.wooriban.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Transactional
    public User signup(SignupRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        User user = new User(
                req.getUsername(),
                req.getEmail(),
                req.getFirstName(),
                passwordEncoder.encode(req.getPassword())
        );
        return userRepository.save(user);
    }

    public TokenResponse login(LoginRequest req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );
        } catch (Exception e) {
            throw new BadCredentialsException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String access = jwtUtil.generateAccessToken(req.getUsername());
        String refresh = jwtUtil.generateRefreshToken(req.getUsername());
        return new TokenResponse(access, refresh);
    }

    public String refresh(String refreshToken) {
        if (!jwtUtil.isTokenValid(refreshToken) || !"refresh".equals(jwtUtil.extractType(refreshToken))) {
            throw new BadCredentialsException("유효하지 않은 refresh 토큰입니다.");
        }
        String username = jwtUtil.extractUsername(refreshToken);
        return jwtUtil.generateAccessToken(username);
    }
}
