import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwlTheme from "prism-react-renderer/themes/nightOwl";
import meta from "./meta.js";

const Code = ({ children, className: [languageClassName] }) => {
  const language =
    languageClassName && languageClassName.replace(/language-/, "");
  return (
    <Highlight
      {...defaultProps}
      theme={nightOwlTheme}
      code={children.trim()}
      language={language}
    >
      {({
        className,
        style,
        tokens = [],
        getLineProps,
        getTokenProps,
        ...rest
      }) => {
        return (
          <pre
            className={className}
            style={style}
            css={{
              padding: "1rem",
              borderRadius: "4px",
              fontSize: "2.5vh",
              width: "65ch",
              overflow: "auto",
              alignSelf: "center"
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({ token, key })}
                    css={{ fontSize: ".75em" }}
                  />
                ))}
              </div>
            ))}
          </pre>
        );
      }}
    </Highlight>
  );
};

const Provider = ({
  title,
  speaker,
  twitter,
  date,
  event,
  eventLink,
  description,
  children,
  image
}) => (
  <React.Fragment>
    <nav
      css={{
        padding: "1rem",
        display: "flex",
        width: "100vw",
        position: "fixed",
        top: 0,
        background: "white",
        fontFamily: "'Libre Baskerville', Baskerville, sans-serif",
        fontSize: "1.5rem",
        color: "#222"
      }}
    >
      <span css={{ fontStyle: "italic" }}>{speaker}</span>&nbsp;👩🏻‍🌾
      <span css={{ padding: "0 .25em", color: "#aaa" }}>—</span>
      <span css={{ color: "#aaa" }}>{title}</span>
      <a
        href={eventLink}
        target="_blank"
        css={{
          marginLeft: "auto",
          color: "#aaa",
          fontStyle: "italic",
          fontSize: ".75em",
          textDecoration: "none"
        }}
      >{`${event} — ${date}`}</a>
    </nav>
    <main>{children}</main>
    <footer
      css={{
        padding: "1rem",
        display: "flex",
        width: "100vw",
        position: "fixed",
        bottom: 0,
        background: "white",
        fontFamily: "'Libre Baskerville', Baskerville, sans-serif",
        fontSize: "1.5rem",
        color: "#222"
      }}
    >
      <a
        css={{
          color: "#222",
          textDecoration: "none",
          fontStyle: "italic",
          padding: "0 .25em",
          marginLeft: "auto"
        }}
        href={`https://twitter.com/${twitter}`}
        target="_blank"
      >
        @{twitter}
      </a>
    </footer>
  </React.Fragment>
);

const custom = {
  css: {
    fontSize: "18px",
    'div[name="wrapper"]': {
      display: "flex",
      flexDirection: "column",
      width: "90vw"
    },
    "p, blockquote, ul, small": {
      textAlign: "left",
      margin: "1rem 0"
    },
    small: {
      fontSize: ".5em"
    },
    "blockquote + small": {
      paddingLeft: "calc(2rem + 7px)"
    },
    blockquote: {
      width: "60vw",
      textAlign: "left",
      lineHeight: 1.5,
      fontStyle: "italic",
      borderLeft: "7px solid #222",
      paddingLeft: "2rem"
    },
    img: {
      maxHeight: "70vh",
      objectFit: "scale-down"
    },
    "ul li": {
      lineHeight: 1.5
    },
    "blockquote li": {
      listStyle: "none"
    }
  },
  font: "'Libre Baskerville', Baskerville, serif",
  components: {
    code: Code
  },
  code: {
    color: "#222",
    background: "#efefef",
    padding: ".1em .2em",
    borderRadius: "4px"
  },
  monospace: "Dank Mono",
  googleFont:
    "https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&display=swap&subset=latin-ext",
  /**
   * Looks like this is the only way to pass down a component to wrap around everything
   * Semantically should not write meta data here
   */
  Provider: ({ children }) => <Provider {...meta}>{children}</Provider>
};

export default custom;
