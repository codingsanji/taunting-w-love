const questionElement = document.getElementById('question');
const questionContainer = document.getElementById('question-container');
const buttonsContainer = document.getElementById('buttons');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const confettiContainer = document.getElementById('confetti-container');
let yesBtnDefaultPosition = { x: null, y: null }; 

// Function to change background image
function changeBackgroundImage(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Initial background image
changeBackgroundImage('images/beginning.jpg'); 

// Function to generate random position
function getRandomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 100));
  const y = Math.floor(Math.random() * (window.innerHeight - 100));
  return { x, y };
}

// Function to generate random color for confetti
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Event listener for the Yes button
yesBtn.addEventListener('click', () => {
  if (questionElement.textContent === 'Do you like me?') {
    const { x, y } = getRandomPosition();
    yesBtn.style.position = 'absolute';
    yesBtn.style.left = `${x}px`;
    yesBtn.style.top = `${y}px`;
  } else {
    // Show confetti
    confettiContainer.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confettiContainer.appendChild(confetti);
    }
    confettiContainer.style.display = 'block';
    setTimeout(() => {
      questionElement.textContent = 'Aww!! I love you too!!';
      yesBtn.classList.add('hidden');
      noBtn.classList.add('hidden');
      changeBackgroundImage('images/end.jpg'); 
    }, 100); 
  }
});

// Event listener for the No button
noBtn.addEventListener('click', () => {
  if (questionElement.textContent === 'Do you like me?') {
    const { x, y } = getRandomPosition();
    questionElement.textContent = 'Do you love me?';
    yesBtnDefaultPosition = { x: yesBtn.offsetLeft, y: yesBtn.offsetTop }; 
    yesBtn.style.position = 'absolute';
    yesBtn.style.left = `${x}px`;
    yesBtn.style.top = `${y}px`;
  } else {
    const { x, y } = getRandomPosition();
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    yesBtn.style.left = `${yesBtnDefaultPosition.x}px`;
    yesBtn.style.top = `${yesBtnDefaultPosition.y}px`;
  }
});

// Center the question and buttons
function centerElements() {
  const questionWidth = questionContainer.offsetWidth;
  const buttonsWidth = buttonsContainer.offsetWidth;
  const totalWidth = Math.max(questionWidth, buttonsWidth);
  questionContainer.style.width = `${totalWidth}px`;
  buttonsContainer.style.width = `${totalWidth}px`;
}

// Calling the centering function initially and on window resize
centerElements();
window.addEventListener('resize', centerElements);
