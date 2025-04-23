import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

function WikiArticlePage() {
  const { wikiType, wikiArticleName } = useParams();
  const [markdownContent, setMarkdownContent] = React.useState("");

  const baseUrl =
    "https://raw.githubusercontent.com/maxmulder03/BlueNucleusWiki/main";

  useEffect(() => {
    fetch(baseUrl + `/${wikiType}/${encodeURIComponent(wikiArticleName)}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wiki article");
        }
        return response.text();
      })
      .then((data) => {
        setMarkdownContent(data);
      })
      .catch((error) => {
        fetchBackupArticle();
        console.warn(error);
      });
  }, [wikiArticleName, wikiType]);

  const fetchBackupArticle = async () => {
    fetch(
      "https://raw.githubusercontent.com/maxmulder03/BlueNucleusWiki/main/fallback.md",
    )
      .then((response) => response.text())
      .then((data) => {
        setMarkdownContent(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="prose prose-neutral m-4 mx-auto w-[70%] bg-[var(--primary-background)] rounded-3xl p-8">
        <Markdown
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  language={match[1]}
                  style={codeTheme}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdownContent}
        </Markdown>
      </div>
    </>
  );
}

export default WikiArticlePage;
