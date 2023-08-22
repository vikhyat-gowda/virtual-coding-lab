export interface EditorRef {
    getEditorState: () => { language_id: string; source_code: string };
}
