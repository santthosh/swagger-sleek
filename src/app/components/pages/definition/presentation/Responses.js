import React, {Component, PropTypes} from 'react';
import MarkdownElement from '../../../presentation/MarkdownElement';
import {indigo500,white} from 'material-ui-ref/styles/colors';
require('./responses.css');

class Responses extends Component {

    static propTypes = {
        operation: PropTypes.object,
    };

    render() {
        const {
            operation
        } = this.props;

        var responses = function() {
            var text = '';
            if(operation) {
                var responses = operation.responses;
                for (var key in responses) {
                    if (responses.hasOwnProperty(key)) {
                        var response = responses[key];
                        //TODO: Handle Schema code formatting
                        var headers = response.headers;
                        var headerAggregate = "";
                        for (var headerKey in headers) {
                            if(headers.hasOwnProperty(headerKey)) {
                                var header = headers[headerKey];
                                headerAggregate +=  "**" + headerKey + "** - " + header.description + "<br/>";
                            }
                        }

                        var schema = "";
                        if(response.schema) {
                            schema =  "```" + JSON.stringify(response.schema) + "```";
                        }

                        text += `| ${key} | ${response.description} | ${schema} | `+ headerAggregate +` |\n`;
                    }
                }
            }

            return text;
        };

        var header = `**Responses**\n
| HTTP status code | Reason | Model | Headers |
|:-----|:-----|:-----|:-----:|
`;
        var text = header+responses();

        return (
            <div className="response">
                <MarkdownElement text={text} />
            </div>
        );
    }
}

export default Responses;