const quizData = [
  {
    question: '1. What is 7 × 8?',
    options: ['54', '56', '64', '72'],
    correctIndex: 1,
  },
  {
    question: '2. What is 15% of 200?',
    options: ['15', '20', '30', '35'],
    correctIndex: 2,
  },
  {
    question: '3. What is 12 + 18 ÷ 6?',
    options: ['5', '15', '20', '25'],
    correctIndex: 1,
  },
  {
    question: '4. What is the square root of 144?',
    options: ['10', '11', '12', '14'],
    correctIndex: 2,
  },
  {
    question: '5. Simplify 3(2x + 4)',
    options: ['6x + 4', '6x + 12', '2x + 12', '3x + 4'],
    correctIndex: 1,
  },
  {
    question: '6. What is the value of π (pi) approximately?',
    options: ['2.14', '3.14', '4.14', '5.14'],
    correctIndex: 1,
  },
  {
    question: '7. If a triangle has angles 40° and 75°, what is the third angle?',
    options: ['55°', '65°', '70°', '75°'],
    correctIndex: 1,
  },
  {
    question: '8. What is 6²?',
    options: ['12', '18', '30', '36'],
    correctIndex: 3,
  },
  {
    question: '9. What is 3/4 + 1/6?',
    options: ['7/12', '5/6', '11/12', '1'],
    correctIndex: 2,
  },
  {
    question: '10. Solve for x: 2x + 3 = 11.',
    options: ['3', '4', '5', '6'],
    correctIndex: 1,
  },
];

let currentQuestionIndex = 0;

const questionElem = document.getElementById('question');
const optionsContainer = document.querySelector('.options');
const feedbackElem = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

function renderQuestion() {
  const current = quizData[currentQuestionIndex];
  questionElem.textContent = current.question;
  optionsContainer.innerHTML = '';

  current.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.dataset.index = index;
    btn.addEventListener('click', handleAnswerClick);
    optionsContainer.appendChild(btn);
  });

  feedbackElem.textContent = '';
}

function handleAnswerClick(event) {
  const selected = Number(event.currentTarget.dataset.index);
  const isCorrect = selected === quizData[currentQuestionIndex].correctIndex;
  feedbackElem.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect, try again.';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
  renderQuestion();
});

const FORUM_STORAGE_KEY = 'education_website_forum_posts';
const forumForm = document.getElementById('forum-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const postsList = document.getElementById('posts');

function loadForumPosts() {
  const raw = localStorage.getItem(FORUM_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Invalid forum storage data; resetting.', err);
    return [];
  }
}

function saveForumPosts(posts) {
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
}

function renderForumPosts() {
  const posts = loadForumPosts();
  postsList.innerHTML = '';

  if (posts.length === 0) {
    const placeholder = document.createElement('li');
    placeholder.textContent = 'No posts yet. Be the first to contribute!';
    placeholder.style.fontStyle = 'italic';
    postsList.appendChild(placeholder);
    return;
  }

  posts.slice().reverse().forEach((post) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${post.username}</strong><small>${new Date(post.createdAt).toLocaleString()}</small><p>${post.message}</p>`;
    postsList.appendChild(li);
  });
}

forumForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (!username || !message) return;

  const posts = loadForumPosts();
  posts.push({ username, message, createdAt: Date.now() });
  saveForumPosts(posts);

  usernameInput.value = '';
  messageInput.value = '';

  renderForumPosts();
});

renderQuestion();
renderForumPosts();
