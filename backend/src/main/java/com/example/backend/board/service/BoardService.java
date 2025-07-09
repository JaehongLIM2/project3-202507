package com.example.backend.board.service;

import com.example.backend.board.dto.BoardDto;
import com.example.backend.board.entity.Board;
import com.example.backend.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;

    public void add(BoardDto dto) {
        // entity 에 dto의 값 들 옮겨 담고
        Board board = new Board();
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setAuthor(dto.getAuthor());

        // repository 에 save 실행
        boardRepository.save(board);

    }
}
