import React, { useContext, useEffect } from 'react';
import './App.css';
import {
	FlightContextType,
	ArrivalsContext,
	FlightType,
} from './contexts/ArrivalsContext';
import { Link, useRoutes } from 'react-router-dom';
import ArrivalsPage from './pages/ArrivalsPage';
import DeparturesPage from './pages/DeparturesPage';

function App() {
	const { addItem, deleteItem, updateItem } = useContext(
		ArrivalsContext
	) as FlightContextType;

	const onMessageRecieved = (evt: any) => {
		// socketten verile json string olarak gelir.
		const socketData = JSON.parse(evt.data);
		// gelen veriyi JSON objesine çevirdik.
		console.log('socketData', socketData);

		if (socketData.FlightType === FlightType.arrival) {
			console.log('... flightType');
			if (socketData.MessageType === 'insert') {
				addItem(socketData.ArrivalFlight, FlightType.arrival);
			} else if (socketData.MessageType === 'update') {
				updateItem(socketData.ArrivalFlight, FlightType.arrival);
			} else {
				deleteItem(socketData.ArrivalFlight.Id, FlightType.arrival);
			}
		}
	};
	const onConnection = () => {
		console.log('socket is connected');
	};
	const onClose = () => {
		console.log('Connection is closed...');
	};

	useEffect(() => {
		// const socket = new WebSocket('ws://localhost:5000');

		fetch(
			'https://testservice.antalya-airport.aero/api/flightlayout/ArrivalFlights',
			{
				method: 'POST',
				headers: {
					Authorization:
						'Bearer aekArS0RlnYsFSCKrFgW/COP+5vIC7QShKsCoNz+7cQLrL6rFJMcM56U/3ZNQNOe293nxlNWg4m/2dZCSK4pNqD/PUCuXRHGKzbvg+v9Q0CeiquWL4y0hnynHC0AjBjbijQGsJqqHMVTflocWj8+z1Hi32oJc672BPIsYIIz/autfXUBpdoX9IoKVIEWeBjIxUtxkCYQXixTflocWj8+z8efDe7KxsQtBPIsYIIz/avGnxgolegqUaAqImVKgpxP',
				},
			}
		)
			.then((response) => {
				return response;
			})
			.then((data) => {
				console.log('data', data);
			})
			.catch((err) => {
				console.log('err', err);
			});

		const socket = new WebSocket('ws:195.175.26.178:8080');
		//195.175.26.178:8080
		socket.onopen = onConnection;
		socket.onmessage = onMessageRecieved;
		socket.onclose = onClose;

		return () => {
			// yeniden hard reload yapılırsa bu durumda eski socket connection close olsun. clean up function, eğer ki app.tsx domdan çıkarasa ki durumu temsil.
			// connection kaybedip hard reload. sayfa refleshlenince.
			socket.close();
		};
	}, []);

	const routes = useRoutes([
		{
			path: 'arrivals',
			Component: ArrivalsPage,
		},
		{
			path: 'departures',
			Component: DeparturesPage,
		},
	]);

	return (
		<>
			<Link to="/arrivals">Arrivals</Link>{' '}
			<Link to="/departures">Departures</Link>
			{routes}
		</>
	);
}

export default App;
