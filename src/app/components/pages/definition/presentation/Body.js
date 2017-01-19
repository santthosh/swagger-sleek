import React, {Component, PropTypes} from 'react';
import MarkdownElement from '../../../presentation/MarkdownElement';
import {indigo500,white} from 'material-ui-ref/styles/colors';
var CodeMirror = require('react-codemirror');

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');

class Body extends Component {
    static propTypes = {
        operation: PropTypes.object,
    };

    render() {
        const {
            operation
        } = this.props;


        var body = null;
        var options = {
            lineNumbers: true,
            lineWrapping: true,
            mode: 'javascript',
        }

        if(operation && operation.parameters) {
            for(var i=0;i<operation.parameters.length;i++) {
                var parameter = operation.parameters[i];
                if(parameter.in==='body') {
                    body = parameter;
                }
            }
        }

        if(body) {
            return (
                <div className="response">
                    <MarkdownElement text={body.description} />
                    <CodeMirror value={JSON.stringify(body.schema)} options={options}/>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Body;