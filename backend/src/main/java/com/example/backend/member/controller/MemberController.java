package com.example.backend.member.controller;

import com.example.backend.member.dto.*;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    // 로그인
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody MemberLoginForm loginForm) {
//        System.out.println(loginForm);
        try {
            String token = memberService.getToken(loginForm);
            return ResponseEntity.ok().body(
                    Map.of("token", token,
                            "message",
                            Map.of("type", "success",
                                    "text", "로그인 되었습니다.")));
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            // 403 : 권한 없음
            return ResponseEntity.status(403).body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }

    }


    // 비밀번호 수정
    @PutMapping("changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordForm data) {
        try {
            memberService.changePassword(data);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            // 403 : 권한 없음
            return ResponseEntity.status(403).body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "암호가 수정 되었습니다.")));

    }

    // 회원정보 수정
    @PutMapping
    public ResponseEntity<?> update(@RequestBody MemberForm memberForm) {
//        System.out.println("memberForm = " + memberForm);
        try {
            memberService.update(memberForm);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            // 403 : 권한 없음
            return ResponseEntity.status(403).body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "회원 정보가 수정 되었습니다.")));
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteMember(@RequestBody MemberForm memberForm) {
        try {
            memberService.delete(memberForm);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            // 403 : 권한 없음
            return ResponseEntity.status(403).body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "회원 탈퇴 되었습니다.")));
    }


    // 회원 정보 조회
    @GetMapping(params = "email")
    public MemberDto getMember(String email) {
        return memberService.get(email);
    }

    // 회원 목록 조회
    @GetMapping("list")
    public List<MemberListInfo> list() {
        return memberService.list();
    }


    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody MemberForm memberForm) {
//        System.out.println("memberForm = " + memberForm);
        try {
            memberService.add(memberForm);

        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }

        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "회원가입 되었습니다."))
        );
    }
}
