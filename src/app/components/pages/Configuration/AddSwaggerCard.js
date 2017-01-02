import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui-ref/Card';
import RaisedButton from 'material-ui-ref/RaisedButton';
import TextField from 'material-ui-ref/TextField';

export default class AddSwaggerCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  handleAdd = () => {
    this.setState({expanded: true});
  };

  render() {
    return (
      <Card expanded={this.state.expanded}>
        <CardTitle title="Add Swagger" subtitle="Add's Swagger to this Sleek" expandable={true} />
        <CardText expandable={false}>
            <TextField
                id="add-swagger-name"
                defaultValue="Pet Store"
                floatingLabelText="Name of the API or Service"
                fullWidth={true}
            /><br/>
            <TextField
                id="add-swagger-url"
                defaultValue="http://petstore.swagger.io/v2/swagger.json"
                floatingLabelText="Swagger URL"
                fullWidth={true}
            /><br/>
        </CardText>
        <CardActions>
          <RaisedButton label="Add" primary={true} onTouchTap={this.handleAdd} />
        </CardActions>
      </Card>
    );
  }
}
