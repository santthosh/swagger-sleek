import React from 'react';
import Title from 'react-title-component';
import SwaggerAPIDefinitionDetails from './containers/SwaggerAPIDefinitionDetails';

const Definition = ({ location: {query}}) => (
    <div>
        <Title render={(previousTitle) => `Swagger API Definition`} />
        <SwaggerAPIDefinitionDetails url={query.url} operation={query.operation}/>
    </div>
);

export default Definition;