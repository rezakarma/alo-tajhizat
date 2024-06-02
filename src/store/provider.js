"use client"

import { Provider } from 'react-redux';
import store from './store';

function ReduxProvider(props) {
    return <Provider store={store}>{props.children}</Provider>
}
export default ReduxProvider;