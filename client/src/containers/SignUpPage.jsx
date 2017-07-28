import React, { PropTypes } from 'react';
import SignUpForm from '../components/signup/SignUpForm.jsx';
import Auth from '../modules/Auth';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        first_name: '',
        last_name:'',
        email: '',
        username: '',
        name: '',
        password: ''
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.onChangeFromDate = this.onChangeFromDate.bind(this);

  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  onChangeFromDate(state, date) {
    const user = this.state.user;
    user['birthday'] = date.toISOString().substr(0,10);
    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const first_name = encodeURIComponent(this.state.user.first_name);
    const last_name = encodeURIComponent(this.state.user.last_name);
    const email = encodeURIComponent(this.state.user.email);
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const birthday = encodeURIComponent(this.state.user.birthday);

    const formData = `first_name=${first_name}&last_name=${last_name}&email=${email}&username=${username}&password=${password}&birthday=${birthday}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
        });

        Auth.authenticateUser(xhr.response.access_token);
        this.context.router.replace('/');

      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        onChangeFromDate={this.onChangeFromDate}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default SignUpPage;
