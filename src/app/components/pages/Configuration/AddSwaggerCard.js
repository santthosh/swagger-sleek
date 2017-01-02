import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import RaisedButton from 'material-ui-ref/RaisedButton';
import TextField from 'material-ui-ref/TextField';
import RefreshIndicator from 'material-ui-ref/RefreshIndicator';
import {fetchSwaggerRequest} from '../../../actions/index';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

class AddSwaggerCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { store } = this.context;
    const state = store.getState();
    this.name = "Pet Store";
    this.url = "http://petstore.swagger.io/v2/swagger.json";

    return (
      <Card expanded={true}>
        <CardTitle title="Add Swagger" subtitle="Add's Swagger to this Sleek" expandable={true} />
        <CardText expandable={false}>
            <TextField
                ref={(field) => { if(field) { this.name = field.input.value; } }}
                defaultValue="Pet Store"
                floatingLabelText="Name of the API or Service"
                fullWidth={true}
                onChange={(event,value) => { this.name = value; }}
                disabled={(state.swagger.current.status === 'loading')}
            /><br/>
            <TextField
                ref={(field) => { if(field) { this.url = field.input.value; } }}
                defaultValue="http://petstore.swagger.io/v2/swagger.json"
                floatingLabelText="Swagger URL"
                fullWidth={true}
                onChange={(event,value) => { this.url = value; }}
                disabled={(state.swagger.current.status === 'loading')}
            /><br/>
        </CardText>
        <CardActions>
          <RaisedButton label="Add" disabled={(state.swagger.current.status === 'loading')} primary={true} onTouchTap={
              store.dispatch(fetchSwaggerRequest(this.name,this.url))
          } />
          <RefreshIndicator
            size={40}
            left={10}
            top={10}
            status={state.swagger.current.status}
            style={style.refresh}
          />
        </CardActions>
      </Card>
    );
  }
}

AddSwaggerCard.contextTypes = { store: React.PropTypes.object };

export default AddSwaggerCard;