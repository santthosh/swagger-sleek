import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import AddAPICard from './containers/AddAPICard';
import SwaggerAPIDefinitions from './containers/SwaggerAPIDefinitions';
import configuration from './configuration.md';

const Configuration = () => (
    <div>
        <Title render={(previousTitle) => 'Configuration'} />
        <MarkdownElement text={configuration} />
        <SwaggerAPIDefinitions/><br/>
        <AddAPICard />
    </div>
);

export default Configuration;