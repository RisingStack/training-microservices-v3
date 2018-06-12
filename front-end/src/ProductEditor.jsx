import React, { Component } from 'react';
import { view, store, params, route } from 'react-easy-stack';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import appStore, * as app from './appStore';

const productShell = {
  name: '',
  description: '',
  price: 0,
  currency: 'USD',
  available: undefined
};

class ProductEditor extends Component {
  store = store({
    changes: params.id ? {} : productShell
  });

  onChange = ev => {
    this.store.changes[ev.target.name] = ev.target.value;
  };

  onCheckChange = ev => {
    this.store.changes[ev.target.name] = ev.target.checked;
  };

  onSave = async () => {
    if (params.id) {
      await app.editProduct(params.id, this.store.changes);
    } else {
      const product = await app.saveProduct(this.store.changes);
    }
    route({ to: '/products' });
  };

  render() {
    const { product } = this.props;
    const { changes } = this.store;
    const { name, description, price, available } = Object.assign(
      {},
      product,
      changes
    );
    const label = params.id ? 'Edit Product' : 'Add Product';

    return (
      <FormGroup>
        <TextField
          name="name"
          label="Name"
          margin="dense"
          value={name}
          onChange={this.onChange}
        />
        <TextField
          name="description"
          label="Description"
          margin="dense"
          multiline={true}
          value={description}
          onChange={this.onChange}
        />
        <TextField
          name="price"
          label="Price"
          margin="dense"
          type="number"
          value={price}
          onChange={this.onChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="available"
              checked={available}
              indeterminate={available === undefined}
              onChange={this.onCheckChange}
            />
          }
          label="Avaliable"
        />
        <Button onClick={this.onSave} variant="raised" color="primary">
          {label}
        </Button>
      </FormGroup>
    );
  }
}

export default view(ProductEditor);
