// "use client";

// import "./member.css";

// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export default function Member() {
//   const { data: session } = useSession();

//   const user = session.user;

//   const [formData, setFormData] = useState({
//     email: user.email,
//     oldPassword: "",
//     newPassword: "",
//     newPasswordCk: "",
//     username: user.username,
//     birthYear: "",
//     birthMonth: "",
//     birthDay: "",
//     isSolar: false,
//     isLunar: false,
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/user/update", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setMessage("사용자 정보가 업데이트되었습니다.");
//     } else {
//       setMessage(`오류: ${data.error}`);
//     }
//     console.log(message);
//   };

//   return (
//     <div className="flex flex-col">
//       <article className="member w-full mt-10">
//         <div className="w-[100%]">
//           <div className="member-heading py-2 border-b-1 border-b-[#9e9e9e] mb-8">
//             <p className="text-2xl">회원정보 수정</p>
//           </div>
//           <div className="member-form-wrap">
//             <form
//               id="member-form"
//               method="post"
//               onSubmit={handleSubmit}
//               className="space-y-2 w-full"
//             >
//               <div>
//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   value={user.email}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <input
//                   id="oldPassword"
//                   type="password"
//                   name="oldPassword"
//                   required
//                   placeholder="기존 비밀번호 확인"
//                   value={formData.oldPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   id="newPassword"
//                   type="password"
//                   name="newPassword"
//                   required
//                   placeholder="변경할 비밀번호"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   id="newPasswordCk"
//                   type="password"
//                   name="newPasswordCk"
//                   required
//                   placeholder="변경할 비밀번호 확인"
//                   value={formData.newPasswordCk}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="이름"
//                   required
//                   value={user.username}
//                   readOnly
//                   autoComplete="name"
//                 />
//               </div>
//               <div className="flex justify-between gap-6 pr-4">
//                 <span className="basis-1/3 flex items-center gap-3">
//                   <input
//                     type="text"
//                     name="birthYear"
//                     placeholder="출생년도"
//                     className="basis-9/10"
//                     value={formData.birthYear}
//                     onChange={handleChange}
//                   />
//                   <span>년</span>
//                 </span>

//                 <span className="basis-1/3 flex items-center gap-3">
//                   <input
//                     type="text"
//                     name="birthMonth"
//                     placeholder="출생월"
//                     className="basis-9/10"
//                     value={formData.birthMonth}
//                     onChange={handleChange}
//                   />
//                   <span>월</span>
//                 </span>
//                 <span className="basis-1/3 flex items-center gap-3">
//                   <input
//                     type="text"
//                     name="birthDay"
//                     placeholder="출생일"
//                     className="basis-9/10"
//                     value={formData.birthDay}
//                     onChange={handleChange}
//                   />
//                   <span>일</span>
//                 </span>
//               </div>
//               <div className="flex justify-end gap-2">
//                 <span className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="isSolar"
//                     id="solar"
//                     checked={formData.isSolar}
//                     onChange={handleChange}
//                   />
//                   <label className="w-14" htmlFor="solar">
//                     양력
//                   </label>
//                 </span>
//                 <span className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="isLunar"
//                     id="lunar"
//                     // checked={formData.isLunar}
//                     // onChange={handleChange}
//                   />
//                   <label className="w-14" htmlFor="lunar">
//                     음력
//                   </label>
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 className="signup_btn w-full py-3 my-6 bg-[#313030] text-[#f2f0eb] rounded-sm"
//               >
//                 회원정보 수정
//               </button>
//             </form>
//           </div>
//         </div>
//       </article>
//       <article className="address mt-10">
//         <h1 className="text-2xl adress-heading py-2 border-b-1 border-b-[#9e9e9e] mb-8">
//           배송지 등록
//         </h1>
//         <div className="address-form my-5">
//           <form className="space-y-3">
//             <div className="space-y-3">
//               <span className="flex gap-2">
//                 <input type="number" placeholder="우편번호" required />
//                 <button className="w-30 text-[#313030]">우편번호</button>
//               </span>
//               <input type="text" placeholder="기본주소" required />
//               <input type="text" placeholder="나머지주소" />
//             </div>
//             <div className="mobile flex justify-between gap-2 items-center">
//               <select
//                 name="mobile[]"
//                 id="mobile1"
//                 className="basis-1/3"
//                 required
//               >
//                 <option value="010">010</option>
//                 <option value="011">011</option>
//                 <option value="016">016</option>
//                 <option value="017">017</option>
//                 <option value="018">018</option>
//                 <option value="019">019</option>
//               </select>
//               -
//               <input
//                 type="text"
//                 id="mobile2"
//                 name="mobile[]"
//                 className="basis-1/3"
//                 required
//               />
//               -
//               <input
//                 type="text"
//                 id="mobile3"
//                 name="mobile[]"
//                 className="basis-1/3"
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-end">
//               <label className="px-2">기본 배송지로 저장</label>
//               <input type="checkbox" id="defaultAddress" />
//             </div>
//           </form>
//         </div>
//         <div className="adress_action_btn flex justify-between">
//           <button className="address_action text-[#313030]">취소</button>
//           <button className="address_action bg-[#313030] text-[#e3e2df]">
//             등록
//           </button>
//         </div>
//       </article>
//     </div>
//   );
// }
