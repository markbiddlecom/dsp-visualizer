import { promises as fs } from "fs";

import { Newline, render, Text } from "ink";
import { format } from "prettier";
import React, { useState, useEffect } from "react";

import * as COMPONENTS from "./gen-components";
import * as RECIPES from "./gen-recipes";
import * as TECHNOLOGIES from "./gen-technologies";

export type Generator = {
    file: string,
    name: string,
    generate: (MessageFunction: MessageFunction) => Promise<string>,
};
export type MessageFunction = (newMessage: JSX.Element) => void;

function prettify(source: string) {
  return format(source, { parser: "typescript", printWidth: 120 });
}

function generate(generator: Generator, msg: MessageFunction) {
  return generator.generate(msg)
    .then(prettify)
    .then(source => {
      msg(<Text>Writing output...</Text>);
      return fs.writeFile(generator.file, source, "utf-8");
    });
}

const Spinner = () => {
  const ANIMATION = [
    "[ 🚚 🚌 🚄 🚤 ✈ ]",
    "[ 🚌 🚄 🚤 ✈ 🚚 ]",
    "[ 🚄 🚤 ✈ 🚚 🚌 ]",
    "[ 🚤 ✈ 🚚 🚌 🚄 ]",
    "[ ✈ 🚚 🚌 🚄 🚤 ]",
  ];
  const [ idx, setIdx ] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(idx => idx + 1), 1000 / ANIMATION.length);
    return () => clearInterval(timer);
  }, []);
  return <Text> {ANIMATION[idx % ANIMATION.length]}</Text>;
};

const App = () => {
  const GENERATORS = [ COMPONENTS.GENFILE, RECIPES.GENFILE, TECHNOLOGIES.GENFILE ];

  const [ text, setText ] = useState(GENERATORS.map(() => undefined) as (JSX.Element | undefined)[]);
  const [ done, setDone ] = useState(GENERATORS.map(({file}) => <Spinner key={file} />) as JSX.Element[]);

  useEffect(() => {
    GENERATORS.map((g, index) => {
      function msg(element: JSX.Element) {
        setText(text => {
          const newText = Array.from(text);
          newText[index] = element;
          return newText;
        });
      }
      return generate(g, msg).then(() => {
        setText(text => {
          const newText = Array.from(text);
          newText[index] = <Text>{g.file}</Text>;
          return newText;
        });
        setDone(done => {
          const newDone = Array.from(done);
          newDone[index] = <Text color="greenBright"> ✔</Text>;
          return newDone;
        });
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, []);

  return <Text>{
    GENERATORS.map((generator, index) => <Text key={generator.name}>
      <Text color="yellow" bold>{generator.name}</Text>
      { done[index] }
      { text[index] ? <Text> ({text[index]})</Text> : false }
      <Newline />
    </Text>)
  }</Text>;
};

render(<App />);

