//SPDX-Licence-Identifier: UNLICENCED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract G2Punks is ERC721, Ownable{
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping (address => uint256) public walletMints;


    constructor() payable ERC721('G2Punks', 'G2P') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 100;
        maxPerWallet = 3;
        // withdrawWallet = 

    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenUri(uint256 tokenId_) public view returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed');
    }

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == _quantity * mintPrice, 'wrong mint value');
        require(totalSupply + _quantity <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'exceded max wallet mint');
        
        for(uint256 i =0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}