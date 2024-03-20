import { useSelector } from 'react-redux';
import { ReduxFlightState } from '../store/features/FlightSlice';
import { RootState } from '../store/store';

function ReduxArrivalsPage() {
	// useSelector ile state redux üzerinden dinleniyor.
	const state = useSelector<RootState>(
		(state) => state.flightState
	) as ReduxFlightState;

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

export default ReduxArrivalsPage;
