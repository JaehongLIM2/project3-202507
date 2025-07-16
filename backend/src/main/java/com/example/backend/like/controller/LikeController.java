package com.example.backend.like.controller;

import com.example.backend.like.dto.LikeForm;
import com.example.backend.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/like")
public class LikeController {
    private final LikeService likeService;

    @PutMapping
    public void like(@RequestBody LikeForm likeForm, Authentication authentication) {
        likeService.update(likeForm, authentication);
    }
}
