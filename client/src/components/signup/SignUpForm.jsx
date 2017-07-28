import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const SignUpForm = ({
  onSubmit,
  onChange,
  onChangeFromDate,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      <div>
        <TextField
          floatingLabelText="First Name"
          name="first_name"
          errorText={errors.first_name}
          onChange={onChange}
          value={user.first_name}
        />
      </div>

      <div>
        <TextField
            floatingLabelText="Last Name"
            name="last_name"
            errorText={errors.last_name}
            onChange={onChange}
            value={user.last_name}
        />
      </div>

      <div>
        <TextField
            floatingLabelText="Email"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Username"
          name="username"
          errorText={errors.username}
          onChange={onChange}
          value={user.username}
        />
      </div>

      <div>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <DatePicker
            name="birthday"
            hintText="Birthday"
            onChange={onChangeFromDate}
            errorText={errors.birthday}
        />
      </div>

      <div>
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeFromDate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
