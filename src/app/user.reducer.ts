import { User } from './user';
import { Action } from '@ngrx/store';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export function userReducer (state: User[] = [], action) {

	switch (action.type) {
		case ADD_USER: 
			return [...state, action.payload];
		case REMOVE_USER:
			return state.filter(user => user.id !== action.payload.id);
		default: return state;
	}
}