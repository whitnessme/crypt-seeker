import { csrfFetch } from "./csrf";

const CREATE_HAUNT = 'haunt/createHaunt';
const LOAD_HAUNTS = 'haunt/loadHaunts';
const LOAD_HAUNTS_BY_HOST = 'haunt/loadHauntsbyHost';
const LOAD_ONE_HAUNT = 'haunt/loadOneHaunt'
const UPDATE_HAUNT = 'haunt/update'
const DELETE_HAUNT = 'haunt/removeHaunt'
// const DELETE_HAUNT_FEATURES = 'haunt/removeHauntFeatures'

export const createHaunt = newHaunt => {
    return {
        type: CREATE_HAUNT,
        newHaunt,
    };
};

export const loadHaunts = haunts => {
    return {
        type: LOAD_HAUNTS,
        haunts
    };
};

export const loadHauntsbyHost = hostHaunts => {
    return {
        type: LOAD_HAUNTS_BY_HOST,
        hostHaunts
    };
};

export const loadOneHaunt = oneHaunt => {
    return {
        type: LOAD_ONE_HAUNT,
        oneHaunt
    };
};

export const update = updatedHaunt => {
    return {
        type: UPDATE_HAUNT,
        updatedHaunt
    };
};

export const removeHaunt = removedHaunt => {
    return {
        type: DELETE_HAUNT,
        removedHaunt
    };
};

// export const removeHauntFeatures = features => {
//     return {
//         type: DELETE_HAUNT_FEATURES,
//         features
//     }
// }

// Thunk Creators

export const getHaunts = () => async (dispatch, getState) => {
    const res = await fetch('/api/haunts');
    if (res.ok) {
        const haunts = await res.json()
        return dispatch(loadHaunts(haunts))
    }
    return await res.json();
};

export const getHauntsbyHostId = (userId) => async (dispatch, getState) => {
    const res = await fetch(`/api/haunts/host/${userId}`);
    if (res.ok) {
        const hostHaunts = await res.json()
        dispatch(loadHauntsbyHost(hostHaunts))
    }
    return await res.json()
};

export const getOneHaunt = (hauntId) => async (dispatch, getState) => {
    const res = await fetch(`/api/haunts/${hauntId}`);
    if (res.ok) {
        const haunt = await res.json()
 
        if(!haunt) return null
        return dispatch(loadOneHaunt(haunt))
    };
    return await res.json()
};

export const createNewHaunt = (payload) => async (dispatch, getState) => {
    const res = await csrfFetch('/api/haunts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const newHaunt = await res.json()
        dispatch(createHaunt(newHaunt))
        return newHaunt;
    };
};

export const updateHaunt = (payload, hauntId) => async (dispatch) => {
    const res = await csrfFetch(`/api/haunts/${hauntId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        const haunt = await res.json()
        dispatch(update(haunt))
        return haunt;
    }
};

export const deleteHaunt = (hauntId) => async (dispatch, getState) => {
    const res = await csrfFetch(`/api/haunts/${hauntId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if (res.ok) {
        // const deletedHaunt = await res.json();
        dispatch(removeHaunt(hauntId))
        // return deletedHaunt;
    }
};


// Reducer
const initialState = { entries:{} };

const hauntReducer = (state = initialState, action) => {
    let newState;
    let entries;
    switch(action.type) {
        case LOAD_HAUNTS:
            newState = {}
            entries = {}
            action.haunts.forEach(haunt => entries[haunt.id] = haunt)
            newState.entries = entries;
            return newState;
        case LOAD_HAUNTS_BY_HOST:
            newState = {}
            entries = {}
            action.hostHaunts.forEach(haunt => entries[haunt.id] = haunt)
            newState.entries = entries;
            return newState;
        case LOAD_ONE_HAUNT:
            newState = {...state};
            entries = {};
            entries[action.oneHaunt.id] = action.oneHaunt;
            newState.entries = entries;
            return newState;   
        case CREATE_HAUNT:
            newState = {...state};
            newState.entries = { [action.newHaunt.id] : action.newHaunt};
            return newState;
        case UPDATE_HAUNT:
            newState = {...state}
            entries = {...state.entries};
            entries[action.updatedHaunt.id] = action.updatedHaunt
            newState.entries = entries
            return newState;
        case DELETE_HAUNT:
            newState = {...state};
            delete newState.entries[action.hauntId]
            return newState;
        default:
            return state;
    };
};

export default hauntReducer;