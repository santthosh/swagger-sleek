import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui-ref/Table';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui-ref/Toolbar';
import {indigo500,white} from 'material-ui-ref/styles/colors';


class Responses extends Component {

    static propTypes = {
        operation: PropTypes.object,
    };

    render() {
        const {
            operation
        } = this.props;

        var responseTableRows = function() {
            var tableRows = [];
            console.log(operation);
            if(operation) {
                var responses = operation.responses;
                for (var key in responses) {
                    if (responses.hasOwnProperty(key)) {
                        var response = responses[key];
                        //TODO: Handle Schema and Headers
                        var headers = response.headers;
                        var headerAggregate = "";
                        for (var headerKey in headers) {
                            if(headers.hasOwnProperty(headerKey)) {
                                var header = headers[headerKey];
                                headerAggregate += headerKey + " : " + header.description + "\n";
                            }
                        }

                        var schema = "";
                        if(response.schema) {
                            schema += response.schema.type;
                        }

                        tableRows.push(
                            <TableRow key={key} selected={false}>
                                <TableRowColumn>{key}</TableRowColumn>
                                <TableRowColumn>{response.description}</TableRowColumn>
                                <TableRowColumn>{schema}</TableRowColumn>
                                <TableRowColumn>{headerAggregate}</TableRowColumn>
                            </TableRow>
                        );
                    }
                }
            }

            return tableRows;
        };

        return(
            <div>
                <Table                 fixedHeader={false}
                    fixedFooter={false}
                    selectable={false}
                    multiSelectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableHeaderColumn tooltip="Responses" style={{textAlign: 'left',fontSize:16, color:'gray'}}>Responses</TableHeaderColumn>
                        <TableRow>
                            <TableHeaderColumn tooltip="HTTP Status Code">HTTP Status Code</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Reason">Reason</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Response Model">Response Model</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Headers">Headers</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={false}
                        showRowHover={false}
                        stripedRows={false}
                    >
                        {responseTableRows()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Responses;