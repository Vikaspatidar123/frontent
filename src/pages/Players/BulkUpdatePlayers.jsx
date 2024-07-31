import React, { useState } from 'react';
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Container,
} from 'reactstrap';

const BulkUpdatePlayers = () => {
	const [open, setOpen] = useState('1');
	const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};

	return (
		<Container fluid>
			<Accordion open={open} toggle={toggle}>
				<AccordionItem>
					<AccordionHeader targetId="1">Update status </AccordionHeader>
					<AccordionBody accordionId="1">1</AccordionBody>
				</AccordionItem>
				<AccordionItem>
					<AccordionHeader targetId="2">Email verified </AccordionHeader>
					<AccordionBody accordionId="2">2</AccordionBody>
				</AccordionItem>
				<AccordionItem>
					<AccordionHeader targetId="3">Manage Tags</AccordionHeader>
					<AccordionBody accordionId="3">3</AccordionBody>
				</AccordionItem>
			</Accordion>
		</Container>
	);
};

export default BulkUpdatePlayers;
