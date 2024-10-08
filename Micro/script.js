const postsContainer = document.getElementById('postsContainer');
const postButton = document.getElementById('postButton');
const postContent = document.getElementById('postContent');
const loginContainer = document.getElementById('loginContainer');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');

let posts = []; // This will act as our in-memory database
let loggedInUser = null; // To track the logged-in user

// Example user data for login (this should ideally come from a secure database)
const users = {
    'user1': 'password1',
    'user2': 'password2',
};

// Function to render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-content">${post.content} <span class="likes">${post.likes} ❤️</span></div>
            <button onclick="likePost(${index})">Like</button>
            <button onclick="deletePost(${index})">Delete Post</button>
            <div class="comments">
                <input type="text" id="usernameInput${index}" placeholder="Your username" required>
                <input type="text" id="commentInput${index}" placeholder="Add a comment" required>
                <button onclick="addComment(${index})">Comment</button>
                <div class="comment-list" id="commentList${index}">
                    ${post.comments.map((comment, commentIndex) => `
                        <div class="comment">
                            <strong>${comment.username}:</strong> ${comment.text}
                            <button onclick="deleteComment(${index}, ${commentIndex})">Delete</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="emoji-container">
                <span class="emoji" onclick="addEmoji(${index}, '😊')">😊</span>
                <span class="emoji" onclick="addEmoji(${index}, '😢')">😢</span>
                <span class="emoji" onclick="addEmoji(${index}, '😂')">😂</span>
                <span class="emoji" onclick="addEmoji(${index}, '😡')">😡</span>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Function to handle login
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (users[username] && users[username] === password) {
        loggedInUser = username;
        loginContainer.style.display = 'none';
        postsContainer.style.display = 'block';
        loadPosts();
        renderPosts();
    } else {
        loginError.textContent = 'Invalid username or password.';
    }
});

// Function to load posts from local storage
function loadPosts() {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
        posts = storedPosts;
        renderPosts();
    }
}

// Function to post new content
postButton.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
        posts.push({ content, likes: 0, comments: [] });
        postContent.value = '';
        renderPosts();
        updateLocalStorage(); // Save to local storage
    }
});

// Other functions remain the same...

// Update local storage whenever posts change
function updateLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// On initial load, show login form
window.onload = () => {
    loadPosts();
};
