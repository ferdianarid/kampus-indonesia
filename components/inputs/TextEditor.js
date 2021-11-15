import React, { useRef, forwardRef } from "react";
import { Editor as Tinymce } from "@tinymce/tinymce-react";

const Editor = forwardRef(({ ...props }, ref) => {
  const editorRef = useRef(null);
  return (
    <Tinymce
      ref={ref}
      apiKey={process.env.NEXT_PUBLIC_TINYMCE}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue=""
      {...props}
      textareaName={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
});

Editor.displayName = "Editor";

export default Editor;
