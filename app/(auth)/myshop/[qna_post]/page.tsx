"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function QnAPost() {
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Strike,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "<p>내용을 입력해주세요.</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // 현재 입력된 HTML 저장
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <article className="qna-post w-full pt-10 px-4">
      <div className="heading py-6 px-4 bg-[#ffffff] border-b-1 border-b-[#afafaf]">
        <h1 className="text-xl font-serif text-center">1:1 Q&A</h1>
      </div>
      <div className="relative text-lg mt-12">
        <div className="qna-title py-6 mb-4 border-b-1 border-b-[#5a5a5a]">
          <div className="p-2 text-[#7e7d7b]">
            작성자 : {session.user.username}
          </div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="p-2"
            autoComplete="off"
          />
        </div>
        <div className="flex justify-start gap-2 mb-3 border p-2 bg-[#565451] text-white">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 px-4 ${
              editor.isActive("bold") ? "font-extrabold text-[#1d1d1d]" : ""
            }`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 px-4 ${
              editor.isActive("italic") ? "font-extrabold text-[#1d1d1d]" : ""
            }`}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 px-4 ${
              editor.isActive("underline")
                ? "font-extrabold text-[#1d1d1d]"
                : ""
            }`}
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 px-4 ${
              editor.isActive("strike") ? "font-extrabold text-[#1d1d1d]" : ""
            }`}
          >
            S
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 px-4 ${
              editor.isActive("heading", { level: 1 })
                ? "font-extrabold text-[#1d1d1d]"
                : ""
            }`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 px-4 ${
              editor.isActive("heading", { level: 2 })
                ? "font-extrabold text-[#1d1d1d]"
                : ""
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 px-4 ${
              editor.isActive("bulletList")
                ? "font-extrabold text-[#1d1d1d]"
                : ""
            }`}
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 px-4 ${
              editor.isActive("orderedList")
                ? "font-extrabold text-[#1d1d1d]"
                : ""
            }`}
          >
            1.
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 px-4 rounded"
          >
            ↩ Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 px-4 rounded"
          >
            ↪ Redo
          </button>
        </div>
        <div className="h-160 bg-[#f7f7f7] p-4">
          <EditorContent editor={editor} />
        </div>
        <button
          className="bg-[#363635] text-[#d6cebf] px-4 py-2 rounded-sm
         mt-6 absolute right-30"
        >
          문의글 작성
        </button>
      </div>
    </article>
  );
}
