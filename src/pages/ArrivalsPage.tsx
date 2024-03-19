import React, { useContext, useEffect } from 'react';
import {
	ArrivalContextType,
	ArrivalsContext,
} from '../contexts/ArrivalsContext';

function ArrivalsPage() {
	const { state } = useContext(ArrivalsContext) as ArrivalContextType;

	return (
		<div style={{ padding: '10px' }}>
			{state.arrivals &&
				state.arrivals.map((item: any) => {
					return (
						<div key={item.id}>
							<div>
								Origin : {item.origin}
								<br></br>
								Flight Number: {item.flightNumber}
								<br></br>
								Status : {item.status}
							</div>
							<hr></hr>
						</div>
					);
				})}
		</div>
	);
}

export default ArrivalsPage;
