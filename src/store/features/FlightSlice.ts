import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FlightType } from '../../contexts/FlightContext';

export interface ReduxFlightState {
	arrivals: any[];
	departures: any[];
}

const initialState: ReduxFlightState = {
	arrivals: [],
	departures: [],
};

interface PayloadState {
	ArrivalFlight: ArrivalFlight;
	FlightType: string;
}

export interface ArrivalFlight {
	Origin: any;
	FlightNumber: string;
	Status: string;
	Id: number;
}

// FLIGHT_INSERT
const flightSlice = createSlice({
	name: 'FLIGHT',
	initialState: initialState,
	reducers: {
		insertItem: (
			state: ReduxFlightState,
			action: PayloadAction<PayloadState>
		) => {
			console.log('payload', action.payload);
			if (action.payload.FlightType === FlightType.arrival) {
				const exists = state.arrivals.find(
					(x) => x.Id === action.payload.ArrivalFlight.Id
				);
				// state böyle bir bilgisi yoksa ekle
				if (!exists) {
					state.arrivals = [...state.arrivals, action.payload.ArrivalFlight];
					// state içindeki arrivals güncellenmiş oldu
				}
			}
		},
		deleteItem: (state: ReduxFlightState, action: PayloadAction<any>) => {
			if (action.payload.FlightType === FlightType.arrival) {
				const filteredItems = state.arrivals.filter(
					(x) => x.Id !== action.payload.ArrivalFlight.Id
				);
				state.arrivals = [...filteredItems];
			}
		},
		updateItem: (state: ReduxFlightState, action: PayloadAction<any>) => {
			console.log('FlightType', action.payload);
			if (action.payload.FlightType === FlightType.arrival) {
				if (state.arrivals) {
					const exists = state.arrivals.find(
						(x) => x.Id === action.payload.ArrivalFlight.Id
					);

					// elimizde böyle bir kayıt varsa

					if (exists) {
						const _arrivals = state.arrivals.map((record: any) => {
							if (record.Id === action.payload.ArrivalFlight.Id) {
								return action.payload.ArrivalFlight; // güncel olanı döndür
							} else {
								return record; // eski datayı döndür.
							}
						});

						state.arrivals = [..._arrivals];
					} else {
						state.arrivals = [...state.arrivals, action.payload.ArrivalFlight];
					}
				}
			}
		},
	},
});

// store reducer import etmek için reducer'ı dışarıya çıkardık.
export const FlightReducer = flightSlice.reducer;
// actionları dışarıya çıkardık
export const { insertItem, deleteItem, updateItem } = flightSlice.actions;

// 1. adım Store.ts dosyası tanımı
// 2. adım Slice create işlemi
// 3. adım Reducer'ın store tanımlanması
// 4. adım Index.tsx dosyasında storeProvider ile uygulamanın sarmallanması
// 5. adım artık componentlerden action'ın yollanması veya state çekilmesi
