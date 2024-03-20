import React, { useContext, useEffect } from 'react';
import './App.css';
import {
	FlightContextType,
	FlightContext,
	FlightType,
} from './contexts/FlightContext';
import { Link, useRoutes } from 'react-router-dom';
import ArrivalsPage from './pages/ArrivalsPage';
import DeparturesPage from './pages/DeparturesPage';
import useArrivalFlights from './hooks/UseArrivalFlights';
import UseReduxArrivalFlights from './hooks/UseReduxArrivalFlights';
import ReduxArrivalsPage from './pages/ReduxArrivalsPage';

function App() {
	const socket = new WebSocket('ws:195.175.26.178:8080');
	const { state } = useArrivalFlights(socket);
	// const {state1} = useDepartureFlight(socket);
	// const { state } = UseReduxArrivalFlights(socket);
	const routes = useRoutes([
		{
			path: 'arrivals',
			Component: ArrivalsPage,
		},
		{
			path: 'redux-arrivals',
			Component: ReduxArrivalsPage,
		},
		{
			path: 'departures',
			Component: DeparturesPage,
		},
	]);

	return (
		<>
			<Link to="/arrivals">Arrivals</Link>{' '}
			<Link to="/redux-arrivals">Redux Arrivals</Link>{' '}
			<Link to="/departures">Departures</Link>
			{routes}
		</>
	);
}

export default App;
