import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// JWT 비밀 키 (환경 변수로 관리해야 합니다)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// 비밀번호 해시화 함수
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10); // salt 생성
  const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 해시화
  return hashedPassword;
}

// 비밀번호 비교 함수
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(password, hashedPassword); // 비밀번호 비교
  return isMatch;
}

// JWT 토큰 생성 함수
export function generateToken(userId: number) {
  // 사용자 정보에 따라 토큰을 생성
  const payload = { userId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // 토큰 만료 시간 설정
  return token;
}

// JWT 토큰 검증 함수
export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null; // 토큰 검증 실패 시 null 반환
  }
}
