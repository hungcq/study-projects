import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { doLogin } from '../actions';
import { doChangeMenuItem } from '../actions/menu-actions';
import { menuItems } from '../constants';
import './Styles.css';

class MyLogin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			error: null
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		if (this.state.username === "" || this.state.password === "") {
			this.setState({
				error: "Both username and password are required"
			});
		} else {
			this.setState({
				error: null
			});
		}
	};

	handleSubmit = (e) => {
		const { username, password } = this.state;
		// console.log("Username: ", username);
		// console.log("Password: ", password);
		if (username !== null && password !== null) {
			this.props.login(username, password);
		}
	};

	render() {
		return (
			<div className='login-form'>
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as='h2' color='teal' textAlign='center'>
							<Image src='/logo.png' /> Log-in to your account
            			</Header>
						<Form error size='large' onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									fluid
									icon='user'
									iconPosition='left'
									placeholder='Username'
									name='username'
									onChange={this.handleChange}
								/>
								<Form.Input
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Password'
									type='password'
									name='password'
									onChange={this.handleChange}
								/>
								{
									this.state.error ? <Message
										error
										content={this.state.error}
									/> : null
								}
								<Form.Button color='teal' fluid size='large'>
									Login
                				</Form.Button>
							</Segment>
						</Form>
						<Message>
							New to us? <a id='clickable' onClick={() => this.props.goToSignup()}>Sign Up</a>
						</Message>
					</Grid.Column>
				</Grid>
			</div>);
	}
}


const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	login: (username, password) => dispatch(doLogin(username, password)),
	goToSignup: () => dispatch(doChangeMenuItem(menuItems.SIGNUP)),
});

const Login = connect(mapStateToProps, mapDispatchToProps)(MyLogin);

export default Login;
