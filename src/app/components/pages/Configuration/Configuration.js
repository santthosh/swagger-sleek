import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import AddSwaggerCard from './AddSwaggerCard';
import configuration from './configuration.md';

const Configuration = () => (
    <div>
        <Title render={(previousTitle) => 'Configuration - ${previousTitle}'} />
        <MarkdownElement text={configuration} />
        <AddSwaggerCard />
    </div>
);

export default Configuration;