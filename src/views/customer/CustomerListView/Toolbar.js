import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add customer
        </Button>
      </Box>

      <Box mt={1}>
        <Card>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
	              <Box width={250}>
	                <TextField
	                  fullWidth
	                  InputProps={{
		                  startAdornment: (
							  <InputAdornment position="start">
							    <SvgIcon
							      fontSize="small"
							      color="action"
							    >
							      <SearchIcon />
							    </SvgIcon>
							  </InputAdornment>
		                  )
		                }}
	                  placeholder="Search customer"
					  variant="outlined"
					  type="text"
					  name="txtSearch"
	                />
	              </Box>
	              <Box maxWidth={200} marginLeft={5}>
	                <TextField
	                  fullWidth
	                  placeholder="Amount"
					  variant="outlined"
					  type="number"
					  name="numAmount"
	                />
	              </Box>
	              <Box maxWidth={400} marginLeft={5}>
	                <TextField
	                  fullWidth
	                  placeholder="Content"
					  variant="outlined"
					  type="text"
					  name="txtContent"
	                />
	              </Box>
	              <Box maxWidth={200} marginLeft={5}>
	                <Button
	                  color="primary"
	                  variant="contained"
					  type="submit"
	                >
	                  Add record
	                </Button>
	              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
