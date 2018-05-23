import React, { Component, Fragment } from 'react';
import { view, storage, path, params, Link } from 'react-easy-stack';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import appStore from './appStore';
import Product from './Product';

const listStyle = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  margin: '0 -20px'
};

const addButtonStyle = {
  position: 'fixed',
  right: 20,
  bottom: 20
};

function ProductList({ pageResolved }) {
  const products = pageResolved
    ? appStore.products
    : storage.cache[params.search] || [];

  return (
    <Fragment>
      <div style={listStyle}>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {appStore.isLoggedIn &&
        ReactDOM.createPortal(
<<<<<<< HEAD
          <Zoom in={path[0] === 'products'}>
            <Link to="/product" style={addButtonStyle}>
              <Button color="primary" variant="fab">
                <AddIcon />
              </Button>
            </Link>
          </Zoom>,
=======
          <Link to="/product" style={addButtonStyle}>
            <Button color="primary" variant="fab">
              <AddIcon />
            </Button>
          </Link>,
>>>>>>> frontend WIP
          document.getElementById('action-button')
        )}
    </Fragment>
  );
}

export default view(ProductList);
