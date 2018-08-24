const initialState = {
    searchKey: {},
    blockchainData: {}
}

const commonReducer = (state = initialState, action) => {
    if (action.type === "BLOCKCHAIN_DATA") {
        console.log("-------action: ", action);
        return {...state, blockchainData: action.data};
    } else if (action.type === "SEARCH_REDUCER") {
        return {...state, searchKey: action.data};
    } else {
        return state;
    }
}

export default commonReducer
