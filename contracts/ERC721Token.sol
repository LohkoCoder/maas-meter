import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyCollectible is ERC721Upgradeable, OwnableUpgradeable {

    function initialize() initializer public {
        __Ownable_init();
        __ERC721_init("MyCollectible", "MCO");
    }

    function mint(address _account, uint256 _tokenId) external onlyOwner {
        _mint(_account, _tokenId);
    }
}
