//😣정규표현식
// 특수 문자 체크(얘 문제있음 사용x중)
export function checkSpecial(str) {
  const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}
//영어, 숫자, 한글 조합
export function checkEngNumKor(str) {
  const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

//😣위의 정규표현식을 활용한 검색어 필터 기능
export function validateWord(word) {
  if (word === "") {
    window.alert("검색어를 입력해주세요.");
    // word.current.value = "";
    return;
  }

  if (checkEngNumKor(word)) {
    let trimedWord = word.trim();
    return trimedWord;
  }
}
