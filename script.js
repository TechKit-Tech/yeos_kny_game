// DOM Elements
const registerScreen = document.getElementById("register-screen");
const gameScreen = document.getElementById("game-screen");
const prizeScreen = document.getElementById("prize-screen");
const phoneNumberInput = document.getElementById("phone-number");
const registerBtn = document.getElementById("register-btn");
const hitBtn = document.getElementById("hit-btn");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const prizeText = document.getElementById("prize-text");
const playAgainBtn = document.getElementById("play-again-btn");

let selectedObjectIndex = 0;
let currentUserPhone = ""; // Track the user's phone number

// Register Button Click
// registerBtn.addEventListener('click', async () => {
//   const phoneNumber = phoneNumberInput.value;
//   if (phoneNumber) {
//     try {
//       // Save phone number to Firestore
//       await addDoc(collection(db, 'users'), {
//         phoneNumber: phoneNumber,
//         timestamp: serverTimestamp()
//       });
//       registerScreen.classList.add('hidden');
//       gameScreen.classList.remove('hidden');
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   }
// });

// Register Button Click
registerBtn.addEventListener("click", async () => {
  const phoneNumber = phoneNumberInput.value;
  if (phoneNumber) {
    try {
      // Save phone number to Firestore
      await addDoc(collection(db, "users"), {
        phoneNumber: phoneNumber,
        timestamp: serverTimestamp(),
      });
      currentUserPhone = phoneNumber; // Store the phone number
      registerScreen.classList.add("hidden");
      gameScreen.classList.remove("hidden");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
});

// Game Logic
const objects = document.querySelectorAll(".object");
objects.forEach((object, index) => {
  object.addEventListener("click", () => {
    selectedObjectIndex = index;
  });
});

leftArrow.addEventListener("click", () => {
  if (selectedObjectIndex > 0) {
    selectedObjectIndex--;
    updateSelectedObject();
  }
});

rightArrow.addEventListener("click", () => {
  if (selectedObjectIndex < objects.length - 1) {
    selectedObjectIndex++;
    updateSelectedObject();
  }
});

// hitBtn.addEventListener('click', () => {
//   const prizes = ['🍎', '🍌', '🍇', '🍊', '🍒'];
//   const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
//   prizeText.textContent = `You won: ${randomPrize}`;
//   gameScreen.classList.add('hidden');
//   prizeScreen.classList.remove('hidden');
// });

// Hit Button Click (updated to save prize)
hitBtn.addEventListener("click", async () => {
  const prizes = ["🍎", "🍌", "🍇", "🍊", "🍒"];
  const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

  try {
    // Save prize to Firestore
    await addDoc(collection(db, "prizes"), {
      phoneNumber: currentUserPhone,
      prize: randomPrize,
      timestamp: serverTimestamp(),
    });
    prizeText.textContent = `You won: ${randomPrize}`;
  } catch (error) {
    console.error("Error saving prize: ", error);
    prizeText.textContent = "Error saving prize. Try again!";
  }

  gameScreen.classList.add("hidden");
  prizeScreen.classList.remove("hidden");
});

playAgainBtn.addEventListener("click", () => {
  prizeScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
});

// function updateSelectedObject() {
//   objects.forEach((object, index) => {
//     object.style.border =
//       index === selectedObjectIndex ? "2px solid red" : "none";
//   });
// }

function updateSelectedObject() {
  objects.forEach((object, index) => {
    if (index === selectedObjectIndex) {
      object.classList.add('selected'); // Add animation class
      object.style.border = '2px solid red';
    } else {
      object.classList.remove('selected'); // Remove animation class
      object.style.border = 'none';
    }
  });
}

// Initialize
updateSelectedObject();
