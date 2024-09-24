const postsContainer = document.getElementById('postsContainer');
const postButton = document.getElementById('postButton');
const postContent = document.getElementById('postContent');

let posts = []; // This will act as our in-memory database

// Function to render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-content">${post.content} <span class="likes">${post.likes} ❤️</span></div>
            <button onclick="likePost(${index})">Like</button>
            <div class="comments">
                <input type="text" id="commentInput${index}" placeholder="Add a comment">
                <button onclick="addComment(${index})">Comment</button>
                <div class="comment-list" id="commentList${index}">
                    ${post.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
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

// Function to post new content
postButton.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
        posts.push({ content, likes: 0, comments: [] });
        postContent.value = '';
        renderPosts();
    }
});

// Function to like a post
function likePost(index) {
    posts[index].likes += 1;
    renderPosts();
}

// Function to add a comment
function addComment(index) {
    const commentInput = document.getElementById(`commentInput${index}`);
    const comment = commentInput.value.trim();
    if (comment) {
        posts[index].comments.push(comment);
        commentInput.value = '';
        renderPosts();
    }
}

// Function to add an emoji
function addEmoji(index, emoji) {
    posts[index].comments.push(emoji);
    renderPosts();
}
