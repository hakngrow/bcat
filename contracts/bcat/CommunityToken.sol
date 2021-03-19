// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '../token/ERC20/ERC20Capped.sol';
import '../token/ERC20/ERC20Pausable.sol';
import '../token/ERC20/ERC20Mintable.sol';
import '../token/ERC20/ERC20Detailed.sol';

import "../math/SafeMath.sol";

contract CommunityToken is ERC20Capped, ERC20Detailed, ERC20Pausable {
    
    using SafeMath for uint256;

    constructor (string memory name, string memory symbol, uint8 decimals, uint256 cap) public 
        ERC20Capped(cap) 
        ERC20Detailed(name, symbol, decimals) {
        
        _mint(msg.sender, cap.div(10));
    }
}