import Markdown from "react-markdown";

export default function JobDescriptionMarkdown({
  children,
}: {
  children: string;
}) {
  return (
    <Markdown
      components={{
        ul: (props) => <ul {...props} className="list-inside list-disc" />,
        a: (props) => (
          <a
            {...props}
            className="font-medium text-blue-600 underline underline-offset-4"
          />
        ),
        h1: (props) => <h1 {...props} className="text-2xl font-extrabold" />,
        h2: (props) => <h2 {...props} className="text-xl font-bold" />,
        h3: (props) => <h3 {...props} className="text-lg font-bold" />,
      }}
    >
      {children}
    </Markdown>
  );
}
