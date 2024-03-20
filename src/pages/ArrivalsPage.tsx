import React, { useContext, useEffect } from 'react';
import {
	FlightContextType,
	ArrivalsContext,
} from '../contexts/ArrivalsContext';

function ArrivalsPage() {
	const { state } = useContext(ArrivalsContext) as FlightContextType;

	return (
		<div style={{ padding: '10px' }}>
			{state.arrivals &&
				state.arrivals.map((item: any) => {
					return (
						<div key={item.Id}>
							<div>
								Origin : {item.Origin.Code}
								<br></br>
								Flight Number: {item.FlightNumber}
								<br></br>
								Status : {item.Status}
							</div>
							<hr></hr>
						</div>
					);
				})}
		</div>
	);
}

export default ArrivalsPage;
