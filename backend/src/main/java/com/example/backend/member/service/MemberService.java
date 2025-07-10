package com.example.backend.member.service;

import com.example.backend.member.dto.MemberDto;
import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void add(MemberForm memberForm) {

        if (this.validate(memberForm)) {
            Member member = new Member();

            member.setEmail(memberForm.getEmail());
            member.setPassword(memberForm.getPassword());
            member.setNickName(memberForm.getNickName());
            member.setInfo(memberForm.getInfo());

            memberRepository.save(member);
        }

    }

    private boolean validate(MemberForm memberForm) {
        // email 중복 여부
        Optional<Member> db = memberRepository.findById(memberForm.getEmail());
        if (db.isPresent()) {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }
        // nickName 중복 여부
        Optional<Member> db2 = memberRepository.findByNickName(memberForm.getNickName());
        if (db2.isPresent()) {
            throw new RuntimeException("이미 사용 중인 별명입니다.");
        }

        // email 있는지
        if (memberForm.getEmail().trim().isBlank()) {
            throw new RuntimeException("이메일을 입력해주세요.");
        }
        // 형식에 맞는지
        String email = memberForm.getEmail();
        // email 정규 표현식 : email regex 으로 검색
        if (!Pattern.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", email)) {
            throw new RuntimeException("이메일 형식에 맞지 않습니다.");
        }
        // password 있는지
        if (memberForm.getPassword().isBlank()) {
            throw new RuntimeException("패스워드를 입력해주세요.");
        }
        // nickName 있는지
        if (memberForm.getNickName().isBlank()) {
            throw new RuntimeException("별명을 입력해주세요.");
        }

        return true;

    }

    public List<MemberListInfo> list() {
        return memberRepository.findAllBy();
    }

    public MemberDto get(String email) {
        Member db = memberRepository.findById(email).get();
        MemberDto memberDto = new MemberDto();

        memberDto.setEmail(db.getEmail());
        memberDto.setNickName(db.getNickName());
        memberDto.setInfo(db.getInfo());
        memberDto.setInsertedAt(db.getInsertedAt());
        return memberDto;
    }

    public void delete(MemberForm memberForm) {
        Member db = memberRepository.findById(memberForm.getEmail())
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        if (db.getPassword().equals(memberForm.getPassword())) {
            memberRepository.delete(db);
        } else {
            throw new RuntimeException("암호가 일치하지 않습니다.");
        }
    }

    public void update(MemberForm memberForm) {
        // 수정
        // 1. 조회
        Member member = memberRepository.findById(memberForm.getEmail()).get();
        // 1.1 암호 확인
        if (!member.getPassword().equals(memberForm.getPassword())) {
            throw new RuntimeException("암호가 일치하지 않습니다.");
        }
        // 2. 수정
        member.setNickName(memberForm.getNickName());
        member.setInfo(memberForm.getInfo());
        // 3. 저장
        memberRepository.save(member);
    }
}
