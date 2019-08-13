import { combineReducers } from 'redux';

import articles from './articles';
import jokes from './jokes';

const rootReducer = combineReducers({
    articles,
    jokes
});

export default rootReducer;
