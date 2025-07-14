package com.example.backend.board.service;

import com.example.backend.board.dto.BoardDto;
import com.example.backend.board.dto.BoardListDto;
import com.example.backend.board.entity.Board;
import com.example.backend.board.repository.BoardRepository;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    public void add(BoardDto dto, Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("권한이 없습니다.");
        }
        // entity 에 dto의 값 들 옮겨 담고
        Board board = new Board();
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());

        Member author = memberRepository.findById(authentication.getName()).get();
        board.setAuthor(author);

        // repository 에 save 실행
        boardRepository.save(board);

    }

    public boolean validate(BoardDto dto) {
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }
        if (dto.getContent() == null || dto.getContent().trim().isBlank()) {
            return false;
        }

        return true;
    }

    public List<BoardListDto> list() {
//        return boardRepository.findAllByOrderByIdDesc();
        return boardRepository.findAllBy();
    }


    public BoardDto getBoardById(Integer id) {
        BoardDto board = boardRepository.findBoardById(id);
//        BoardDto boardDto = new BoardDto();
//        boardDto.setId(board.getId());
//        boardDto.setTitle(board.getTitle());
//        boardDto.setContent(board.getContent());
//        boardDto.setAuthor(board.getAuthor());
//        boardDto.setInsertedAt(board.getInsertedAt());

        return boardDto;
    }

    public void deleteById(Integer id, Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("권한이 없습니다.");
        }
        Board db = boardRepository.findById(id).get();
        if (db.getAuthor().getEmail().equals(authentication.getName())) {
            boardRepository.deleteById(id);
        } else {
            throw new RuntimeException("권한이 없습니다.");
        }
    }

    public void update(BoardDto boardDto, Authentication authentication) {
        // 수정
        // 1. 조회
        Board db = boardRepository.findById(boardDto.getId()).get();
        if (db.getAuthor().getEmail().equals(authentication.getName())) {
            // 2. 변경
            db.setTitle(boardDto.getTitle());
            db.setContent(boardDto.getContent());
        }
        // 3. 저장
        boardRepository.save(db);
    }

}
