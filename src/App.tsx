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

function App() {
	localStorage.setItem(
		'access_token',
		'aekArS0RlnYsFSCKrFgW/COP+5vIC7QShKsCoNz+7cQLrL6rFJMcM56U/3ZNQNOe293nxlNWg4m/2dZCSK4pNqD/PUCuXRHGKzbvg+v9Q0CeiquWL4y0hnynHC0AjBjbijQGsJqqHMVTflocWj8+z6aJ3qOBG02JujRAPeTxzcAZzTznbffjdwSEmHkYWsmMezU2hOJi2Wn4lEimMOh/TWGQkpz62BTJEKmR43XTDk2B88/QEHNVes2wMzJLf5pa'
	);

	const socket = new WebSocket('ws:195.175.26.178:8080');
	const { state } = useArrivalFlights(socket);
	// const {state1} = useDepartureFlight(socket);
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
