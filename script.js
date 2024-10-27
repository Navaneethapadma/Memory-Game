let flippedCards = [];
        let attempts = 0;
        let timer;
        let seconds = 0;

        const levels = {
            easy: 8,  
            medium: 12, 
            hard: 16  
        };

        const cardData = [
            { name: 'card1', img: 'images/card1.jpeg' },
            { name: 'card2', img: 'images/card2.jpg' },
            { name: 'card3', img: 'images/card3.jpeg' },
            { name: 'card4', img: 'images/card4.jpeg' },
            { name: 'card5', img: 'images/card5.jpeg' },
            { name: 'card6', img: 'images/card6.jpeg' },
            { name: 'card7', img: 'images/card7.jpeg' },
            { name: 'card8', img: 'images/card8.jpeg' }
        ];

        function initializeGame(level) {
            const numberOfCards = levels[level];
            const gameBoard = document.getElementById('game-board');
            gameBoard.innerHTML = '';  
            resetGame();

            let selectedCards = cardData.slice(0, numberOfCards / 2);
            selectedCards = [...selectedCards, ...selectedCards]; 
            selectedCards.sort(() => 0.5 - Math.random());

            selectedCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('memory-card');
                cardElement.dataset.name = card.name;
                cardElement.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">?</div>
                        <div class="card-back" style="background-image: url('${card.img}')"></div>
                    </div>
                `;
                cardElement.addEventListener('click', flipCard);
                gameBoard.appendChild(cardElement);
            });

            const cols = Math.min(numberOfCards, 4);
            gameBoard.style.gridTemplateColumns = `repeat(${cols}, 100px)`; 

            startTimer();
        }

        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains('flip') && !this.classList.contains('matched')) {
                this.classList.add('flip');
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    attempts++; 
                    updateScore(); 

                    if (flippedCards[0].dataset.name === flippedCards[1].dataset.name) {
                        flippedCards.forEach(card => card.classList.add('matched'));
                        flippedCards = []; 
                        checkWin(); 
                    } else {
                        setTimeout(() => {
                            flippedCards.forEach(card => card.classList.remove('flip'));
                            flippedCards = [];
                        }, 1000);
                    }
                }
            }
        }

        function updateScore() {
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
        }

        function startTimer() {
            resetTimer();
            timer = setInterval(() => {
                seconds++;
                document.getElementById('timer').textContent = `Time: ${seconds} seconds`;
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function resetTimer() {
            clearInterval(timer);
            seconds = 0;
            document.getElementById('timer').textContent = `Time: 0 seconds`;
        }

        function resetGame() {
            attempts = 0; 
            flippedCards = [];
            updateScore(); 
            resetTimer();
        }

        function checkWin() {
            const allFlipped = document.querySelectorAll('.memory-card.matched').length;
            const totalCards = document.querySelectorAll('.memory-card').length;

            if (allFlipped === totalCards) {
                stopTimer();
                setTimeout(() => alert(`You won! Attempts: ${attempts}, Time: ${seconds} seconds`), 500);
            }
        }