package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("add")
    @ResponseBody
    public String add(@RequestBody BoardDto dto) {
        System.out.println(dto);
        // service 에게 넘겨서 일 시키기
        boardService.add(dto);

        return null;
    }
}
