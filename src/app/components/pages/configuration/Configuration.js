import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import AddAPICard from './containers/AddAPICard';
import configuration from './configuration.md';

const Configuration = () => (
    <div>
        <Title render={(previousTitle) => 'Configuration'} />
        <MarkdownElement text={configuration} />
        <AddAPICard />
    </div>
);

export default Configuration;