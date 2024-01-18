// import React from 'react';
// import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const IdValue = ({ cell }) => cell;

const NAME = ({ cell }) => cell;

const NUMBEROFROUNDS = ({ cell }) => (cell || 0);

const NUMBERFPLAYER = ({ cell }) => (cell || 0);

const TOTALBETSGAME = ({ cell }) => (cell || 0);

const TOTALWINS = ({ cell }) => (cell || 0);
const GAMEREVENUE = ({ cell }) => (cell || 0);
const PAYOUT = ({ cell }) => (cell || 0);

export {
	IdValue,
	NAME,
	NUMBEROFROUNDS,
	NUMBERFPLAYER,
	TOTALBETSGAME,
	TOTALWINS,
	GAMEREVENUE,
	PAYOUT,
};
