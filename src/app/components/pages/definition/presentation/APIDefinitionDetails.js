import React, {Component, PropTypes} from 'react';
import MarkdownElement from '../../../MarkdownElement';

class APIDefinitionDetails extends Component {

    static propTypes = {
        definitions: PropTypes.object,
        url: PropTypes.string.isRequired
    };

    render() {
        const {
            definitions,
            url
        } = this.props;

        var definition = this.props.definitions[this.props.url];
        return (definition && definition.swagger.info) ? <MarkdownElement text={"## " + definition.name + "\n ### " + definition.swagger.info.title + "\n" + definition.swagger.info.description} /> :
            <MarkdownElement text={"## 404"} />;
    }
}

export default APIDefinitionDetails;