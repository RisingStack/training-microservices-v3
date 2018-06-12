import React, { Component } from 'react';
import { view, Link } from 'react-easy-stack';
import Card, { CardContent } from 'material-ui/Card';

const productStyle = {
  width: 350,
  maxWidth: '95%',
  margin: '10px 20px'
};

class Product extends Component {
  render() {
    const { name, description, id } = this.props.product;
    return (
      <Card style={productStyle}>
        <Link to="/product" params={{ id }}>
          <CardContent>
            <h3>{name}</h3>
            <p>{description}</p>
          </CardContent>
        </Link>
      </Card>
    );
  }
}

export default view(Product);
