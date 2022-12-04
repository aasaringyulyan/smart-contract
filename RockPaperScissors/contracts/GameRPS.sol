// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.7.0 <0.9.0;

contract rps {
    uint256 public startBlock = block.number;

    address constant playerOne = PLAYER_ONE_ADDRESS;
    address constant playerTwo = PLAYER_TWO_ADDRESS;

    bytes32 playerOneHash;
    bytes32 playerTwoHash;

    enum Choice {
        Empty,
        Rock,
        Paper,
        Scissor
    }

    Choice public playerOneChoice = Choice.Empty;
    Choice public playerTwoChoice = Choice.Empty;

    bool gameEnded = false;

    mapping(address=>uint) public balances;

    function resetAll() public {
        require(gameEnded);
        startBlock = block.number;
        playerOneHash = 0;
        playerTwoHash = 0;
        playerOneChoice = Choice.Empty;
        playerTwoChoice = Choice.Empty;
        gameEnded = false;
    }

    // commit the choice (Rock / Paper / Scissor)
    function commitChoice(bytes32 hash) public payable {
        require(block.number < (startBlock + 100));
        require((msg.sender == playerOne && playerOneHash == 0) || (msg.sender == playerTwo && playerTwoHash == 0), "not playerOne or timur");
        require(msg.value == 1 ether, "please pay to participate");

        if(msg.sender == playerOne) {
            playerOneHash = hash;
        } else {
            playerTwoHash = hash;
        }
    }

    // reveal the choice (Rock / Paper / Scissor)
    function revealChoice(Choice choice, uint nonce) public {
        require(block.number >= (startBlock + 100) && block.number < (startBlock + 200));
        require(msg.sender == playerOne || msg.sender == playerTwo, "not playerOne or playerTwo");
        require(playerOneHash != 0 && playerTwoHash != 0, "someone did not submit hash");
        require(choice != Choice.Empty, "have to choose Rock/Paper/Scissor");

        if(msg.sender == playerOne) {
            if (playerOneHash == sha256(abi.encodePacked(choice, nonce))) {
                playerOneChoice = choice;
            }
        } else {
            if (playerTwoHash == sha256(abi.encodePacked(choice, nonce))) {
                playerTwoChoice = choice;
            }
        }
    }

    // check the result
    function findResult() public {
        require(block.number > (startBlock + 200));
        require(!gameEnded, "can only compute result once");
        require(playerOneChoice != Choice.Empty && playerTwoChoice != Choice.Empty, "someone did not reveal their choice");

        // draw
        if (playerOneChoice == playerTwoChoice) {
            balances[playerOne] += 1 ether;
            balances[playerTwo] += 1 ether;
        } else if (playerOneChoice == Choice.Rock) {
            if (playerTwoChoice == Choice.Paper) {
                // playerOne: rock, playerTwo: paper, playerTwo win
                balances[playerTwo] += 2 ether;
            } else {
                // playerOne: rock, playerTwo: scissor, playerOne win
                balances[playerOne] += 2 ether;
            }
        } else if (playerOneChoice == Choice.Paper) {
            if (playerTwoChoice == Choice.Scissor) {
                // playerOne: paper, playerTwo: scissor, playerTwo win
                balances[playerTwo] += 2 ether;
            } else {
                // playerOne: paper, playerTwo: rock, playerOne win
                balances[playerOne] += 2 ether;
            }
        } else if (playerOneChoice == Choice.Scissor) {
            if (playerTwoChoice == Choice.Rock) {
                // playerOne: scissor, playerTwo: rock, playerTwo win
                balances[playerTwo] += 2 ether;
            } else {
                // playerOne: scissor, playerTwo: paper, playerOne win
                balances[playerOne] += 2 ether;
            }
        }

        gameEnded = true;
    }

    // in case either party did not participate
    function refundDeposit() public {
        bool didNotSubmitHash = block.number >= (startBlock + 100) && (playerOneHash == 0 || playerTwoHash == 0);
        bool didNotRevealChoice = block.number >= (startBlock + 200) && (playerOneChoice == Choice.Empty || playerTwoChoice == Choice.Empty);

        require(didNotSubmitHash || didNotRevealChoice);
        require(address(this).balance >= 1 ether);

        if (block.number >= (startBlock + 200)) {
            if (playerOneChoice == Choice.Empty && playerTwoChoice != Choice.Empty) {
                balances[playerTwo] += 2 ether;
            } else if (playerOneChoice != Choice.Empty && playerTwoChoice == Choice.Empty) {
                balances[playerOne] += 2 ether;
            } else {
                balances[playerOne] += 1 ether;
                balances[playerTwo] += 1 ether;
            }
        } else if (block.number >= (startBlock + 100)) {
            if (playerOneHash == 0 && playerTwoHash != 0) {
                balances[playerTwo] += 1 ether;
            } else if (playerOneHash != 0 && playerTwoHash == 0) {
                balances[playerOne] += 1 ether;
            }
        }
    }

    function claimMoney() public {
        require(msg.sender == playerOne || msg.sender == playerTwo, "not playerOne or playerTwo");
        require(balances[msg.sender] > 0);

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        bool transferred = payable(msg.sender).send(amount);
        if (transferred != true) {
            balances[msg.sender] = amount;
        }
    }
}