
export const blockchainDataReducer = (blockchainData) => ({
    type: 'BLOCKCHAIN_DATA',
    data:{
        blockchainData
    }
});

export function initData() {
    return (dispatch) => {
        //Get data from Web3
        let blockchainData = {};
        dispatch(blockchainDataReducer(blockchainData));
    };
};


export const searchReducer = (searchKey) => ({
    type: 'SEARCH_REDUCER',
    data:{
        searchKey
    }
});

export function searchAction(searchKey) {
    return (dispatch) => {
        dispatch(searchReducer(searchKey));
    };
};