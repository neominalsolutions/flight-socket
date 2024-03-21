import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlightType } from '../contexts/FlightContext';
import { SetupInterceptors } from '../networks/axiosSetup';
import { RootDispatch, RootState } from '../store/store';
import {
	ReduxFlightState,
	deleteItem,
	fetchFlights,
	insertItem,
	updateItem,
} from '../store/features/FlightSlice';

function UseReduxArrivalFlights(socket: WebSocket) {
	// redux içerisinde state güncellemek için ise dispatch kullanılır
	const dispatch = useDispatch<RootDispatch>();
	const state = useSelector<RootState>(
		(state) => state.flightState
	) as ReduxFlightState;

	useEffect(() => {
		dispatch(fetchFlights());
		// asenkron olarak veri çekip client state doldurduğumuz yer.
		//195.175.26.178:8080

		socket.onopen = onConnection;
		socket.onmessage = onMessageRecieved;
		socket.onclose = onClose;
	}, []);

	useEffect(() => {
		if (state.fetched) {
			alert('Veri Yüklendi');
		}
	}, [state.fetched]);

	const onMessageRecieved = (evt: any) => {
		// socketten verile json string olarak gelir.
		const socketData = JSON.parse(evt.data);
		// gelen veriyi JSON objesine çevirdik.
		console.log('socketData', socketData);

		if (socketData.FlightType === FlightType.arrival) {
			console.log('... flightType');
			if (socketData.MessageType === 'insert') {
				dispatch(insertItem(socketData));
				// dispatch ile action tetikledik.
				// socketData.ArrivalFlight payload bilgisi
			} else if (socketData.MessageType === 'update') {
				dispatch(updateItem(socketData));
			} else {
				dispatch(deleteItem(socketData));
			}
		}
	};
	const onConnection = () => {
		console.log('socket is connected');
	};
	const onClose = () => {
		console.log('Connection is closed...');
	};

	return {
		state,
	};
}

export default UseReduxArrivalFlights;
