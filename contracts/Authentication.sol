pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import "./zeppelin/ownership/Ownable.sol";
import "./RMSToken.sol";

contract Authentication is Killable {
  RMSToken rmstoken;

  constructor(address rmstokenAddress) public payable {
    rmstoken = RMSToken(rmstokenAddress);
  }

  enum UserType {User, Company}
  enum ReviewStatus {Pending, Positive, Negative}

  struct User {
    uint id;
    UserType userType;

    bytes32 email;
    bytes32 user_first_name;
    bytes32 user_second_name;
    bytes32 user_zipcode;

    bytes32 company_name;
    bytes32 company_address;
  }

  struct Product{
    uint id;
    uint company_id;
    bytes32 product_name;
  }

  struct Review{
    uint id;
    uint product_id;
    uint company_id;
    uint rating;
    bool is_spam;
    bytes32 review;
    bytes32 reply;
  }

  //users
  mapping (address => User) private users;
  mapping (uint => address) private usersById;
  uint public userCount;
  uint public totalCount;
  uint public companyCount;

  //product
  mapping (uint => Product) private products;
  uint public productCount;

  //reviews
  mapping (uint => Review) private reviewById;
  uint public reviewCount;
  

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser() { require(users[msg.sender].id > 0, "User is not registered"); _; }
  modifier onlyNONExistingUser() { require(users[msg.sender].id == 0, "User is already registered"); _; }
  modifier onlyExistingUserID(uint userid) { require(usersById[userid] != 0x0, "User ID is not registered"); _; }

  modifier onlyExistingProductID(uint prodid) { require(products[prodid].id > 0, "Product ID is not registered"); _; }

  modifier onlyCompany{
    require(users[msg.sender].id > 0, "User does not exist");
    require(users[msg.sender].userType == UserType.Company, "User is not company");
    _;
  }

  modifier onlyUser{
    require(users[msg.sender].id > 0, "User does not exist");
    require(users[msg.sender].userType == UserType.User, "User is not company");
    _;
  }

  modifier onlyValidName(bytes32 user_first_name) {require(!(user_first_name == 0x0), "invalid name");_;}
  modifier onlyValidEmail(bytes32 email) { require(!(email == 0x0), "Invalid email"); _; }

  event LogUserSignUp(address from);
  event LogCompanySignUp(address from);

  event LogBytes32(bytes32 data);
  event LogString(string);
  event LogNumber(uint num);

  function login()
  public constant onlyExistingUser
  returns (uint, UserType, bytes32, bytes32, bytes32, bytes32,  bytes32, bytes32) {
    // emit LogString("-------  Login");
    // emit LogNumber(users[msg.sender].id);
    // emit LogBytes32(users[msg.sender].email);
    // emit LogBytes32(users[msg.sender].user_first_name);
    // emit LogBytes32(users[msg.sender].user_second_name);
    // emit LogBytes32(users[msg.sender].user_zipcode);
    // emit LogBytes32(users[msg.sender].company_name);
    // emit LogBytes32(users[msg.sender].company_address);
    return (users[msg.sender].id, 
            users[msg.sender].userType,
            users[msg.sender].email,
            users[msg.sender].user_first_name, 
            users[msg.sender].user_second_name, 
            users[msg.sender].user_zipcode, 
            users[msg.sender].company_name, 
            users[msg.sender].company_address);
  }

  function getUser(uint index)
  public constant onlyExistingUserID(index)
  returns (uint, UserType, bytes32, bytes32, bytes32, bytes32,  bytes32, bytes32) {
    User memory user = users[usersById[index]];
    return (user.id, 
            user.userType,
            user.email,
            user.user_first_name, 
            user.user_second_name, 
            user.user_zipcode, 
            user.company_name, 
            user.company_address);
  }

  /** @dev convert strint to bytes32
     */
  function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
      bytes memory tempEmptyStringTest = bytes(source);
      if (tempEmptyStringTest.length == 0) {
          return 0x0;
      }

      assembly {
          result := mload(add(source, 32))
      }
  }

  function signupUser(
    string _email,
    string _user_first_name,
    string _user_second_name,
    string _user_zipcode
  )
  onlyNONExistingUser
  external  payable  returns (uint) {
    User memory newbie;
    newbie.email              = stringToBytes32(_email);
    newbie.user_first_name    = stringToBytes32(_user_first_name);
    newbie.user_second_name   = stringToBytes32(_user_second_name);
    newbie.user_zipcode       = stringToBytes32(_user_zipcode);
    userCount++;
    totalCount++;
    newbie.id = totalCount;
    newbie.userType = UserType.User;

    usersById[totalCount] = msg.sender;
    users[msg.sender] = newbie;
    emit LogUserSignUp(msg.sender);
    emit LogNumber(totalCount);
    return totalCount; //return userid
  }


  function signupCompany(
    string _email,
    string _company_name,
    string _company_address
  )
  onlyNONExistingUser
  external  payable  returns (uint) {
    User memory newbie;
    newbie.email              = stringToBytes32(_email);
    newbie.company_name    = stringToBytes32(_company_name);
    newbie.company_address       = stringToBytes32(_company_address);
    companyCount++;
    totalCount++;
    newbie.id = totalCount;
    newbie.userType = UserType.Company;

    usersById[totalCount] = msg.sender;
    users[msg.sender] = newbie;
    emit LogUserSignUp(msg.sender);
    emit LogNumber(totalCount);
    return totalCount; //return userid
  }

  function createProduct(string _product_name)
  payable public onlyCompany
  returns(uint){
    productCount++;
    products[productCount].product_name = stringToBytes32(_product_name);
    products[productCount].id = productCount;
    products[productCount].company_id = users[msg.sender].id;
    return productCount;
  }
  

  function getProduct(uint index)
  constant public onlyExistingProductID(index)
  returns(uint, uint, bytes32){
    return(
      products[index].id,
      products[index].company_id,
      products[index].product_name
    );
  }


  function update(bytes32 user_first_name)
  public
  payable
  onlyValidName(user_first_name)
  onlyExistingUser
  returns (bytes32) {
    // Update user name.

    if (users[msg.sender].user_first_name != 0x0)
    {
        users[msg.sender].user_first_name = user_first_name;

        return (users[msg.sender].user_first_name);
    }
  }
}
