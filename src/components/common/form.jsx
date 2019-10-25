import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return !error ? null : error.details[0].message;
  };

  handleChange = ({ target: input }) => {
    const data = { ...this.state.data };

    data[input.name] = input.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({
      data,
      errors
    });
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null; //false

    const errors = {}; //true
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleSubmit = event => {
    event.preventDefault(); // not refresh
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        options={options}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
