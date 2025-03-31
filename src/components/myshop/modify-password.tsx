import "./modify.css";

export default function ModifyPW() {
  return (
    <section className="modify-password mt-8">
      <form>
        <h2 className="text-xl mb-8">비밀번호 변경</h2>
        <div className="space-y-3">
          <input
            type="text"
            id="oldPw"
            name="old_pw"
            placeholder="기존 비밀번호"
          />
          <div>
            <input
              type="text"
              id="newPw"
              name="new_pw"
              placeholder="변경할 비밀번호"
            />
            <p className="text-sm mt-2">
              영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
            </p>
          </div>
          <div>
            <input
              type="text"
              id="newPwConfig"
              name="new_pw_config"
              placeholder="변경할 비밀번호 확인"
            />
            <p className="text-sm mt-2">
              영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
