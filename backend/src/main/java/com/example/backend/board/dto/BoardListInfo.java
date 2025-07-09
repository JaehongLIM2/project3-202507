package com.example.backend.board.dto;

import java.time.LocalDateTime;

public interface BoardListInfo {
    Integer getId();

    String getTitle();

    String getAuthor();

    LocalDateTime getInsertedAt();
}
