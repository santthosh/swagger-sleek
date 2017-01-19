import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui-ref/Toolbar';
import {indigo500,white} from 'material-ui-ref/styles/colors';
import MarkdownElement from '../../../presentation/MarkdownElement';
import Responses from './Responses';
import Body from './Body';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
    toolbar: {
        backgroundColor:'GRAY'
    },
    toolbarPOST: {
        backgroundColor:'GREEN',
        height:'5px'
    },
    toolbarGET: {
        backgroundColor:'INDIGO',
        height:'5px'
    },
    toolbarPUT: {
        backgroundColor:'ORANGE',
        height:'5px'
    },
    toolbarDELETE: {
        backgroundColor:'RED',
        height:'5px'
    },
    toolbarPATCH: {
        backgroundColor:'YELLOW',
        height:'5px'
    },
    toolbarTitle: {
        color:white,
        fontSize:16
    },
    snackBar: {
        textAlign:'center'
    }
};


class APIOperationDetails extends Component {

    static propTypes = {
        definition: PropTypes.object,
        path: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired
    };

    getToolBarStyle(){
        if(this.props.method.toUpperCase() == 'POST') {
            return style.toolbarPOST;
        }
        if(this.props.method.toUpperCase() == 'PUT') {
            return style.toolbarPUT;
        }
        if(this.props.method.toUpperCase() == 'GET') {
            return style.toolbarGET;
        }
        if(this.props.method.toUpperCase() == 'PATCH') {
            return style.toolbarPATCH;
        }
        if(this.props.method.toUpperCase() == 'DELETE') {
            return style.toolbarDELETE;
        }
        return style.toolbar
    }

    render() {
        const {
            definition,
            path,
            method
        } = this.props;

        return(
            <div id={definition.swagger.paths[path][method].operationId}>
                <Toolbar style={style.toolbar}>
                    <ToolbarGroup>
                        <ToolbarTitle text={method.toUpperCase() + " " + path} style={style.toolbarTitle}/>
                    </ToolbarGroup>
                </Toolbar>
                <Toolbar style={this.getToolBarStyle()}>
                </Toolbar>
                <Card expanded={true}>
                    <CardText expandable={false}>
                        <MarkdownElement text={definition.swagger.paths[path][method].summary}/>
                    </CardText>
                    <CardText expandable={false}>
                        <Body operation={definition.swagger.paths[path][method]}/>
                    </CardText>
                    <CardText expandable={false}>
                        <Responses operation={definition.swagger.paths[path][method]}/>
                    </CardText>
                </Card>
                <br/>
            </div>
        );
    }
}

export default APIOperationDetails;