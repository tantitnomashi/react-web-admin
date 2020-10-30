/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
	makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));


const CustomerListView = () => {
	const classes = useStyles();
	// const [customers] = useState(data);
	const token = localStorage.getItem('token');
	const creator = 'client1';
	const [responseData, setResponseData] = useState([]);

	useEffect(() => {
		axios({
			method: 'get',
			url: 'http://localhost:5555/record/getRecords',
			params: {
				token,
				creator: creator
			}
		}).then((response) => {
			setResponseData(response.data.list);
		}).catch(() => {
			// action.setSubmitting(false);
		});
	});


	return (
		<Page
			className={classes.root}
			title="Customers"
		>
			<Container maxWidth={false}>
				<Toolbar />
				<Box mt={3}>
					<Results customers={responseData} />
				</Box>
			</Container>
		</Page>
	);
};

export default CustomerListView;
