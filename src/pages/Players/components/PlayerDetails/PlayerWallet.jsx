import React from 'react';
import TableContainer from '../../../../components/Common/TableContainer';

const PlayerWallet = () => {
	console.log('HERE');
	return (
		<div>
			<h4>Player Wallet</h4>
			<TableContainer
				columns={[]}
				data={[]}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
			/>
		</div>
	);
};

export default PlayerWallet;
