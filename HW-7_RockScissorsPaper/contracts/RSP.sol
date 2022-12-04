// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RSP is ERC20 {
    mapping(uint256 => _game[]) private _gameHistory;
    mapping(uint256 => _jackpotWinner[]) private _jackPotHistory;
    uint256 private _jackPotHistoryMapSize;

    uint256 private _totalSupply;
    uint256 private _gameId;
    uint256 private _jackPot;
    uint256 private _gameCost;
    uint256 private _x;

    int8[] private _playerAction;

    address payable[] _players;
    address private _contractOwner;

    string private _name;
    string private _symbol;

    event NumberPlay(uint256 number);

    struct _game {
        address player_1;
        address player_2;
        int8 player_1_action;
        int8 player_2_action;
        int8 player_win;
    }

    struct _jackpotWinner {
        uint game;
        address player;
        uint256 mount;
    }


    constructor() ERC20 ("Rock Scissors Paper", "RSP"){
        _jackPotHistoryMapSize = 0;
        _x = 10 ** 18;
        _totalSupply = 1000000 * _x;
        _jackPot = 0;
        _gameCost = 3 * _x;
        _gameId = 1;
        _contractOwner = msg.sender;

        _mint(address(this), _totalSupply/100*20);
        _mint(_contractOwner, _totalSupply/100*80);
    }

    function gameId() public view returns (uint256){
        return _gameId;
    }

    function jackPot() public view returns (uint256){
        return _jackPot;
    }

    function gameCost() public view returns (uint256){
        return _gameCost;
    }

    function setGameCost(uint256 cost) public onlyContractOwner returns (bool){
        require(cost >= 1 && cost < 1000, "Invalid cost, 1-999");
        _gameCost = cost * _x;
        return true;
    }

    function players() public view returns(address payable[] memory) {
        return _players;
    }

    function gameHistory(uint256 id) public view returns (_game[] memory) {
        return _gameHistory[id];
    }

    function randMod(uint _modulus) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _gameId))) % _modulus;
    }

    function transferPerGame(uint256 amount, int8 action) external returns (uint256) {
        require(amount == gameCost(), "Sent token are not equal to the cost of the game");
        require(0 < action && action < 4, "Invalid value for action (1-3)");

        address to = address(this);
        address owner = _msgSender();
        uint256 curGameId = gameId();
        _transfer(owner, to, amount);
        if (players().length < 2) {
            _players.push(payable(owner));
            _playerAction.push(action);
            if (players().length == 2) {
                int8 indexWinner = calculateWinner(_playerAction[0], _playerAction[1]);
                _gameHistory[curGameId].push(_game(_players[0],_players[1],_playerAction[0],_playerAction[1],indexWinner));
                setWinner(indexWinner);
            }
        }
        emit NumberPlay(curGameId);
        return curGameId;
    }

    function calculateWinner(int8 p1, int8 p2) private pure returns(int8) {
        if (p1 > p2){
            if ((p1 - p2) > 1){
                return 0;
            }
            else {
                return 1;
            }
        }
        else if (p1 < p2){
            if ((p2 - p1) > 1) {
                return 1;
            }
            else {
                return 0;
            }
        }
        return -1;
    }

    function setWinner(int indexWinner) private {

        if (indexWinner >= 0) {
            _jackPot = jackPot() + ((gameCost() * 2) * 10 / 100);
            uint256 reward = (gameCost() * 2) * 90 / 100;
            if (indexWinner == 0) {
                _transfer(address(this),_players[0], reward);
            }
            else if (indexWinner == 1) {
                _transfer(address(this),_players[1], reward);
            }
        }
        else if (indexWinner < 0) {
            _transfer(address(this),_players[0], gameCost());
            _transfer(address(this),_players[1], gameCost());
        }

        if (roll() == 777){
            _transfer(address(this),_players[0], jackPot());
            _jackPotHistory[_jackPotHistoryMapSize + 1].push(_jackpotWinner(_gameId,_players[0],jackPot()));
            _jackPotHistoryMapSize++;
            _jackPot = 0;
        }
        else if (roll() == 777){
            _transfer(address(this),_players[1], jackPot());
            _jackPotHistory[_jackPotHistoryMapSize + 1].push(_jackpotWinner(_gameId,_players[1],jackPot()));
            _jackPotHistoryMapSize++;
            _jackPot = 0;
        }
        _gameId++;
        _players = new address payable[](0);
        _playerAction = new int8[](0);
    }

    function roll() internal view returns(uint) {
        return randMod(1000);
    }

    modifier onlyContractOwner() {
        require(_contractOwner == _msgSender());
        _;
    }
}
