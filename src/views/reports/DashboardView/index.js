/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
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

	const token = localStorage.getItem('token');
	const client = 'client1';
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalUser, setTotalUser] = useState(1);

	useEffect(() => {

		console.log("test here");
		axios({
			method: 'get',
			url: 'http://localhost:5555/record/findSumAdmin',
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
						<TotalCustomers />
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
