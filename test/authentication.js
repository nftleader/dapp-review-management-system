var Authentication = artifacts.require("./Authentication.sol");
var RMSToken = artifacts.require("./RMSToken.sol");

const USER_TYPES = ["User", "Company"];
const REVIEW_STATUS = ["Pending", "Positive", "Negative"];

function display_user_data(id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address){
/*  console.log("**** id: ", id.toNumber());
    console.log("**** userType: ", userType.toNumber());
    console.log("**** email: ", web3.toUtf8(email));
    console.log("**** user_first_name: ", web3.toUtf8(user_first_name));
    console.log("**** user_second_name: ", web3.toUtf8(user_second_name));
    console.log("**** user_zipcode: ", web3.toUtf8(user_zipcode));
    console.log("**** company_name: ", web3.toUtf8(company_name));
    console.log("**** company_address: ", web3.toUtf8(company_address));
*/
    console.log("**** id: ", id.toNumber(),
                "userType: ", USER_TYPES[userType.toNumber()],
                "email: ", web3.toUtf8(email),
                "user_first_name: ", web3.toUtf8(user_first_name),
                "user_second_name: ", web3.toUtf8(user_second_name),
                "user_zipcode: ", web3.toUtf8(user_zipcode),
                "company_name: ", web3.toUtf8(company_name),
                "company_address: ", web3.toUtf8(company_address));

}

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


  it("...should sign up 3 users, 2 companies, create 6 products and display them all", async function() {
    //1 user
    await authentication.signupUser('first@user.com', 'first name 1', 'second name 1', '65432432', {from: accounts[0]});
    await authentication.signupUser('second@user.com', 'first name 2', 'second name 2 ', '34546532', {from: accounts[1]});
    await authentication.signupUser('third@user.com', 'first name 3', 'second name 3 ', '6875687354', {from: accounts[2]});
    //2 company
    await authentication.signupCompany('company@company.com', 'my great company', 'vladivostok russia', {from: accounts[3]});
    await authentication.signupCompany('coporation@coporation.com', 'great coporation', 'russia vladivostok', {from: accounts[4]});

    let [id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address] = await authentication.login.call({from: accounts[3]});
    display_user_data(id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address);

    assert.equal(userType.toNumber(), 1, "The user is User.");
    assert.equal(web3.toUtf8(email), 'company@company.com', "email is wrong.");
    assert.equal(web3.toUtf8(company_address), 'vladivostok russia', "company address is wrong.");

    //3 display
    let totalCount = (await authentication.totalCount.call()).toNumber();
    console.log("Total Count : ", totalCount);
    for(let i = 1; i <= totalCount; i++){
      let [id, userType, email, user_first_name, user_second_name, user_zipcode, company_name, company_address] = await authentication.getUser.call(i);
      console.log("^^^^ id: ", id.toNumber(), " userType: ", USER_TYPES[userType.toNumber()], " email: ", web3.toUtf8(email));
    }

    assert.equal(totalCount, 5, "total count is wrong.");

    //4 create Products

    await authentication.createProduct("First Product",{from: accounts[3]});
    await authentication.createProduct("Second Product",{from: accounts[4]});
    await authentication.createProduct("Third Product",{from: accounts[3]});
    await authentication.createProduct("Fourth Product",{from: accounts[3]});
    await authentication.createProduct("Second Product",{from: accounts[4]});
    await authentication.createProduct("Sixth Product",{from: accounts[4]});

    //display product list

    let productCount = (await authentication.productCount.call()).toNumber();
    console.error("Product Count :", productCount);
    for(let i = 1; i <= productCount; i++){
      let [product_id, company_id, product_name] = await authentication.getProduct.call(i);
      console.log("@@@@ product_id: ", product_id.toNumber(), "company_id: ", company_id.toNumber(), " product_name: ", web3.toUtf8(product_name));
    }

    assert.equal(productCount, 6, "total count is wrong.");

  });
});
