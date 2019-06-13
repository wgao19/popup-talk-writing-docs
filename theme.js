import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import meta from "./meta.js";

// night owl theme with customizations
const nightOwlTheme = /*: PrismTheme */ {
  plain: {
    color: "#d6deeb",
    backgroundColor: "#011627"
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      }
    },
    {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "yellow",
        fontStyle: "italic"
      }
    },
    {
      types: ["string", "url"],
      style: {
        color: "rgb(173, 219, 103)"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(214, 222, 235)"
      }
    },
    {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    },
    {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "rgb(199, 146, 234)"
      }
    },
    {
      types: ["selector", "doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(255, 203, 139)"
      }
    },
    {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "rgb(127, 219, 202)"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)"
      }
    },
    {
      types: ["property"],
      style: {
        color: "rgb(128, 203, 196)"
      }
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)"
      }
    }
  ]
};

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
              fontSize: "3vh",
              width: "65ch",
              maxWidth: "95%",
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
  image,
  displayHeader,
  displayFooter
}) => (
  <React.Fragment>
    {displayHeader && (
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
        <span css={{ fontStyle: "italic", color: "#aaa" }}>{title}</span>
        <a
          href={eventLink}
          target="_blank"
          css={{
            marginLeft: "auto",
            color: "#aaa",
            textDecoration: "none"
          }}
        >{`${event} — ${date}`}</a>
      </nav>
    )}
    <main>{children}</main>
    {displayFooter && (
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
    )}
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
      fontSize: ".5em",
      maxWidth: "40vw"
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
