import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import RaisedButton from 'material-ui-ref/RaisedButton';
import TextField from 'material-ui-ref/TextField';

export default class AddSwaggerCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      definitions: JSON.parse(localStorage.getItem('definitions')) || [],
    };
  }

  handleAdd = () => {
      this.state.definitions.push({
            name: this.name,
            url: this.url
          });

      console.log(this.state.definitions);
      localStorage.setItem('definitions', JSON.stringify(this.state.definitions));
  };

  render() {
    return (
      <Card expanded={true}>
        <CardTitle title="Add Swagger" subtitle="Add's Swagger to this Sleek" expandable={true} />
        <CardText expandable={false}>
            <TextField
                ref={(field) => { this.name = field.input.value; }}
                defaultValue="Pet Store"
                floatingLabelText="Name of the API or Service"
                fullWidth={true}
                onChange={(event,value) => { this.name = value; }}
            /><br/>
            <TextField
                ref={(field) => { this.url = field.input.value; }}
                defaultValue="http://petstore.swagger.io/v2/swagger.json"
                floatingLabelText="Swagger URL"
                fullWidth={true}
                onChange={(event,value) => { this.url = value; }}
            /><br/>
        </CardText>
        <CardActions>
          <RaisedButton label="Add" secondary={true} onTouchTap={this.handleAdd} />
        </CardActions>
      </Card>
    );
  }
}
