import React from 'react';
import { Badge } from 'reactstrap';

const Id = ({ value }) => value ?? '';

const Title = ({ value }) => value ?? '';

const Status = ({ value }) => 
	value ? (
		<Badge className='bg-success'>Yes</Badge>
	) : (
		<Badge className='bg-danger'>No</Badge>
	)

export { Id, Title, Status };
