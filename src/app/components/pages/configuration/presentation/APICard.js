import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import RaisedButton from 'material-ui-ref/RaisedButton';
import TextField from 'material-ui-ref/TextField';
import RefreshIndicator from 'material-ui-ref/RefreshIndicator';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui-ref/Toolbar';
import {indigo500,white} from 'material-ui-ref/styles/colors';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
    toolbar: {
        backgroundColor:indigo500
    },
    toolbarTitle: {
        color:white
    }
};

class APICard extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        onAddSwagger: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired,
    };

    name = this.props.name;
    url = this.props.url;

    handleTouchTap = () => {
        this.props.onAddSwagger(this.name,this.url);
    };

    render() {
        const {
            status
        } = this.props;

        return (
            <div>
                <Toolbar style={style.toolbar}>
                    <ToolbarGroup>
                        <ToolbarTitle text="Add Swagger" style={style.toolbarTitle}/>
                    </ToolbarGroup>
                </Toolbar>
                <Card expanded={true}>
                    <CardText expandable={false}>
                        <TextField
                            ref={(field) => { if(field) { this.name = field.input.value; } }}
                            defaultValue={this.name}
                            floatingLabelText="Name of the API or Service"
                            fullWidth={true}
                            onChange={(event,value) => { this.name = value; }}
                            disabled={(status === 'loading')}
                        /><br/>
                        <TextField
                            ref={(field) => { if(field) { this.url = field.input.value; } }}
                            defaultValue={this.url}
                            floatingLabelText="Swagger URL"
                            fullWidth={true}
                            onChange={(event,value) => { this.url = value; }}
                            disabled={(status === 'loading')}
                        /><br/>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="Add" disabled={(status === 'loading')} primary={true}
                                      onTouchTap={this.handleTouchTap} />
                        <RefreshIndicator
                            size={40}
                            left={10}
                            top={10}
                            status={status}
                            style={style.refresh}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default APICard;