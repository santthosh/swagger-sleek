import React from 'react';
import Title from 'react-title-component';
import SwaggerAPIDefinitionDetails from './containers/SwaggerAPIDefinitionDetails';

const Definition = ({ params: {index}}) => (
    <div>
        <Title render={(previousTitle) => `Swagger API Definition`} />
        <SwaggerAPIDefinitionDetails index={index}/>
    </div>
);

export default Definition;