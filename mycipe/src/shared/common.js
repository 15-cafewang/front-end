// 이메일 정규식
export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return _reg.test(email);
};

// 비밀번호 정규식
export const pwCheck = (pwd) => {
  let _reg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

  return _reg.test(pwd);
};

// 비밀번호 ,비밀번호확인 일치
export const pwdConfirm = (pwd, pwdcheck) => {
  if (pwd === pwdcheck) {
    return true;
  } else {
    return false;
  }
};

// 닉네임 정규식
export const nickCheck = (nick) => {
  let _reg = /^[가-힣a-zA-Z0-9]/;
  if (nick.length < 2 || nick.length > 10) {
    return false;
  }
  return _reg.test(nick);
};
