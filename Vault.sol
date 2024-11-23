// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external 
  returns (bool);
    function transfer(address recipient, uint256 amount) external returns 
  (bool);
}

contract Score {
    function getScore(address account) public view returns (uint256 score) {
        return 0.9 * (10**18);
    }
}

contract Vault {
    IERC20 public usdtToken;
    Score public scoreContract;

    struct Participant {
        bytes encryptedBalance;
    }

    mapping(address => Participant) public lenders;
    mapping(address => Participant) public borrowers;

    constructor(address _usdtTokenAddress, address _scoreContractAddress) {
        usdtToken = IERC20(_usdtTokenAddress);
        scoreContract = Score(_scoreContractAddress);
    }

    function addLiquidity(uint256 amount) external {
        require(usdtToken.transferFrom(msg.sender, address(this), amount), 
  "Transfer failed");
        lenders[msg.sender].encryptedBalance = FHEService.encrypt(amount);
    }

    function borrow(uint256 amount) external {
        uint256 score = scoreContract.getScore(msg.sender);
        require(score > 0.8 * (10**18), "Insufficient credit score");
        require(usdtToken.transfer(msg.sender, amount), "Transfer failed");
        borrowers[msg.sender].encryptedBalance = FHEService.encrypt(amount);
    }
}
    library FHEService {
        function encrypt(uint256 amount) internal pure returns (bytes memory) {
            return abi.encodePacked(amount);
        }

        function decrypt(bytes memory encryptedData) internal pure returns 
  (uint256) {
            return abi.decode(encryptedData, (uint256));
        }
    }
