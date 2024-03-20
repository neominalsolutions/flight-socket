import { configureStore } from '@reduxjs/toolkit';
import { FlightReducer } from './features/FlightSlice';
// ContextAPI deki create Context benzer.
const store = configureStore({
	reducer: {
		flightState: FlightReducer,
		// aState: null,
	},
});

// store üzerinden flightState ismi ile state'e erişeceğiz.

// store.getState ile uygulama içerisinde tanımlamış tüm Slice'a ait stateleri veriyor.
export type RootState = ReturnType<typeof store.getState>; // state select etme kodu
export type RootDispatch = typeof store.dispatch;
// actionları tetiklemek için böyle bir tip kullanıcağız.

export default store;
