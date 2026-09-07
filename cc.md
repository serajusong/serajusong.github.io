
4. openInvitation() 중복 호출 리스크 — Lottie complete/error 동시 발생 시 2번 실행
5. 비디오 로딩 실패 시 탭 안내 없음 — #touch-hint HTML 요소 누락 (CSS만 존재)
    ->11번에 있는거아님?
 6. 카운트다운 박스 small mobile에서 잘림 — iPhone SE (320px)에서 overflow
 7. prefers-reduced-motion 셀렉터가 존재하지 않는 클래스 대상 — 실효성 없음
 8. 티켓 페이드아웃 2초 vs openInvitation 1.5초 — 25% 남은 상태에서 잘림
 9. 모달 닫기→열기 사이 400ms 스크롤 해제 — iOS 바운스 스크롤 점프
11. 미사용 CSS/JS (touch-hint, cb-phone, dead fallback)
12. noscript가 같은 페이지로 링크 → 무한루프
13. TMap에 target="_blank" 누락
14. initMap() 실패 시 body 스크롤 영구 잠김
15. RSVP fetch에 타임아웃 없음
18. 프로필/갤러리 이미지에 loading="lazy" 없음
19. 사용 안 하는 폰트(Cormorant Garamond, Noto Serif KR 등) 로딩 → ~500KB 낭비