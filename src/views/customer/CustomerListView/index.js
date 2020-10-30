/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

import { BASE_HOST_API } from "../../../utils/appConstant";

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

	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');

	useEffect(() => {
		if (token == null || user == null) {// accept user when logined
			navigate('/login', { replace: true });
		}
	})

	const creator = "client1"//localStorage.getItem("user").username
	// const [customers] = useState(data);
	const [responseData, setResponseData] = useState([]);
	const [recordContent, setRecordContent] = useState({
		numAmount: 0,
		txtContent: 0,
	});
	useEffect(() => {
		getAllUser()
	}, [setResponseData]);

	const getAllUser = () => {
		axios({
			method: 'get',
			url: BASE_HOST_API + 'record/getRecords',
			params: {
				token: token,
				creator: creator
			}
		}).then((response) => {
			setResponseData(response.data.list)
			return response.data.list
		}).catch(() => {
			return [];
		});
	}

	const handleSubmit = () => {
		let token = localStorage.getItem("token");
		let creator = localStorage.getItem("username");
		let body = {
			content: recordContent.txtContent,
			quantity: recordContent.numAmount,
			creator: creator
		}
		axios({
			method: 'post',
			url: BASE_HOST_API + 'record/create',
			data: body,
			params: {
				token: token
			},
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			console.log(res)
			getAllUser()
		}).catch((e) => {
			console.log(e)
		});
	}
	const handleChangeInfoRecord = (e) => {
		console.log('add record val ' + e.target.name)
		setRecordContent({
			...recordContent,
			[e.target.name]: [e.target.value] + ""
		})
		console.log(recordContent)
	}

	return (
		<Page
			className={classes.root}
			title="Customers"
		>
			<Container maxWidth={false}>
				<Toolbar handleSubmit={handleSubmit} handleChange={handleChangeInfoRecord} />
				<Box mt={3}>
					<Results customers={responseData} />
				</Box>
			</Container>
		</Page>
	);
};

export default CustomerListView;
