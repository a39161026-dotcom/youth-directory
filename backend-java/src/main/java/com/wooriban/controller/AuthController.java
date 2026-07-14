package com.wooriban.controller;

import com.wooriban.dto.*;
import com.wooriban.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup/")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest req) {
        authService.signup(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login/")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/refresh/")
    public ResponseEntity<AccessTokenResponse> refresh(@Valid @RequestBody RefreshRequest req) {
        String access = authService.refresh(req.getRefresh());
        return ResponseEntity.ok(new AccessTokenResponse(access));
    }
}
