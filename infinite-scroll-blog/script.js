const postsContainer = document.getElementById("posts-container");
const loader = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

// Fetch posts from API
const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
};

// Show posts in DOM
const showPosts = async () => {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

// Show loader & fetcb more posts
const showLoader = () => {
  loader.classList.add("show");

  page++;
  showPosts();

  setTimeout(() => {
    loader.classList.remove("show");
  }, 300);
};

// Filter posts by search input
const filterPosts = (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toLowerCase();
    const body = post.querySelector(".post-body").innerText.toLowerCase();

    if (title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

// Show initial posts
showPosts();

// Event listeners 
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight > scrollHeight - 50) {
    showLoader();
  }
});

filter.addEventListener("input", filterPosts);
