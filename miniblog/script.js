const postForm = document.getElementById('postForm');
const postsDiv = document.getElementById('posts');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        postForm.reset();
        loadPosts();
    }
});

async function loadPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    postsDiv.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        postsDiv.appendChild(postElement);
    });
}

loadPosts();
