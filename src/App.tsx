import React, { useContext, useEffect } from 'react';
import './App.css';
import {
	ArrivalContextType,
	ArrivalsContext,
} from './contexts/ArrivalsContext';
import { Link, useRoutes } from 'react-router-dom';
import ArrivalsPage from './pages/ArrivalsPage';
import DeparturesPage from './pages/DeparturesPage';

function App() {
	const { addItem, deleteItem, updateItem } = useContext(
		ArrivalsContext
	) as ArrivalContextType;

	const onMessageRecieved = (evt: any) => {
		const socketData = JSON.parse(evt.data);
		console.log('socketData', socketData);

		if (socketData.data.flightType === 'arrival') {
			if (socketData.eventType === 'create') {
				addItem(socketData.data);
			} else if (socketData.eventType === 'update') {
				updateItem(socketData.data);
			} else {
				deleteItem(socketData.data.id);
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
		const socket = new WebSocket('ws://localhost:5000');
		socket.onopen = onConnection;
		socket.onmessage = onMessageRecieved;
		socket.onclose = onClose;

		return () => {
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
