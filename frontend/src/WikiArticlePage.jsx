import React from 'react';
import ReactMarkdown from 'react-markdown';
import markdownContent from './markdownTest.md?raw'; // TODO: Update to fetch backend 

function WikiArticlePage() {

  return (
    <>
      <h1> Blue Nucleus / <span className="h1-subpage"> wiki </span> </h1>
      <div className="m-4 mx-auto w-[70%] bg-[var(--primary-background)] rounded-3xl p-8 border-8 border-[var(--primary-border)]">
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => (
              <h2 className="text-3xl font-bold text-center my-4" {...props} />
            ),
            h2: ({ ...props }) => (
              <h3 className="pt-4 text-left" {...props} />
            ),
            h3: ({ ...props }) => (
              <h4 className="pt-4 text-left" {...props} />
            ),
            h4: ({ ...props }) => (
              <h5 className="pt-4 text-left" {...props} />
            ),
            h5: ({ ...props }) => (
              <h6 className="pt-4 text-left" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="text-left" {...props} />
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </>
  );
}

export default WikiArticlePage;
