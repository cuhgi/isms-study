# ISMS-P 학습 앱 (PWA) — 안드로이드 설치 가이드

학습노트·암기카드·모의고사 5종을 **하나의 설치형 웹앱(PWA)** 으로 묶었습니다.
설치하면 홈 화면 아이콘 + 전체화면 + **완전 오프라인**(지하철·비행기에서도)으로 동작합니다.

## 기능
- 📑 5개 탭 전환 (학습노트 / 암기카드 / 모의고사10회 / 영역별심화 / 정식50문항)
- 👆 문제 **탭하면 정답·해설** 펼침 (다시 탭하면 접힘)
- ⭐ 문제별 **북마크** → 하단 "★ 북마크만" 으로 틀린 문제만 복습
- 🔍 전 과목 **검색** (예: `위탁`, `72시간`, `2.6.4`) → 탭하면 해당 위치로 이동
- 🌙 **다크모드** 토글 / ☰ 목차 점프 / ↑ 맨 위로
- 📴 **오프라인** — 첫 1회 로딩 후 인터넷 없이 사용

## 설치 방법 (안드로이드 크롬)
PWA 설치는 **HTTPS 주소**가 필요합니다. 가장 쉬운 무료 호스팅은 GitHub Pages입니다.

### 1) GitHub Pages에 올리기 (PC에서 1회)
```bash
cd isms-study-app
# 새 깃 저장소로 초기화 후 본인 GitHub에 push
git init && git add . && git commit -m "ISMS-P study app"
gh repo create isms-study --public --source=. --push    # gh CLI 사용 시
# (gh 없으면: GitHub에서 빈 repo 생성 → git remote add origin <URL> → git push -u origin main)
```
그다음 GitHub repo → **Settings → Pages → Branch: main / root → Save**.
잠시 뒤 `https://<아이디>.github.io/isms-study/` 주소가 생성됩니다.

### 2) 폰에서 설치
1. 안드로이드 **크롬**으로 위 주소 접속
2. 우상단 **⋮ 메뉴 → "앱 설치"**(또는 "홈 화면에 추가")
3. 홈 화면에 **ISMS-P 학습** 아이콘 생성 → 탭하면 앱처럼 전체화면 실행
4. 한 번 열어두면 이후 **오프라인**으로 사용 가능

> 💡 호스팅 없이 그냥 보기만 할 거면, PC에서 `python3 -m http.server` 실행 후
> 같은 와이파이의 폰 브라우저로 `http://<PC_IP>:8000` 접속해도 읽기는 됩니다.
> (단, 이 방식은 HTTP라 "앱 설치"·오프라인 캐시는 안 됩니다.)

## 내용 수정 시
`content/` 안의 `.md` 5개를 고치면 됩니다(원본과 동일 형식).
수정 후 다시 push → 폰에서 앱 열면 갱신됩니다. 서비스워커 캐시를 새로고치려면
`sw.js`의 `CACHE = 'ismsp-v1'` 숫자를 올리세요(`v2`, `v3`…).

## 파일 구성
| 파일 | 역할 |
|------|------|
| index.html / style.css / app.js | 앱 본체(오프라인 마크다운 렌더러 포함) |
| manifest.webmanifest | 앱 이름·아이콘·전체화면 설정 |
| sw.js | 오프라인 캐시 서비스워커 |
| icon-192.png / icon-512.png | 앱 아이콘 |
| make_icons.py | 아이콘 재생성 스크립트(선택) |
| content/*.md | 학습 콘텐츠 5종 |
