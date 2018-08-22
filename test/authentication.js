var Authentication = artifacts.require("./Authentication.sol");
var RMSToken = artifacts.require("./RMSToken.sol");

contract('Authentication', async function(accounts) {
  let authentication;
  let rmstoken;
  
  beforeEach('setup contract for each test', async () => {
		rmstoken = await RMSToken.new();
    authentication = await Authentication.new(rmstoken.address);
    
		console.log(' === before each ===');
		console.log('rmstoken.address     : ', rmstoken.address);
		console.log('authentication.address: ', authentication.address);
  });
  
  it("...should sign up and log in a user.", async function() {
    await authentication.signup('testuser', {from: accounts[0]});
    let userName = await  authentication.login.call();
    assert.equal(web3.toUtf8(userName), 'testuser', "The user was not signed up.");
  });

});
