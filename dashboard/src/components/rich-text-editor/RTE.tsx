import { Editor, type IAllProps } from "@tinymce/tinymce-react";
import { RTE_INIT } from "./rteConfig";

interface RTEProps {
  onInit?: IAllProps["onInit"];
  initialValue?: string;
  onChange?: (content: string) => void;
}

export default function RTE({ onInit, initialValue, onChange }: RTEProps) {
  return (
    <div>
      <Editor
        onInit={onInit}
        apiKey="gzrac5yos5cowlh3gqemdym7xw3o67oefek5ongo6rjewa45" // Replace with your TinyMCE API key
        init={RTE_INIT}
        initialValue={initialValue || ""}
        onChange={(_event, editor) => {
          onChange?.(editor.getContent());
        }}
      />
    </div>
  );
}

// export { getRichTextContent, type RichTextEditor } from "./rteConfig";
