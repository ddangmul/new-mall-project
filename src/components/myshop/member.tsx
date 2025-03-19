import "./member.css";

export default function Member() {
  return (
    <article className="member w-full mt-10 relative">
      <div className="absolute w-[100%]">
        <div className="member-heading py-2 border-b-1 border-b-[#9e9e9e] mb-8">
          <p className="text-2xl">회원정보 수정</p>
        </div>
        <div className="member-form-wrap">
          <form
            id="member-form"
            method="post"
            // onSubmit={handleSignup}
            className="space-y-2 w-full"
          >
            <div>user email</div>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="기존 비밀번호"
                // value={formData.password}
                // onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="passwordCk"
                type="password"
                name="passwordCk"
                required
                placeholder="변경할 비밀번호"
                // value={formData.passwordCk}
                // onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="이름"
                required
                // value={formData.username}
                // onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div className="flex justify-between gap-6 pr-4">
              <span className="basis-1/3 flex items-center gap-3">
                <input
                  type="text"
                  name="birthYear"
                  placeholder="출생년도"
                  className="basis-9/10"
                  // value={formData.birthYear}
                  // onChange={handleChange}
                />
                <span>년</span>
              </span>
              
              <span className="basis-1/3 flex items-center gap-3">
                <input
                  type="text"
                  name="birthMonth"
                  placeholder="출생월"
                  className="basis-9/10"
                  // value={formData.birthMonth}
                  // onChange={handleChange}
                />
                <span>월</span>
              </span>
              <span className="basis-1/3 flex items-center gap-3">
                <input
                  type="text"
                  name="birthDay"
                  placeholder="출생일"
                  className="basis-9/10"
                  // value={formData.birthDay}
                  // onChange={handleChange}
                />
                <span>일</span>
              </span>
            </div>
            <div className="flex">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSolar"
                  id="solar"
                  // checked={formData.isSolar}
                  // onChange={handleChange}
                />
                <label className="w-20" htmlFor="solar">
                  양력
                </label>
              </span>
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isLunar"
                  id="lunar"
                  // checked={formData.isLunar}
                  // onChange={handleChange}
                />
                <label className="w-20" htmlFor="lunar">
                  음력
                </label>
              </span>
            </div>
            <button
              type="submit"
              className="signup_btn text-4xl font-serif w-full py-3 my-6 bg-[#313030] text-[#f2f0eb]"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
