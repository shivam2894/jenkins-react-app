import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducers from './auth/authReducers';
import thunk from 'redux-thunk';
import inventoryReducers from './inventory/inventoryReducers';
import transactionReducers from './transaction/transactionReducers';
import teamReducer from './manageTeam/manageTeamReducer';
import { contactReducer } from './contacts/contactReducer';

const rootReducer = combineReducers({
    auth: authReducers,
    inventory: inventoryReducers,
    transaction: transactionReducers,
    team: teamReducer,
    contacts: contactReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
