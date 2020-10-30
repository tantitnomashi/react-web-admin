/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
	Container,
	Grid,
	makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';

import { BASE_HOST_API } from "../../../utils/appConstant";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	}
}));

const Dashboard = () => {
	const classes = useStyles();

	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');
	const client = 'client1';
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalUser, setTotalUser] = useState(0);

	useEffect(() => {
		if (token == null || user == null) {// accept user when logined
			navigate('/login', { replace: true });
		}
	})
	
	useEffect(() => {

		console.log("test here");

		axios({
			method: 'get',
			url: BASE_HOST_API + 'record/findSumAdmin',
			params: {
				token,
				creator: client
			}
		}).then((response) => {
			console.log(response.data.total);
			setTotalAmount(response.data.total);
		}).catch(() => {
			// action.setSubmitting(false);
		});
		axios({
			method: 'get',
			url: BASE_HOST_API + 'user/getUserList',
			params: {
				token,
				creator: client
			}
		}).then((response) => {
			console.log(response.data.list.length);
			let lenght = response.data.list.length
			setTotalUser(lenght);
		}).catch(() => {
			// action.setSubmitting(false);
		});

	});

	return (
		<Page
			className={classes.root}
			title="Dashboard"
		>
			<Container maxWidth={false}>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						<Budget amount={totalAmount} />
					</Grid>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						<TotalCustomers amount={totalUser} />
					</Grid>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						<TasksProgress />
					</Grid>
					<Grid
						item
						lg={3}
						sm={6}
						xl={3}
						xs={12}
					>
						<TotalProfit />
					</Grid>
					<Grid
						item
						lg={8}
						md={12}
						xl={9}
						xs={12}
					>
						<Sales />
					</Grid>
					<Grid
						item
						lg={4}
						md={6}
						xl={3}
						xs={12}
					>
						<TrafficByDevice />
					</Grid>
					<Grid
						item
						lg={4}
						md={6}
						xl={3}
						xs={12}
					>
						<LatestProducts />
					</Grid>
					<Grid
						item
						lg={8}
						md={12}
						xl={9}
						xs={12}
					>
						<LatestOrders />
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

export default Dashboard;
