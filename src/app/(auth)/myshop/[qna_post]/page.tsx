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
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export default function QnAPost() {
  const [_content, setContent] = useState("");
  const { status, data: session } = useSession();
  const ACTIVE_CSS = "font-extrabold text-background cursor-pointer";

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || !session) {
      signIn(undefined, { callbackUrl: "/myshop/qna_post" });
      return;
    }
  }, [status]);

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
    <article className="qna-post w-full pt-6 md:pt-10 md:px-4">
      <div className="heading py-4 bg-[#ffffff]">
        <h1 className="text-lg md:text-xl text-center">1:1 문의</h1>
      </div>
      <div className="relative text-sm md:text-md lg:text-lg mt-4 md:mt-10">
        <div className="qna-title pt-4 md:py-6 mb-2 space-y-2 md:space-y-4">
          <div className="px-2 text-graytext">
            작성자 : {session?.user?.username}
          </div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="p-2 border-b-1 border-b-[#808080] w-full"
            autoComplete="off"
          />
        </div>
        <div className="flex justify-evenly gap-1 md:gap-2 lg:gap-4 border bg-foreground text-background">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive("bold") ? ACTIVE_CSS : "cursor-pointer"}`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor.isActive("italic") ? ACTIVE_CSS : "cursor-pointer"}`}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor.isActive("underline") ? ACTIVE_CSS : "cursor-pointer"}`}
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${editor.isActive("strike") ? ACTIVE_CSS : "cursor-pointer"}`}
          >
            S
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${
              editor.isActive("heading", { level: 1 }) ? ACTIVE_CSS : "cursor-pointer"
            }`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p${
              editor.isActive("heading", { level: 2 }) ? ACTIVE_CSS : "cursor-pointer"
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive("bulletList") ? ACTIVE_CSS : "cursor-pointer"}`}
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive("orderedList") ? ACTIVE_CSS : "cursor-pointer"}`}
          >
            1.
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 px-4 rounded cursor-pointer"
          >
            ↩ Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="rounded cursor-pointer"
          >
            ↪ Redo
          </button>
        </div>
        <div className="h-160 bg-[#ffffff] p-4">
          <EditorContent editor={editor} />
        </div>
        <button
          className="bg-foreground text-background text-sm px-2 py-1 md:px-4 md:py-2 rounded-xs
         mt-6 absolute right-0 cursor-pointer"
        >
          문의글 작성
        </button>
      </div>
    </article>
  );
}
