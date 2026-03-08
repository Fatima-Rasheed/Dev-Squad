// Get main container
const app = document.getElementById("app");
const quizzes = [
  {
    id: 'science',  
     name: 'Science',
   
    questions: [
      { question: "What is the chemical symbol for water?", options: ["H2O","CO2","NaCl","O2"], answer: "H2O" },
      { question: "Which planet is known as the Red Planet?", options: ["Mars","Jupiter","Saturn","Venus"], answer: "Mars" },
      { question: "What gas do plants produce during photosynthesis?", options: ["Oxygen","Nitrogen","CO2","Hydrogen"], answer: "Oxygen" },
      { question: "What force keeps us on the ground?", options: ["Gravity","Friction","Magnetism","Pressure"], answer: "Gravity" },
      { question: "Which part of the cell contains genetic material?", options: ["Nucleus","Cytoplasm","Ribosome","Mitochondria"], answer: "Nucleus" },
      { question: "The Earth revolves around the ___?", options: ["Moon","Sun","Mars","Venus"], answer: "Sun" },
      { question: "What is the speed of light?", options: ["300,000 km/s","150,000 km/s","1,000 km/s","500,000 km/s"], answer: "300,000 km/s" },
      { question: "The periodic table was created by?", options: ["Mendeleev","Newton","Einstein","Darwin"], answer: "Mendeleev" },
      { question: "What is the largest organ in the human body?", options: ["Skin","Heart","Liver","Lungs"], answer: "Skin" },
      { question: "Which planet has rings around it?", options: ["Saturn","Mars","Venus","Mercury"], answer: "Saturn" }
    ]

  },
  {
    id: 'history',
    name: 'History',
    description: 'Test your knowledge about historical events and figures.',
    questions: [
      { question: "Who was the first President of the United States?", options: ["George Washington","Abraham Lincoln","Thomas Jefferson","John Adams"], answer: "George Washington" },
      { question: "In which year did World War II end?", options: ["1945","1939","1918","1950"], answer: "1945" },
      { question: "Which empire was ruled by Julius Caesar?", options: ["Roman Empire","Ottoman Empire","Mongol Empire","British Empire"], answer: "Roman Empire" },
      { question: "The Great Wall is located in which country?", options: ["China","India","Egypt","Japan"], answer: "China" },
      { question: "Who discovered America in 1492?", options: ["Christopher Columbus","Vasco da Gama","Ferdinand Magellan","Marco Polo"], answer: "Christopher Columbus" },
      { question: "Which revolution began in 1789?", options: ["French Revolution","Russian Revolution","American Revolution","Industrial Revolution"], answer: "French Revolution" },
      { question: "Who was the British Prime Minister during World War II?", options: ["Winston Churchill","Neville Chamberlain","Margaret Thatcher","Tony Blair"], answer: "Winston Churchill" },
      { question: "The Berlin Wall fell in which year?", options: ["1989","1979","1999","1991"], answer: "1989" },
      { question: "Who was the first Emperor of Rome?", options: ["Augustus","Nero","Caligula","Trajan"], answer: "Augustus" },
      { question: "Which war was fought between the North and South regions in the USA?", options: ["Civil War","Revolutionary War","World War I","World War II"], answer: "Civil War" }
    ]
  },
  {
    id: 'knowledge',
    name: 'General Knowledge',
    description: 'Test your knowledge of famous authors and literary works.',
    questions: [
      { question: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare","Charles Dickens","Mark Twain","Jane Austen"], answer: "William Shakespeare" },
      { question: "Which novel features the character 'Elizabeth Bennet'?", options: ["Pride and Prejudice","Moby Dick","Great Expectations","Jane Eyre"], answer: "Pride and Prejudice" },
      { question: "Who wrote 'The Odyssey'?", options: ["Homer","Virgil","Sophocles","Aristotle"], answer: "Homer" },
      { question: "What is the main theme of '1984' by George Orwell?", options: ["Totalitarianism","Romance","Adventure","Comedy"], answer: "Totalitarianism" },
      { question: "Who wrote 'The Raven'?", options: ["Edgar Allan Poe","Robert Frost","Emily Dickinson","Walt Whitman"], answer: "Edgar Allan Poe" },
      { question: "Who is the author of 'Harry Potter' series?", options: ["J.K. Rowling","J.R.R. Tolkien","C.S. Lewis","Suzanne Collins"], answer: "J.K. Rowling" },
      { question: "Which play includes the character 'Macbeth'?", options: ["Macbeth","Hamlet","Othello","King Lear"], answer: "Macbeth" },
      { question: "Who wrote 'The Great Gatsby'?", options: ["F. Scott Fitzgerald","Ernest Hemingway","John Steinbeck","T.S. Eliot"], answer: "F. Scott Fitzgerald" },
      { question: "Which poet wrote 'The Road Not Taken'?", options: ["Robert Frost","William Wordsworth","John Keats","Percy Shelley"], answer: "Robert Frost" },
      { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee","Mark Twain","Emily Bronte","George Orwell"], answer: "Harper Lee" }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Challenge your math skills with these questions.',
    questions: [
      { question: "What is the value of π (Pi) rounded to 2 decimal places?", options: ["3.14","3.15","3.12","3.13"], answer: "3.14" },
      { question: "Solve: 8 × 7", options: ["56","54","64","49"], answer: "56" },
      { question: "What is the square root of 144?", options: ["12","14","10","16"], answer: "12" },
      { question: "What is 15% of 200?", options: ["30","25","35","20"], answer: "30" },
      { question: "If x + 5 = 12, what is x?", options: ["7","6","8","5"], answer: "7" },
      { question: "Solve: 9² - 5²", options: ["56","36","81","16"], answer: "56" },
      { question: "What is the next prime number after 7?", options: ["11","9","13","17"], answer: "11" },
      { question: "If y/3 = 9, what is y?", options: ["27","12","24","30"], answer: "27" },
      { question: "What is the area of a rectangle with length 10 and width 5?", options: ["50","15","25","40"], answer: "50" },
      { question: "What is the value of 2³ × 3²?", options: ["72","36","54","64"], answer: "72" }
    ]
  },
 
];


// Navbar function
function renderNavBar() {
    const navbar = document.createElement('nav');
    navbar.className = 'bg-white shadow-md p-4 flex justify-between items-center';

    navbar.innerHTML = `
      <div class="text-xl font-bold text-black">QuizMaster</div>
      <div class="flex items-center gap-6">
        <button class="text-black hover:text-blue-800 " onclick="renderLandingPage()">Home</button>
        <button class="text-black hover:text-blue-800" onclick="renderQuizPage()">Quizzes</button>
        <button class="text-black hover:text-blue-800" onclick="alert('Leaderboard coming soon')">Leaderboard</button>
        <button class="text-black hover:text-blue-800" onclick="renderProfilePage()">Profile</button>
        <button class="text-black hover:text-blue-800" onclick="alert('Notifications clicked')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </button>
        <img src="assets/2c19a7b00653c91dcbf49f5eb38495c0fa92c990.png" 
             alt="Profile" class="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500" 
             onclick="renderProfilePage()">
      </div>
    `;

    app.prepend(navbar);
}
// navbar2
// Navbar function
function renderQuizNavBar() {
    const navbar = document.createElement('nav');
    navbar.className = 'bg-white shadow-md p-4 flex justify-between items-center';

    navbar.innerHTML = `
      <!-- LEFT SIDE -->
      <div class="flex items-center gap-8">
        <div class="text-xl font-bold text-black">QuizMaster</div>

        <button class="text-black hover:text-blue-800" onclick="renderLandingPage()">Home</button>
        <button class="text-black hover:text-blue-800" onclick="alert('Quizzes Page coming soon')">Categories</button>
        <button class="text-black hover:text-blue-800" onclick="renderQuizPage()">My Quizzes</button>
        <button class="text-black hover:text-blue-800" onclick="alert('Leaderboard coming soon')">Leaderboard</button>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex items-center gap-4">

        <input 
          type="text" 
          placeholder="Search"
          class="w-[150px] px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >

        <img 
          src="assets/2c19a7b00653c91dcbf49f5eb38495c0fa92c990.png"
          alt="Profile"
          class="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500"
          onclick="renderProfilePage()"
        >
      </div>
    `;

    app.prepend(navbar);

}

// Landing page function
function renderLandingPage() {
    // Clear previous content
    app.innerHTML = '';

    // Render navbar
    renderNavBar();

    // Landing page content
    const landingDiv = document.createElement('div');
    landingDiv.className = 'text-center  p-8';

    landingDiv.innerHTML = `
<div class="relative mx-auto w-[990px] h-[512px] mb-2 rounded-md overflow-hidden">
  <!-- Image -->
  <img src="assets/d38989f4970885122b241362efabff60c8d3f553 copy 2.png"
       alt="Profile"
       class="w-full h-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500">

  <!-- Black overlay 60% opacity -->
  <div class="absolute inset-0 bg-black bg-opacity-60"></div>

  <!-- Text and Button on Image -->
  <div class="absolute inset-0 flex flex-col items-center justify-center top-52 px-7">
    <span class="text-white text-5xl  font-bold text-center">
      Welcome to QuizMaster
    </span>
    <p class="text-white text-md mt-2 text-center max-w-1xl">
      Test your knowledge with our engaging quizzes. Compete with friends and climb the leaderboard. Start your quiz journey today!
    </p>
    <button id="getStartedBtn" class="bg-blue-600 hover:bg-blue-600 text-white mt-12 px-6  py-2 rounded-lg text-lg">
      Get Started
    </button>
  </div>
</div>
<div class="mx-auto w-[990px] my-12 px-4">
  <!-- Heading and paragraph -->
  <h2 class="text-2xl font-bold mb-2 text-left">Key Features</h2>
  <p class="text-gray-700 mb-6 text-left">
    Explore the exciting features that make QuizMaster the ultimate quiz app.
  </p>

  <!-- 3 horizontal boxes -->
  <div class="flex flex-col md:flex-row justify-between text-left gap-4">
    <!-- Box 1 -->
    <div class="bg-white shadow-lg rounded-xl p-6 flex-1 cursor-pointer">
      <h3 class="text-md font-semibold mb-2"onclick="renderQuizPage()">Interactive Quizzes</h3>
      <p class="text-gray-600 text-sm">Challenge yourself with timed quizzes to test your speed and accuracy.</p>
    </div>

    <!-- Box 2 -->
    <div class="bg-white shadow-lg rounded-xl p-6 flex-1 cursor-pointer">
      <h3 class="text-md font-semibold mb-2">Leaderboard</h3>
      <p class="text-gray-600 text-sm">Compete with friends and other users to see who can achieve the highest scores..</p>
    </div>

    <!-- Box 3 -->
    <div class="bg-white shadow-lg rounded-xl p-6 flex-1 cursor-pointer">
      <h3 class="text-md font-semibold mb-2">Progress Tracking</h3>
      <p class="text-gray-600 text-sm">Track your progress and see how you improve over time with detailed performance reports.</p>
    </div>
  </div>
</div>
`;

    app.appendChild(landingDiv);

    // Button click event
    document.getElementById("getStartedBtn").addEventListener("click", () => {
        renderSignupPage();
       
    });
}

// Call landing page on load
renderLandingPage();
function renderSignupPage() {
    app.innerHTML = '';
    renderNavBar();
    const signupDiv = document.createElement('div');
    signupDiv.className = '  mt-20 p-8 bg-white shadow-lg rounded-xl';
    signupDiv.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
          <div class="flex flex-col gap-2">
        <input id="signupName" type="text" placeholder="Full Name" class="mx-16 w-[360px] mb-4 p-2 border border-black rounded-lg">
        <input id="signupEmail" type="email" placeholder="Email" class="w-full w-[360px] mb-4 p-2 border border-black rounded-lg mx-16 ">
        <input id="signupPassword" type="password" placeholder="Password" class="w-full w-[360px] mb-4 p-2 border border-black rounded-lg mx-16 ">
        <input id="confirmPassword" type="confirmPassword" placeholder="Confirm Password" class="w-full w-[360px] mb-4 p-2 border border-black rounded-lg mx-16 ">
        <button id="signupBtn" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2  w-[360px] mx-16 rounded-lg">Sign Up</button>
        <p class="mt-4 text-center text-gray-600 text-sm">
            Already have an account? <span id="goToSignin" class="text-blue-600 cursor-pointer">Sign In</span>
        </p> </div>
    `;
    app.appendChild(signupDiv);

    document.getElementById('signupBtn').addEventListener('click', () => {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword=document.getElementById('confirmPassword').value
         if (password !== confirmPassword) {
        alert("Passwords do not match ");
        return; // stop signup
    }
        localStorage.setItem('user', JSON.stringify({
    name: name,
    email: email,
    password: password,
    confirmPassword:password,
}));
        alert(`Signed up with name: ${name} and email: ${email}`);
                renderSignInPage(); // Allow switching to Sign In page

    });

    document.getElementById('goToSignin').addEventListener('click', () => {
        renderSignInPage(); // Allow switching to Sign In page
    });
}

function renderSignInPage(){
    app.innerHTML=''
    renderNavBar();
    const signinDiv= document.createElement('div');
    signinDiv.className='mx-auto  mt-20 p-8 bg-white shadow-lg rounded-xl';
    signinDiv.innerHTML= `
        <h2 class="text-2xl font-bold text-center mb-6 ">Welcome Back</h2>
           <div class="flex flex-col gap-2">
        <input id="email" type="email" placeholder="Email" class="w-full bg-gray-200 mb-4 p-2 border w-[360px] border-gray-800 rounded-lg mx-16">
        <input id="password" type="password" placeholder="Password" class="w-[360px] mb-4 bg-gray-200 p-2 border border-gray-800 rounded-lg mx-16">
        <button id="signinBtn" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg w-[360px] mx-16">Sign In</button><div>
        <p id="signinError" class="text-red-500 text-center text-sm"></p>
        <p class="mt-4 text-center text-gray-600 text-sm">
            Don't have an account? <span id="goToSignup" class="text-blue-600 cursor-pointer">Sign Up</span>
        </p>
    `;

    app.appendChild(signinDiv);
   document.getElementById('signinBtn').addEventListener('click', () => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert("No account found");
        return;
    }

    if (email === user.email && password === user.password) {
        alert("Login Successful ");
        renderProfilePage();   // OPEN PROFILE PAGE
    }
    else {
        alert("Wrong email or password ");
    }
});

    document.getElementById('goToSignup').addEventListener('click', () => {
        renderSignupPage();
    });
}

function renderProfilePage(){
    app.innerHTML=''
    renderNavBar();
    const profileDiv= document.createElement('div');
     const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        alert("No user logged in");
        renderSignInPage();
        return;
    }
// Get all quiz results
const allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
// Filter for logged-in user
const userResults = allResults.filter(r => r.email === user.email);

// Build table rows dynamically
let rowsHTML = '';
if (userResults.length === 0) {
    rowsHTML = `<tr>
        <td colspan="3" class="px-4 py-2 text-center text-gray-500">No quizzes taken yet</td>
    </tr>`;
} else {
    userResults.forEach(result => {
        rowsHTML += `
        <tr class="border-b">
            <td class="px-4 py-2">${result.quizName}</td>
            <td class="px-4 py-2">${result.score}</td>
            <td class="px-4 py-2">${result.date}</td>
        </tr>
        `;
    });
}
  profileDiv.className='mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl gap-16px w-[928px] h-[220px] text-center';
  profileDiv.innerHTML=` <img src="assets/cad7ab45f4b88b64ff2b6293a0b5df0e34ecb3e0 copy.png"
             class="w-28 h-28 mx-auto rounded-full  mb-4">
              

       <!-- Name -->
<h3 class="text-xl font-semibold">${user.name}</h3>
<p>Software Engineer</p>

<nav class="flex  text-left gap-8 border-b pb-3 mt-6 w-[900px] mx-auto">

    <button id="activityTab" class="text-gray-500 hover:text-blue-600">
        Activity
    </button>

    <button id="profileTab" class="font-semibold text-black pb-1">
        Profile
    </button>

</nav>
<h1 class="text-2xl font-semibold mt-6 text-left pb-4  border-b">Personal Information</h1>

 <div class="flex gap-20 mt-6">

  <!-- Name Column -->
  <div class="flex flex-col text-left pb-4  border-b">
    <h3 class="text-gray-500" >Name</h3>
    <h3 class="text-md ">${user.name}</h3>
  </div>

  <!-- Email Column -->
  <div class="flex flex-col text-left">
    <h3 class="text-gray-500">Email</h3>
    <h3 class="text-md ">${user.email}</h3>
  </div>

</div>
<h3 class=" text-gray-400 text-left">Bio</h3>
<p class="text-left mt-2 pb-4  border-b"">Avid quiz taker and trivia lover. </br> Always up for a challenge!</p>
<div class="mt-8">
  <h3 class="text-2xl text-left font-semibold mb-2">Quiz Activity</h3>

  <table class="w-full space-y-4 mt-6 rounded-md overflow-hidden">
    
    <!-- Table Head -->
    <thead class="border text-left ">
      <tr>
        <th class="text-left px-5 py-4 border-b">Quiz Name</th>
        <th class="text-left px-5 py-4 border-b">Score</th>
        <th class="text-left px-5 py-4 border-b">Date</th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="border text-left">

      <tr class="   border-b">
        <td class="px-4 py-2">JavaScript Basics</td>
        <td class="px-4 py-2">8 / 10</td>
        <td class="px-4 py-2">10 Mar 2026</td>
      </tr>

      <tr class="border-b">
        <td class="px-4 py-2">HTML Fundamentals</td>
        <td class="px-4 py-2">9 / 10</td>
        <td class="px-4 py-2">12 Mar 2026</td>
      </tr>

      <tr>
        <td class="px-4 py-2">CSS Styling</td>
        <td class="px-4 py-2">7 / 10</td>
        <td class="px-4 py-2">15 Mar 2026</td>
      </tr>

    </tbody>

  </table>
</div>
`;

  app.appendChild(profileDiv);}
  function renderQuizPage(){
    app.innerHTML=``;
    renderQuizNavBar();
    const quizDiv = document.createElement('div');
    quizDiv.className='mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl gap-16px w-[928px]  text-center';
    quizDiv.innerHTML=`<h1 class="text-left text-2xl font-bold">
    Select a Quiz</h1> 
    <div class="flex gap-4 mt-4 mb-8">

            <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-700"
            onclick="filterQuiz('all')">
                All
            </button>

            <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-700"
            onclick="filterQuiz('science')">
                Science
            </button>

           

            <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-700"
            onclick="filterQuiz('history')">
                History
            </button>
             <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-700"
            onclick="filterQuiz('knowledge')">
                Knowledge
            </button>

            <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-700"
            onclick="filterQuiz('mathematics')">
                Mathematics
            </button>

        </div>

    </div>

   <div class="flex flex-col md:flex-row gap-6">

  <div>
    <img src="assets/quiz (8).png" 
         class="w-[280px] h-[180px] cursor-pointer object-cover rounded-lg shadow-md">
           <h3 class="mt-3 text-md text-left font-semibold">The Universe</h3>
           <p class="mt-1 text-sm text-gray-500 text-left">Test Your knowledge about cosmos</p>
  </div>

  <div>
    <img src="assets/quiz (9).png" 
         class="w-[280px] h-[180px] object-cover rounded-lg shadow-md">
          <h3 class="mt-3 text-md text-left font-semibold">Ancient Civilization</h3>
           <p class="mt-1 text-sm text-gray-500 text-left">Explore the mysteries of ancient culture</p>
  </div>

  <div>
    <img src="assets/quiz (1).png" 
         class="w-[280px] h-[180px] object-cover rounded-lg shadow-md">
          <h3 class="mt-3 text-md text-left font-semibold">Shakespearean Play </h3>
           <p class="mt-1 text-gray-500 text-sm text-left">Dive in the world of Bard</p>
  </div>

</div>
<div class="mt-4 space-y-6 ">

<!-- Quiz 1 -->
<div class="flex items-center justify-between cursor-pointer p-4 rounded-lg shadow-sm">
  
  <div>
    <h2 class="text-lg text-left cursor-pointer font-semibold">General Knowledge</h2>
    <p class="text-sm text-left  text-gray-500">Test your everyday knowledge with a mix of knowledge.</p>
  </div>

  <img src="assets/quiz (2).png"
       class="w-[280px] h-[180px] object-cover rounded-md">
</div>


<!-- Quiz 2 -->
<div class="flex items-center text-left justify-between  p-4 rounded-lg shadow-sm">
  
  <div>
    <h2 class="text-lg  cursor-pointer font-semibold"onclick="filterQuiz('science')"> Science</h2>
    <p class="text-sm text-gray-500"   >Explore the wonder of science from Biology to physics.</p>
  </div>

  <img src="assets/quiz (3).png"
       class="w-[280px] h-[180px] object-cover rounded-md">
</div>


<!-- Quiz 3 -->
<div class="flex items-center text-left justify-between  p-4 rounded-lg shadow-sm">
  
  <div>
    <h2 class="text-lg cursor-pointer font-semibold" onclick="filterQuiz('history')">History</h2>
    <p class="text-sm   text-gray-500">Journey through time and learn about historical events.</p>
  </div>

  <img src="assets/quiz (5).png"
       class="w-[280px] h-[180px] object-cover rounded-md">
</div>


<!-- Quiz 4 -->
<div class="flex items-center text-left  justify-between  p-4 rounded-lg shadow-sm">
  
  <div>
    <h2 class="text-lg font-semibold cursor-pointer " onclick="filterQuiz('knowledge')">Literature</h2>
    <p class="text-sm text-gray-500">Discover world of book and authors. </p>
  </div>

  <img src="assets/quiz (6).png"
       class="w-[280px] h-[180px] object-cover rounded-md">
</div>


<!-- Quiz 5 -->
<div class="flex items-center justify-between text-left   p-4 rounded-lg shadow-sm">
  
  <div>
    <h2 class="text-lg font-semibold cursor-pointer"    onclick="filterQuiz('mathematics')"> Mathematics</h2>
    <p class="text-sm text-gray-500">Challenge your math skills with various problems.</p>
  </div>

  <img src="assets/quiz (7).png"
       class="w-[280px] h-[180px] object-cover rounded-md">
</div>

</div>

    `;
    
      
  
  app.appendChild(quizDiv);
 }
function filterQuiz(category){
    app.innerHTML = "";
    renderNavBar();

    let filteredQuizzes;

    if(category === "all"){
         // Combine all questions into one quiz
        const allQuestions = quizzes
            .filter(q => q.id !== "all") // exclude the pre-made 'all' category if needed
            .flatMap(q => q.questions);

        const combinedQuiz = {
            id: "all_combined",
            name: "All Categories",
            questions: allQuestions
        };

        showPaginatedQuiz(combinedQuiz);
        return;
    
    } else{
        filteredQuizzes = quizzes.filter(q => q.id === category);
    }

    if(filteredQuizzes.length === 1){
        showPaginatedQuiz(filteredQuizzes[0]); // Directly start quiz
        return;
    }
function reviewAnswers(quiz, userAnswers) {
    app.innerHTML = '';
    renderNavBar();

    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl w-[928px] text-left';

    // Filter incorrect answers
    const incorrectQuestions = quiz.questions
        .map((q, index) => ({ ...q, userAnswer: userAnswers[index] }))
        .filter(q => q.userAnswer !== q.answer);

    if (incorrectQuestions.length === 0) {
        reviewDiv.innerHTML = `
            <h1 class="text-2xl font-bold mb-4">Review Incorrect Answers</h1>
            <p class="text-lg text-green-600">Congratulations! You answered all questions correctly.</p>
            <button onclick="renderQuizPage()" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Back to Quizzes
            </button>
        `;
    } else {
        let questionsHTML = '';
        incorrectQuestions.forEach((q, i) => {
            questionsHTML += `
                <div class="mb-6 p-4 border rounded-lg">
                    <h2 class="font-semibold mb-2">${i+1}. ${q.question}</h2>
                    <p><span class="font-semibold">Your Answer:</span> <span class="text-red-600">${q.userAnswer || 'No Answer'}</span></p>
                    <p><span class="font-semibold">Correct Answer:</span> <span class="text-green-600">${q.answer}</span></p>
                </div>
            `;
        });

        reviewDiv.innerHTML = `
            <h1 class="text-2xl font-bold mb-4">Review Incorrect Answers</h1>
            ${questionsHTML}
            <button onclick="renderQuizPage()" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Back to Quizzes
            </button>
        `;
    }

    app.appendChild(reviewDiv);
}
    // If multiple quizzes exist, you can show cards (optional)
    const filterDiv = document.createElement('div');
    filterDiv.className = "mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl w-[928px]";
    filterDiv.innerHTML = `<div id="quizContainer" class="grid grid-cols-3 gap-6"></div>`;
    app.appendChild(filterDiv);

    displayQuizzes(filteredQuizzes);
}

function showPaginatedQuiz(quiz) {
    app.innerHTML = '';
    renderNavBar();

    let currentQuestion = 0;
    const totalQuestions = quiz.questions.length;
    const userAnswers = new Array(totalQuestions).fill(null);
    let timerInterval;
    const timePerQuestion = 30; // seconds per question
    let timeLeft = timePerQuestion;

    const quizDiv = document.createElement('div');
    quizDiv.className = 'mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl w-[928px] text-center';

    quizDiv.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">${quiz.name} Quiz</h1>


        <!-- Progress Bar -->
        <h1 class="text-left ">Progress</h>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-2 mb-2">
            <div id="progressBar" class="bg-gray-600 h-2 rounded-full w-0 transition-all"></div>
        </div>

        <!-- Timer -->
        <div class="text-right text-sm font-semibold mb-4">
            Time Left: <span id="timer">${timePerQuestion}</span>s
        </div>

        <!-- Question Container -->
        <div id="questionContainer" class="space-y-6 mb-6"></div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between">
            <button id="prevBtn" class="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg" disabled>
                Previous
            </button>
            <button id="nextBtn" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Next
            </button>
        </div>

        <!-- Submit Button -->
<div class="flex justify-end ">
        <button id="submitQuiz" class=" bg-green-600  hover:bg-green-700 text-white py-2 px-4 rounded-lg hidden">
            Submit Quiz
        </button>
        </div>
    `;

    app.appendChild(quizDiv);

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = timePerQuestion;
        document.getElementById('timer').textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // Auto move to next question
                if(currentQuestion < totalQuestions - 1){
                    currentQuestion++;
                    renderQuestion(currentQuestion);
                } else {
                    document.getElementById('submitQuiz').click();
                }
            }
        }, 1000);
    }

    function renderQuestion(index){
        const q = quiz.questions[index];
        const container = document.getElementById('questionContainer');

        let optionsHTML = '';
        q.options.forEach(opt => {
            const checked = userAnswers[index] === opt ? 'checked' : '';
            optionsHTML += `
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="question${index}" value="${opt}" class="accent-blue-600" ${checked}>
                    <span>${opt}</span>
                </label>
            `;
        });

        container.innerHTML = `
            <h2 class="font-semibold mb-2">${index + 1}. ${q.question}</h2>
            <div class="flex flex-col gap-2">${optionsHTML}</div>
        `;

        // Update progress bar
        const progressPercent = ((index) / totalQuestions) * 100;
        document.getElementById('progressBar').style.width = progressPercent + '%';

        // Show/hide buttons
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').style.display = index === totalQuestions - 1 ? 'none' : 'inline-block';
        document.getElementById('submitQuiz').style.display = index === totalQuestions - 1 ? 'inline-block' : 'none';

        // Save answer when selected
        container.querySelectorAll('input[type=radio]').forEach(radio => {
            radio.addEventListener('change', () => {
                userAnswers[index] = radio.value;
            });
        });

        startTimer(); // start/reset timer for this question
    }

    renderQuestion(currentQuestion);

    // Navigation
    document.getElementById('nextBtn').addEventListener('click', () => {
        if(currentQuestion < totalQuestions - 1){
            currentQuestion++;
            renderQuestion(currentQuestion);
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if(currentQuestion > 0){
            currentQuestion--;
            renderQuestion(currentQuestion);
        }
    });

    // Submit Quiz
    document.getElementById('submitQuiz').addEventListener('click', () => {
        clearInterval(timerInterval);
        let score = 0;
        quiz.questions.forEach((q, index) => {
            if(userAnswers[index] === q.answer) score++;
        }); 
         const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
   
    app.innerHTML = '';
    renderNavBar();

    // Result Page
    const resultDiv = document.createElement('div');
    resultDiv.className = 'mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl w-[928px] text-center';

    resultDiv.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-1xl">Quiz Completed</h1>
            <span class="text-xl font-semibold">${percentage}%</span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div class="bg-green-600 h-2 rounded-full" style="width: ${percentage}%"></div>
        </div>

      <!-- Single Score Display -->
<div class="bg-gray-100 p-6 rounded-lg text-left mt-4">
    <h3 class=" text-lg mb-2"> Score</h3>
    <p class="text-2xl font-bold text-black">${score} / ${totalQuestions}</p>

</div>
<p>Congratulations, Sarah! You've completed the quiz with a score of ${score} out of ${totalQuestions} Your performance indicates a strong understanding of the subject matter. Keep up the excellent work!</p>
      <button id="reviewAnswersBtn" 
    class="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg">
    Review Incorrect Answers
</button>
         <button onclick="renderQuizPage()" 
            class="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            Take Another Quiz
        </button>
    `;

    app.appendChild(resultDiv);
    // Add click event to review incorrect answers
document.getElementById('reviewAnswersBtn').addEventListener('click', () => {
    reviewAnswers(quiz, userAnswers);
});

    });
}
function displayQuizzes(filteredQuizzes){
  const container = document.getElementById('quizContainer');
  container.innerHTML = ''; // Clear previous

  filteredQuizzes.forEach(quiz => {
    const quizCard = document.createElement('div');
    quizCard.className = 'border rounded-lg p-4 shadow-md flex flex-col items-center';
    quizCard.innerHTML = `
     
    `;
    container.appendChild(quizCard);
  });
}
function reviewAnswers(quiz, userAnswers) {
    app.innerHTML = '';
    renderNavBar();

    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl w-[928px] text-left';

    const incorrectQuestions = quiz.questions
        .map((q, index) => ({ ...q, userAnswer: userAnswers[index] }))
        .filter(q => q.userAnswer !== q.answer);

    if (incorrectQuestions.length === 0) {
        reviewDiv.innerHTML = `
            <h1 class="text-2xl font-bold mb-4">Review Incorrect Answers</h1>
            <p class="text-lg text-green-600">Congratulations! You answered all questions correctly.</p>
            <button onclick="renderQuizPage()" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Back to Quizzes
            </button>
        `;
    } else {
        let questionsHTML = '';
        incorrectQuestions.forEach((q, i) => {
            questionsHTML += `
                <div class="mb-6 p-4  rounded-lg">
                    <h2 class="font-semibold mb-2">${i+1}. ${q.question}</h2>
                    <p><span class="font-semibold">Your Answer:</span> <span class="text-red-600">${q.userAnswer || 'No Answer'}</span></p>
                    <p><span class="font-semibold">Correct Answer:</span> <span class="text-green-600">${q.answer}</span></p>
                </div>
            `;
        });

        reviewDiv.innerHTML = `
            <h1 class="text-2xl font-bold flex mb-4">Review Incorrect Answers</h1>
            ${questionsHTML}
            <div class="flex justify-end">
            <button onclick="renderQuizPage()" class="mt-6 bg-blue-600  flex justify-end hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Back to Quizzes
            </button>
            </div>
        `;
    }

    app.appendChild(reviewDiv);
}