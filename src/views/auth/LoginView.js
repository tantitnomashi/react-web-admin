/* eslint-disable no-tabs */
/* eslint-disable indent */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
	makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		height: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const LoginView = () => {
	const classes = useStyles();
	const navigate = useNavigate();



	const handleLogin = (val, action) => {
		console.log("test onsubmit");
		const body = {
			username: val.username,
			password: val.password
		};
		// const body = {
		// username: "admin",
		// password: "admin"
		// };
		console.log("test login");
		axios({
			method: 'post',
			url: 'http://localhost:5555/auth/login',
			data: body,
			headers: { 'Content-Type': 'application/json' }
		}).then((response) => {
			console.log(response);
			if (response.data.token != null) {
				localStorage.setItem('token', response.data.token);
				navigate('/app/dashboard', { replace: true });
			} else {
				action.setFieldError('username', response.data.message);
				action.setSubmitting(false);
			}
		}).catch(() => {
			action.setSubmitting(false);
		});

	}

	return (
		<Page
			className={classes.root}
			title="Login"
		>
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				justifyContent="center"
			>
				<Container maxWidth="sm">
					<Formik
						initialValues={{
							username: '',
							password: ''
						}}
						validationSchema={Yup.object().shape({
							username: Yup.string().max(255).required('Username is required'),
							password: Yup.string().max(255).required('Password is required')
						})}
						onSubmit={(val, action) => { handleLogin(val, action) }}>
						{({
							errors,
							handleBlur,
							handleChange,
							handleSubmit,
							isSubmitting,
							touched,
							values
						}) => (
								<form onSubmit={handleSubmit}>
									<Box mb={3}>
										<Typography
											color="textPrimary"
											variant="h2"
										>
											Sign in
                  </Typography>
										<Typography
											color="textSecondary"
											gutterBottom
											variant="body2"
										>
											Sign in on the internal platform
                  </Typography>
									</Box>
									<Grid
										container
										spacing={3}
									>
										<Grid
											item
											xs={12}
											md={6}
										>
											<Button
												color="primary"
												fullWidth
												startIcon={<FacebookIcon />}
												onClick={handleSubmit}
												size="large"
												variant="contained"
											>
												Login with Facebook
                    </Button>
										</Grid>
										<Grid
											item
											xs={12}
											md={6}
										>
											<Button
												fullWidth
												startIcon={<GoogleIcon />}
												onClick={handleSubmit}
												size="large"
												variant="contained"
											>
												Login with Google
                    </Button>
										</Grid>
									</Grid>
									<Box
										mt={3}
										mb={1}
									>
										<Typography
											align="center"
											color="textSecondary"
											variant="body1"
										>
											or login with email address
                  </Typography>
									</Box>
									<TextField
										error={Boolean(touched.username && errors.username)}
										fullWidth
										helperText={touched.username && errors.username}
										label="Username"
										margin="normal"
										name="username"
										onBlur={handleBlur}
										onChange={handleChange}
										type="text"
										value={values.username}
										variant="outlined"
									/>
									<TextField
										error={Boolean(touched.password && errors.password)}
										fullWidth
										helperText={touched.password && errors.password}
										label="Password"
										margin="normal"
										name="password"
										onBlur={handleBlur}
										onChange={handleChange}
										type="password"
										value={values.password}
										variant="outlined"
									/>
									<Box my={2}>
										<Button
											color="primary"
											disabled={isSubmitting}
											fullWidth
											size="large"
											type="submit"
											variant="contained"
										>
											Sign in now
                  </Button>
									</Box>
									<Typography
										color="textSecondary"
										variant="body1"
									>
										Don&apos;t have an account?
                  {' '}
										<Link
											component={RouterLink}
											to="/register"
											variant="h6"
										>
											Sign up
                  </Link>
									</Typography>
								</form>
							)}
					</Formik>
				</Container>
			</Box>
		</Page>
	);
};

export default LoginView;
