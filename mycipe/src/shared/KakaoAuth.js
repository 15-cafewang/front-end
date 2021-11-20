const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY; // REST API 키
const REDIRECT_URI =
  // "http://mycipe.shop.s3-website.ap-northeast-2.amazonaws.com"; //REDIRECT URL
  "http://localhost:3000/user/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
