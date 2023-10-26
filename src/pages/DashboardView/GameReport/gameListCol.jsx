// import React from 'react';
// import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const IdValue = ({ cell }) => cell.value ?? '';

const NAME = ({ cell }) => cell.value ?? '';

const NUMBEROFROUNDS = ({ cell }) => cell.value ?? '';

const NUMBERFPLAYER = ({ cell }) => cell.value ?? '';

const TOTALBETSGAME = ({ cell }) => cell.value ?? '';

const TOTALWINS = ({ cell }) => cell.value ?? '';
const GAMEREVENUE = ({ cell }) => cell.value ?? '';
const PAYOUT = ({ cell }) => cell.value ?? '';

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
