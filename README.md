# E-GLOO ⛄
> 온라인 스터디룸을 제공하는 웹 기반 **화상 스터디 서비스**<br/>
### E-GLOO 시연 영상 🏃‍♂️: [유튜브](https://www.youtube.com/watch?v=rVmQeC5CMO0&feature=youtu.be)
* 프로젝트 기간 : 2022/06/24 ~ 2022/08/04 (6주)
* <a href="https://github.com/JumukWang/LastProject"> **백엔드팀 github 바로가기** </a>


![이글루 로고](https://user-images.githubusercontent.com/86911858/183428943-45533943-fed1-4933-9f0d-912161ddaf03.png)
## 목차
1. [프로젝트 아키텍처](E-GLOO-아키텍처-🌈)
2. [핵심 기능 소개](E-GLOO-핵심기능-🛠)
3. [프론트엔드 기술 스택](E-GLOO-프론트엔드-기술스택-🧑‍) 
4. [개인별 트러블슈팅](E-GLOO-트러블슈팅-❌)
5. [프론트 팀원 소개](E-GLOO-팀원소개-👨‍👨‍👦) 
6. [프론트 파트 분배](Front_End-파트분배-☕👨‍👦)  
 


## E-GLOO 아키텍처 🌈
![스크린샷 2022-08-01 14 24 02](https://user-images.githubusercontent.com/96240712/182083770-a15da7a1-6479-4107-adf0-c48557eacc0f.png)

## E-GLOO 핵심기능 🛠

* 최대 4명의 유저간의 실시간 **화상채팅 및 실시간 채팅** 기능 👨‍👨‍👦‍👦

* 일주일 단위의 **공부시간 그래프** 표기 📈

* 스터디룸 공개방 **비밀방** 기능 🚪

* 마이페이지 호스팅 방, 참여중인 방, 찜한 방으로 **상세 분류** 🍀

* 화상 채팅방에서 그룹 **TO-DO LIST** 작성 📚

* 채팅방에서 **타이머**로 오늘 공부한 시간 체크 ✔
<p>&nbsp;</p>

## E-GLOO 프론트엔드 기술스택 🧑‍💻

<div align=center>
<img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=blue">
<img src="https://img.shields.io/badge/redux-tookit-light black?style=for-the-badge&logoredux&logoColor=blue">
<img src="https://img.shields.io/badge/webRTC-white?style=for-the-badge&logo=webRTC&logoColor=blue">
<img src="https://img.shields.io/badge/socketio-black?style=for-the-badge&logo=socket.io&logoColor=white">
  <br>
<img src="https://img.shields.io/badge/amazonaws-green?style=for-the-badge&logo=amazonaws&logoColor=grey">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=grey">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=grey">
</div>
<p>&nbsp;</p>

## E-GLOO 트러블슈팅 ❌
1. 데이터 형태 통신 문제(하율찬) <a href="https://github.com/idojustdoit/realproject/wiki/1.-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%98%95%ED%83%9C-%ED%86%B5%EC%8B%A0-%EB%AC%B8%EC%A0%9C">wiki</a> 

2. webrtc 문제(조성인) <a href="https://github.com/idojustdoit/realproject/wiki/2.-webrtc-%EB%AC%B8%EC%A0%9C">wiki</a>

3. 페이지 전환 시, state persist 문제(조원희) <a href="https://github.com/blueprint-12/realproject/wiki/3.-state-persist-%EB%AC%B8%EC%A0%9C">wiki</a>
<p>&nbsp;</p>


## E-GLOO 팀원소개 👨‍👨‍👦

|  Personality  |![4ffcfac596ce78b6359f6703e5ffe57e](https://user-images.githubusercontent.com/107375500/182104419-9c0bc974-77b0-48d8-beeb-98574f881577.jpg)|![014f6bf2dccf97d1cfc97dff79b028e182f3bd8c9735553d03f6f982e10ebe70](https://user-images.githubusercontent.com/107375500/182104497-2989dd73-d46a-4e31-ab60-1e1ed72f9244.png)|![a2a82850f6db5ee6033c48f55d5e15a7a88f7b2cbb72be0bdfff91ad65b168ab](https://user-images.githubusercontent.com/107375500/182133022-3629d622-334f-4ec5-a2bc-52dc932cb6ad.png)|![a2a82850f6db5ee6033c48f55d5e15a7113e2bd2b7407c8202a97d2241a96625](https://user-images.githubusercontent.com/107375500/182132932-59de69d6-a4be-4bcb-afae-0d457ffc840c.png)|
|:----:|:---:|:---:|:---:|:---:|
|  **포지션**  |Front-end|Front-end|Front-end|Designer|
|  **이름**  |조원희|하율찬|조성인|기영석|
| **github** |  <a href="https://github.com/blueprint-12" >조원희 github</a>     |   <a href="https://github.com/idojustdoit"> 하율찬 github </a>    |     <a href="https://github.com/adultcho">조성인 github</a>    |   X   |

<p>&nbsp;</p>

## Front_End 파트분배 ☕


|  Front-End  | 구현한 기능 |
| ------------ | ------------------------------------------------- |
| **하율찬** | 회원가입, 로그인, 방생성, 좋아요, 공부시간 타이머, 그래프, 수정페이지, 방입장모달              |
| **조원희** | 메인페이지(카테고리별 게시물 불러오기,좋아요,더보기) 마이페이지(유저 관련 정보 불러오기, 호스팅 참여중 찜한 룸 리스트 슬라이더 구현, 스터디 탈퇴) 검색페이지(스터디 명으로 검색) 기능 및 뷰 구현   |
| **조성인** | 실시간 채팅(websocket, socket.io),화상채팅(webRTC, simple-peer), To-Do-List CRUD   |



