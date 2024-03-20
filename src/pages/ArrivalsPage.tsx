import { useContext } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FlightContext, FlightContextType } from '../contexts/FlightContext';
import Countdown from 'react-countdown';

function ArrivalsPage() {
	const { state } = useContext(FlightContext) as FlightContextType;

	const columns: GridColDef[] = [
		{
			field: 'Code',
			headerName: 'Code',
			width: 150,
			filterable: false,
			renderCell(params: any) {
				return (
					// bir saat boyunca çalışacak sayfa yenilenmez ise
					<Countdown
						date={Date.now() + 360000}
						renderer={(props) =>
							props.seconds % 2 === 0 ? (
								<>{params.row.Origin.Code}</>
							) : (
								<> Deneme </>
							)
						}
					/>
				);
			},
		},
		{
			field: 'FlightNumber',
			headerName: 'FlightNumber',
			width: 150,
			filterable: true,
		},
		{ field: 'Status', headerName: 'Status', width: 150, sortable: true },
		// {
		// 	field: 'Id',
		// 	headerName: 'Id',
		// 	width: 150,
		// 	sortable: true,
		// 	hideable: true,
		// },
	];

	function getRowId(row: any) {
		return row.Id;
	}

	return (
		<DataGrid
			getRowId={getRowId}
			initialState={{
				pagination: {
					paginationModel: { pageSize: 5, page: 0 },
				},
			}}
			columns={columns}
			rows={state.arrivals}
			// autoPageSize={true}
			pageSizeOptions={[5, 10, 25, 50]}
		/>
		// <div style={{ padding: '10px' }}>
		// 	{state.arrivals &&
		// 		state.arrivals.map((item: any) => {
		// 			return (
		// 				<div key={item.Id}>
		// 					<div>
		// 						Origin : {item.Origin.Code}
		// 						<br></br>
		// 						Flight Number: {item.FlightNumber}
		// 						<br></br>
		// 						Status : {item.Status}
		// 					</div>
		// 					<Button variant="outlined">Deneme</Button>
		// 					<hr></hr>
		// 				</div>
		// 			);
		// 		})}
		// </div>
	);
}

export default ArrivalsPage;
