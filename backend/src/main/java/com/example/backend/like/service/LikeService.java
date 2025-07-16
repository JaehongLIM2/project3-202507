package com.example.backend.like.service;

import com.example.backend.like.dto.LikeForm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    public void update(LikeForm likeForm, Authentication authentication) {
        // 로그인 안했으면 exception

        // 게시물 번호와 로그인한 이메일로 like 데이터 얻어서

        // 있으면 지우고

        // 없으면 insert
    }
}
