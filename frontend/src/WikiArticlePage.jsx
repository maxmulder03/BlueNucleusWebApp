import React from "react";
import { useEffect, useState } from "react";
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

  const [wikiTitle, setWikiState] = useState(wikiArticleName);

  return (
    <>
      {/* Wiki Article Grid*/}
      <div className="grid grid-cols-12">
        {/* Table of Contents */}
        <div
          box-="square contain:!top"
          className="col-start-1 col-end-3 h-full"
        >
          <span is-="badge" variant-="background0" className="pb-10">
            Pages
          </span>
        </div>
        <div
          box-="square contain:!top"
          className="col-start-3 col-end-12 h-full"
        >
          <h1 is-="badge" variant-="background0">
            &nbsp;{wikiTitle}
          </h1>
          <div className="p-8">
            <Markdown
              components={{
                h1: (props) => {
                  const { children, className, ...rest } = props;
                  setWikiState(children.toString());
                  return <div className="hidden"></div>;
                },
                h2: ({ ...props }) => <h2 className="pt-6 pb-1" {...props} />,
                h3: ({ ...props }) => <h3 className="pt-6 pb-1" {...props} />,
                h4: ({ ...props }) => <h4 className="pt-6 pb-1" {...props} />,
                h5: ({ ...props }) => <h5 className="pt-6 pb-1" {...props} />,
                h6: ({ ...props }) => <h6 className="pt-6 pb-1" {...props} />,
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
        </div>
      </div>
    </>
  );
}

export default WikiArticlePage;
