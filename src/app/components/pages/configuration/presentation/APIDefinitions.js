import React, {Component, PropTypes} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui-ref/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui-ref/Toolbar';
import {indigo500,white} from 'material-ui-ref/styles/colors';
import SwaggerAPIDefinitionTableRow from '../containers/SwaggerAPIDefinitionTableRow';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
    toolbar: {
        backgroundColor:indigo500
    },
    toolbarTitle: {
        color:white
    },
    empty: {
        display:'none'
    },
    notEmpty: {
    },
    actionButton: {
        fontSize:12
    }
};

class APIDefinitions extends React.Component {

    static propTypes = {
        definitions: PropTypes.object,
    };

    render() {
        const {
            definitions,
        } = this.props;

        var hideIfNecessary = function(definitions) {
            if(definitions) {
                return (Object.keys(definitions).length === 0) ? styles.empty: styles.notEmpty;
            }
            return styles.empty;
        };

        var definitionTableRows = function(parent,definitions) {
            var tableRows = [];
            if(definitions) {
                for (var key in definitions) {
                    if (definitions.hasOwnProperty(key)) {
                        var definition = definitions[key];
                        tableRows.push(
                            <SwaggerAPIDefinitionTableRow
                                key={definition.url} url={definition.url}
                            />
                        );
                    }
                }
            }

            return tableRows;
        };

        return (
            <div style={hideIfNecessary(definitions)}>
                <Toolbar style={styles.toolbar}>
                    <ToolbarGroup>
                        <ToolbarTitle text="Swagger Configurations" style={styles.toolbarTitle}/>
                    </ToolbarGroup>
                </Toolbar>
                <Card expanded={true}>
                    <CardText expandable={false}>
                        <Table
                            fixedHeader={false}
                            fixedFooter={false}
                            selectable={false}
                            multiSelectable={false}
                        >
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                enableSelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn tooltip="Name of the API or Service">Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Swagger URL">URL</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Version">Version</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={false}
                                showRowHover={false}
                                stripedRows={false}
                            >
                                {definitionTableRows(this,definitions)}
                            </TableBody>
                        </Table><br/>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default APIDefinitions;