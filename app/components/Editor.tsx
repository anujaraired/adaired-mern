"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

export default function Editor({
    content,
    setContent,
}: {
    content: string;
    setContent: (value: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: "", // IMPORTANT: start empty
        immediatelyRender: false,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    // ✅ THIS FIXES EDIT PREFILL
    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    const setLink = () => {
        const url = prompt("Enter URL");
        if (!url) return;
        editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="border rounded p-4 space-y-4">
            {/* Toolbar */}
            <div className="flex gap-3 flex-wrap">
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                >
                    H1
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </button>

                <button type="button" onClick={setLink}>
                    Link
                </button>
            </div>

            {/* Editor */}
            {/* <EditorContent
                editor={editor}
                className="min-h-[200px] border p-3 rounded outline-none prose max-w-none"
            /> */}
            <EditorContent
                editor={editor}
                className="min-h-[200px] border p-3 rounded outline-none prose max-w-none"
            />
        </div>
    );
}