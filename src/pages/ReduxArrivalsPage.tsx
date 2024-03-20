import { useSelector } from 'react-redux';
import { ArrivalFlight, ReduxFlightState } from '../store/features/FlightSlice';
import { RootState } from '../store/store';

function ReduxArrivalsPage() {
	// useSelector ile state redux üzerinden dinleniyor.
	const state = useSelector<RootState>(
		(state) => state.flightState
	) as ReduxFlightState;

	return (
		<div style={{ padding: '10px' }}>
			{state.arrivals &&
				state.arrivals.map((item: ArrivalFlight) => {
					return (
						<div key={item?.Id}>
							<div>
								{/* {item?.Origin && (
									<>
										<span>{item?.Origin?.Code}</span>
									</>
								)}
								{item?.Origin && item?.Previous} */}
								Origin : {item?.Origin?.Code}
								<br></br>
								Flight Number: {item?.FlightNumber}
								<br></br>
								Status : {item?.Status}
								<br></br>
								SPA : {(item as any).Sta}
								<br></br>
							</div>
							<hr></hr>
						</div>
					);
				})}
		</div>
	);
}

export default ReduxArrivalsPage;
