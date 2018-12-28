import React from 'react';
import AuthenticationService from '../services/Authentication';
import auth from '../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    AuthenticationService.login(this.state).then((res) => {
      if (res.data && res.data.access_token) {
        auth.setAccessToken(res.data.access_token);
        this.setState({ loading: false });
      }
    });
  };

  render () {
    return (
      <div className="container my-5 py-5">
        <h6 className="my-5 text-center">
          Welcome to autonomous warehouse application. <br/>
          Please login or contact your local administrator to register.
        </h6>
        <div className="card card-login">
          <div className="card-body">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group px-3">
                <input
                  type="text"
                  name="username"
                  placeholder="Your username"
                  className="form-control mb-3"
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-primary pull-right mr-3" type="submit" disabled={this.state.loading}>Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
