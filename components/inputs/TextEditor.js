import React, { useEffect, useRef } from "react";

const Editor = ({ minHeight, onChange, editorLoaded, name, value }) => {
    const defaultMinHeight = "200px";
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onReady={(editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                            minHeight || defaultMinHeight;
                    }}
                    onFocus={(event, editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                            minHeight || defaultMinHeight;
                    }}
                    onBlur={(event, editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                            minHeight || defaultMinHeight;
                    }}
                    onChange={(event, editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                            minHeight || defaultMinHeight;
                        const data = editor.getData();
                        onChange(data);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
};

export default Editor;
