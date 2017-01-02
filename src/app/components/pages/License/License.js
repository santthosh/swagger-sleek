import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import license from './license.md';

const License = () => (
  <div>
    <Title render={(previousTitle) => `Help - ${previousTitle}`} />
    <MarkdownElement text={license} />
  </div>
);

export default License;
