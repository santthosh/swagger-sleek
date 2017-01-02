import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import help from './help.md';

const Help = () => (
  <div>
    <Title render={(previousTitle) => `Help - ${previousTitle}`} />
    <MarkdownElement text={help} />
  </div>
);

export default Help;
