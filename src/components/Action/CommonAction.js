import AuthenticationContract from '../../../build/contracts/Authentication.json'
import store from '../../store'
import {USER_TYPES, REVIEW_STATUS} from '../../util/globals'
const contract = require('truffle-contract')

export const blockchainDataReducer = (blockchainData) => ({
    type: 'BLOCKCHAIN_DATA',
    data:{
        blockchainData
    }
});

export const addProductReducer = (product_obj) => ({
    type: 'ADD_PRODUCT_REDUCER',
    data:  product_obj
});

// export function initData() {
//     return (dispatch) => {
//         //Get data from Web3
//         let blockchainData = {};
//         dispatch(blockchainDataReducer(blockchainData));
//     };
// };

export function addProduct(product_obj) {
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            const authentication = contract(AuthenticationContract)
            authentication.setProvider(web3.currentProvider)
            var authenticationInstance
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                authentication.deployed().then(function(instance) {
                    authenticationInstance = instance
                    authenticationInstance.createProduct(product_obj.product_name, {from: coinbase})
                    .then(function(result) {
                        dispatch(addProductReducer(product_obj))
                    })
                    .catch(function(result) {
                        console.log("error in add new product: ", result);
                    // If error...
                    })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
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