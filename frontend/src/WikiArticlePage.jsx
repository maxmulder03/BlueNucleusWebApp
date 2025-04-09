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
      <h1>
        {" "}
        Blue Nucleus / <span className="h1-subpage"> wiki </span>{" "}
      </h1>
      <div className="prose prose-neutral m-4 mx-auto w-[70%] bg-[var(--primary-background)] rounded-3xl p-8">
        <Markdown
          children={markdownContent}
          components={{
            h1: ({ ...props }) => <h2 className="md md-heading" {...props} />,
            h2: ({ ...props }) => (
              <h3
                className="md md-subheading pt-8 pb-2 font-bold text-4xl"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h4
                className="md md-subheading pt-4 pb-2 font-semibold text-xl"
                {...props}
              />
            ),
            h4: ({ ...props }) => (
              <h5 className="md md-subheading text-lg" {...props} />
            ),
            h5: ({ ...props }) => (
              <h6 className="md md-subheading text-lg" {...props} />
            ),
            p: ({ ...props }) => <p className="md" {...props} />,
            a: ({ ...props }) => <a className="md" {...props} />,
            ul: ({ ...props }) => (
              <ul className="md ml-8 list-disc" {...props} />
            ),
            li: ({ ...props }) => <li className="md" {...props} />,
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={codeTheme}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </>
  );
}

export default WikiArticlePage;
