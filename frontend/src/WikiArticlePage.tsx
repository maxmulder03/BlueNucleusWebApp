import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./Hide.module.css";

interface Heading {
  type: string;
  content: string;
}

function WikiArticlePage() {
  const { wikiType, wikiArticleName } = useParams();
  const [markdownContent, setMarkdownContent] = React.useState("");
  const [wikiHeadings, setWikiHeadings] = useState<Heading[]>([]);
  const headingsRef = useRef<Heading[]>([]);

  const baseUrl =
    "https://raw.githubusercontent.com/maxmulder03/BlueNucleusWiki/main";

  const updateHeadings = (children: React.ReactNode, type: string) => {
    let content = "";
    if (typeof children === "string") {
      content = children;
    } else if (Array.isArray(children)) {
      content = children.join("");
    }
    if (content.trim() !== "") headingsRef.current.push({ type, content });
  };

  const headingRenderer = (headingType: string, headingContent: string) => {
    switch (headingType) {
      case "h1":
        return <h1>{headingContent}</h1>;
      case "h2":
        return <h2 className="pl-5 pb-1 pr-2 truncate"> {headingContent}</h2>;
      case "h3":
        return <h3 className="pl-7 pb-1 pr-2 truncate">{headingContent}</h3>;
      case "h4":
        return <h4 className="pl-9 pb-1 pr-2 truncate">{headingContent}</h4>;
      case "h5":
        return <h5 className="pl-11 pb-1 pr-2 truncate">{headingContent}</h5>;
      case "h6":
        return <h6 className="pl-13 pb-1 pr-2 truncate">{headingContent}</h6>;
    }
  };

  //Disables scrolling for the wiki article page
  useEffect(() => {
    document.body.classList.add(styles.wikipages);

    return () => {
      document.body.classList.remove(styles.wikipages);
    };
  }, []);

  useEffect(() => {
    fetch(
      baseUrl + `/${wikiType}/${encodeURIComponent(wikiArticleName ?? "")}.md`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wiki article");
        }
        return response.text();
      })
      .then((data) => {
        headingsRef.current = [];
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

  useEffect(() => {
    // after markdown content is rendered, update the wikiHeadings
    setWikiHeadings([...headingsRef.current]);
  }, [markdownContent]);

  return (
    <>
      {/* Wiki Article Grid */}
      <div className="grid grid-cols-12 w-full h-full auto-rows-fr min-h-0 pb-16">
        {/* Table of Contents */}
        <div
          box-="square"
          shear-="top"
          className="col-start-1 col-end-3 h-full"
        >
          <span is-="badge" variant-="background0" className="pb-10">
            Pages
          </span>
        </div>
        <div
          box-="square"
          shear-="top"
          className="col-start-3 col-end-13 h-full"
        >
          <h1 is-="badge" variant-="background0">
            &nbsp;{wikiArticleName}
          </h1>
          <div className="grid grid-cols-1">
            <div className="p-8 col-start-1 col-end-9 overflow-y-scroll h-150">
              <div className="h-full">
                <Markdown
                  components={{
                    h1: () => {
                      return <div className="hidden"></div>;
                    },
                    h2: ({ ...props }) => {
                      updateHeadings(props.children, "h2");
                      return <h2 className="pt-2 pb-2" {...props} />;
                    },
                    h3: ({ ...props }) => {
                      updateHeadings(props.children, "h3");
                      return <h3 className="pt-2 pb-2" {...props} />;
                    },
                    h4: ({ ...props }) => {
                      updateHeadings(props.children, "h4");
                      return <h4 className="pt-2 pb-2" {...props} />;
                    },
                    h5: ({ ...props }) => {
                      updateHeadings(props.children, "h5");
                      return <h5 className="pt-2 pb-2" {...props} />;
                    },
                    h6: ({ ...props }) => {
                      updateHeadings(props.children, "h6");
                      return <h6 className="pt-2 pb-2" {...props} />;
                    },
                    p: ({ ...props }) => {
                      return <p className="pb-[2ch]" {...props} />;
                    },
                    ul: ({ ...props }) => {
                      return <ul className="pb-[2ch]" {...props} />;
                    },
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
            <div
              className="
              col-start-9
              col-end-13
              relative
              before:content-['']
              before:absolute
              before:top-0
              before:left-[calc(0.5ch-var(--box-border-width)/2)]
              before:w-[var(--box-border-width)]
              before:h-full
              before:bg-[var(--background2)]"
            >
              <div>
                <span is-="badge" variant-="background0" className="pb-10">
                  Contents
                </span>
                {wikiHeadings.map((heading) =>
                  headingRenderer(heading["type"], heading["content"]),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WikiArticlePage;
