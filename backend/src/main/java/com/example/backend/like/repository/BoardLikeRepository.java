package com.example.backend.like.repository;

import com.example.backend.like.entity.BoardLike;
import com.example.backend.like.entity.BoardLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, BoardLikeId> {
    Optional<BoardLike> findBoardIdAndMemberEmail(Integer boardId, String email);
}