import React, {Component, PropTypes} from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui-ref/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui-ref/Toolbar';
import {indigo500,white} from 'material-ui-ref/styles/colors';
import RaisedButton from 'material-ui-ref/RaisedButton';

const styles = {
    actionButton: {
        fontSize:12
    }
};

class APIDefinitions extends React.Component {

    static propTypes = {
        definition: PropTypes.object,
        onRefreshSwagger:PropTypes.func,
        onRemoveSwagger:PropTypes.func,
        url: PropTypes.string.isRequired
    };

    refresh = () => {
        this.props.onRefreshSwagger(this.props.definition.name,this.props.url);
    };

    remove = () => {
        this.props.onRemoveSwagger(this.props.definition.name,this.props.url);
    };

    render() {
        const {
            definition,
        } = this.props;

        return (
            <TableRow key={definition.url} selected={false}>
                <TableRowColumn>{definition.name}</TableRowColumn>
                <TableRowColumn><a href={definition.url}>{definition.url}</a></TableRowColumn>
                <TableRowColumn>{definition.swagger.info.version}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="Refresh"
                        labelStyle={styles.actionButton}
                        primary={true}
                        onTouchTap={this.refresh}
                    />&nbsp;
                    <RaisedButton
                        label="Remove"
                        labelStyle={styles.actionButton}
                        secondary={true}
                        onTouchTap={this.remove}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default APIDefinitions;