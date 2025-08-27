// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop is ERC721, Ownable {
    uint256 public tokenIdCounter;
    uint256 public constant MAX_SUPPLY = 50;
    string private baseTokenURI;

    mapping(address => bool) public hasClaimed;

    constructor(string memory _baseURI)
        ERC721("godbrand.eth", "GODBRAND")
        Ownable(msg.sender)
    {
        baseTokenURI = _baseURI; // e.g. "ipfs://QmYourCID/"
        tokenIdCounter = 0;
    }

    /// @notice Claim NFT (only once per wallet)
    function claim() external {
        require(!hasClaimed[msg.sender], "Already claimed");
        require(tokenIdCounter <= MAX_SUPPLY, "Max supply reached");

        hasClaimed[msg.sender] = true;
        _safeMint(msg.sender, tokenIdCounter);
        tokenIdCounter++;
    }

    
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "nonexistent token");
        // All tokens point to the same metadata JSON
        return baseTokenURI;
    }


    function getMaxSupply() pure external returns(uint256){
        return MAX_SUPPLY;
    }
    function getTotalSupply() external view returns(uint256){
        return tokenIdCounter;
    }
}
