import React, {Component, PropTypes} from 'react';
import MarkdownElement from '../../../MarkdownElement';

class APIDefinitionDetails extends Component {

    static propTypes = {
        definitions: PropTypes.array,
        index: PropTypes.string.isRequired
    };

    static defaultProps = {
        index: '0',
    };

    render() {
        const {
            definitions,
            index
        } = this.props;

        var definition = this.props.definitions[this.props.index];
        return (definition && definition.swagger.info) ? <MarkdownElement text={"## " + definition.name + "\n ### " + definition.swagger.info.title + "\n" + definition.swagger.info.description} /> :
            <MarkdownElement text={"## 404"} />;
    }
}

export default APIDefinitionDetails;