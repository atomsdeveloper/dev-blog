"use client";

// React Markdown
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdonw({ markdown }: SafeMarkdownProps) {
  return (
    <div className="prose prose-slate w-full max-w-none overflow-hidden prose-a:transition prose-a:no-underline prose-a:hover:underline prose-a:text-blue-500 prose-a:hover:text-blue-700 prose-img:mx-auto md:prose-lg">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return "";

            return (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]" {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
