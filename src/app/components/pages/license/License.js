import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../presentation/MarkdownElement';
import license from './license.md';

const License = () => (
  <div>
    <Title render={(previousTitle) => `Help`} />
    <MarkdownElement text={license} />
  </div>
);

export default License;
