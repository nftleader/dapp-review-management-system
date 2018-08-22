pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import "./zeppelin/ownership/Ownable.sol";
import "./RMSToken.sol";

contract Authentication is Killable {
  RMSToken rmstoken;

  constructor(address rmstokenAddress) public payable {
    rmstoken = RMSToken(rmstokenAddress);
  }

  struct User {
    bytes32 user_first_name;
  }


  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[msg.sender].user_first_name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 user_first_name) {
    // Only valid names allowed

    require(!(user_first_name == 0x0));
    _;
  }

  function login() constant
  public
  onlyExistingUser
  returns (bytes32) {
    return (users[msg.sender].user_first_name);
  }

  function signup(bytes32 user_first_name)
  public
  payable
  onlyValidName(user_first_name)
  returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.

    if (users[msg.sender].user_first_name == 0x0)
    {
        users[msg.sender].user_first_name = user_first_name;

        return (users[msg.sender].user_first_name);
    }

    return (users[msg.sender].user_first_name);
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
