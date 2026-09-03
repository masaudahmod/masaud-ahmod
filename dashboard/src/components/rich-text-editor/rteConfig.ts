export const RTE_HEADING_STYLES = {
  h1: "font-size: 2.25rem; font-weight: 700; color: #111827; line-height: 1.2; margin: 0 0 0.875rem 0;",
  h2: "font-size: 1.875rem; font-weight: 700; color: #111827; line-height: 1.3; margin: 1.5rem 0 0.75rem 0;",
  h3: "font-size: 1.5rem; font-weight: 700; color: #111827; line-height: 1.4; margin: 1.25rem 0 0.5rem 0;",
  h4: "font-size: 1.25rem; font-weight: 600; color: #111827; line-height: 1.5; margin: 1rem 0 0.5rem 0;",
  h5: "font-size: 1.125rem; font-weight: 600; color: #111827; line-height: 1.5; margin: 0.875rem 0 0.5rem 0;",
  h6: "font-size: 1rem; font-weight: 600; color: #374151; line-height: 1.5; margin: 0.75rem 0 0.5rem 0;",
  p: "font-size: 1rem; line-height: 1.75; color: #374151; margin: 0 0 1rem 0;",
} as const;

export const RTE_FORMATS = {
  h1: { block: "h1", attributes: { style: RTE_HEADING_STYLES.h1 } },
  h2: { block: "h2", attributes: { style: RTE_HEADING_STYLES.h2 } },
  h3: { block: "h3", attributes: { style: RTE_HEADING_STYLES.h3 } },
  h4: { block: "h4", attributes: { style: RTE_HEADING_STYLES.h4 } },
  h5: { block: "h5", attributes: { style: RTE_HEADING_STYLES.h5 } },
  h6: { block: "h6", attributes: { style: RTE_HEADING_STYLES.h6 } },
  p: { block: "p", attributes: { style: RTE_HEADING_STYLES.p } },
};

export const RTE_INIT = {
  height: 400,
  menubar: false,
  branding: false,
  promotion: false,
  entity_encoding: "raw" as const,
  verify_html: false,
  paste_remove_styles: false,
  valid_styles: {
    "*":
      "color,font-size,font-family,font-weight,font-style,text-decoration,text-align,line-height,background-color,margin,margin-top,margin-bottom,margin-left,margin-right,padding,width,height,border,display,float,list-style-type",
  },
  extended_valid_elements:
    "span[style|class],p[style|class],h1[style],h2[style],h3[style],h4[style],h5[style],h6[style],td[style|colspan|rowspan],th[style|colspan|rowspan],table[style|border|cellpadding|cellspacing|width],img[style|class|src|alt|width|height],a[style|href|target|rel],ul[style],ol[style],li[style],blockquote[style],pre[style],code[class],figure[style],figcaption[style],strong[style],em[style]",
  formats: RTE_FORMATS,
  block_formats:
    "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6",
  content_style: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
    }
    h1 { ${RTE_HEADING_STYLES.h1} }
    h2 { ${RTE_HEADING_STYLES.h2} }
    h3 { ${RTE_HEADING_STYLES.h3} }
    h4 { ${RTE_HEADING_STYLES.h4} }
    h5 { ${RTE_HEADING_STYLES.h5} }
    h6 { ${RTE_HEADING_STYLES.h6} }
    p { ${RTE_HEADING_STYLES.p} }
    img { max-width: 100%; height: auto; }
    table { border-collapse: collapse; width: 100%; }
    table td, table th { border: 1px solid #d1d5db; padding: 8px; }
    ul { list-style-type: disc; padding-left: 1.5rem; margin: 0 0 1rem 0; }
    ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0 0 1rem 0; }
    strong, b { font-weight: 700; }
  `,
  plugins: [
    "anchor",
    "autolink",
    "charmap",
    "codesample",
    "emoticons",
    "image",
    "link",
    "lists",
    "media",
    "searchreplace",
    "table",
    "visualblocks",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
};

export type RichTextEditor = {
  getContent: (args?: { format?: string }) => string;
  setContent: (content: string) => void;
};

export function getRichTextContent(editor: RichTextEditor | null | undefined) {
  return editor?.getContent({ format: "html" }) ?? "";
}