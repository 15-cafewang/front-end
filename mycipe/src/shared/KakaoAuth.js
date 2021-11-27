const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY; // REST API 키
const REDIRECT_URI = "https://cafewang.co.kr/user/kakao/callback"; //REDIRECT URL
// http://localhost:3000/user/kakao/callback
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
