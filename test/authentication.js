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
    let expectedEmail = 'first@user.com';
    let expectedFirstName = 'first name';
    let expectedSecondName = 'second name';
    let expectedZipCode = '65432432';

    await authentication.signupUser(expectedEmail, expectedFirstName, expectedSecondName, expectedZipCode, {from: accounts[0]});
    let [id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address] = await authentication.login.call({from: accounts[0]});
      
    assert.equal(userType.toNumber(), 0, "The user is company.");
    assert.equal(web3.toUtf8(email), expectedEmail, "email is wrong.");
    assert.equal(web3.toUtf8(user_zipcode), expectedZipCode, "zipcode is wrong.");
  });

  
  it("...should sign up and log in a company.", async function() {
    let expectedEmail = 'company@company.com';
    let expectedName = 'my great company';
    let expectedAddress = 'vladivostok russia';

    await authentication.signupCompany(expectedEmail, expectedName, expectedAddress, {from: accounts[0]});
    let [id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address] = await authentication.login.call({from: accounts[0]});

    assert.equal(userType.toNumber(), 1, "The user is company.");
    assert.equal(web3.toUtf8(email), expectedEmail, "email is wrong.");
    assert.equal(web3.toUtf8(company_address), expectedAddress, "company address is wrong.");
  });


  it("...should sign up 3 users and 2 company and list them all.", async function() {
    //user
    await authentication.signupUser('first@user.com', 'first name 1', 'second name 1', '65432432', {from: accounts[0]});
    await authentication.signupUser('second@user.com', 'first name 2', 'second name 2 ', '34546532', {from: accounts[1]});
    await authentication.signupUser('third@user.com', 'first name 3', 'second name 3 ', '6875687354', {from: accounts[2]});
    //company
    await authentication.signupCompany('company@company.com', 'my great company', 'vladivostok russia', {from: accounts[3]});
    await authentication.signupCompany('coporation@coporation.com', 'great coporation', 'russia vladivostok', {from: accounts[4]});

    let [id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address] = await authentication.login.call({from: accounts[3]});
            console.log("**** id: ", id.toNumber());
            console.log("**** userType: ", userType.toNumber());
            console.log("**** email: ", web3.toUtf8(email));
            console.log("**** user_first_name: ", web3.toUtf8(user_first_name));
            console.log("**** user_second_name: ", web3.toUtf8(user_second_name));
            console.log("**** user_zipcode: ", web3.toUtf8(user_zipcode));
            console.log("**** company_name: ", web3.toUtf8(company_name));
            console.log("**** company_address: ", web3.toUtf8(company_address));

    assert.equal(userType.toNumber(), 1, "The user is User.");
    assert.equal(web3.toUtf8(email), 'company@company.com', "email is wrong.");
    assert.equal(web3.toUtf8(company_address), 'vladivostok russia', "company address is wrong.");
  });
});
