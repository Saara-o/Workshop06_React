# README (Workshop 06 – Tasks 1–8)
This project is part of Laurea's Full Stack Development course. The goal of this workshop is to build full React frontend that works with backend API.
  
I’ve completed Tasks 1–8 so far. Backend + routing + CRUD + frontend routing + fetching + creating posts all working.  
Task 9 and 10 not done yet.

---

## Part 1 — Backend

### Task 1 – Express server setup
In `server.js`:
- added 404 + 500 handlers  
- connected to MongoDB using MONGODB_URI  

### Task 2 – Post model
In `models/Post.js`:
- added `title` (String, required, trim, minlength 3)  
- added `content` (String, required, trim, minlength 10)  
- added `author` (String, required, trim)  
- enabled timestamps  

### Task 3 – Update (PUT /:id)
In `routes/posts.js`:
- validated id with `isValidObjectId`  
- used `findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`
- returned 404 if not found  
- returned 400 for validation errors  
- returned 500 for unexpected errors  

### Task 4 – Delete (DELETE /:id)
In `routes/posts.js`:
- validated id  
- used `findByIdAndDelete()`  
- returned 404 if not found  
- returned JSON success message  
- handled 500 errors  

---

## Part 2 — Frontend

### Task 5 – Routing
In `src/App.jsx` I checked all routes:
- `/` → LandingPage  
- `/about` → AboutPage  
- `/contact` → ContactPage  
- `/blog` → HomePage  
- `/posts/new` → NewPostPage  
- `/posts/:id` → PostPage  
- `/posts/:id/edit` → EditPostPage  
- `*` → NotFoundPage  

### Task 6 – Navigation
In `Header.jsx`:
- added About, Contact, and New Post
- added navigation links

### Task 7 – Fetch and display posts
In `HomePage.jsx`:
- added state for posts, loading, error  
- used `useEffect` to fetch from `GET /api/posts`  
- stored posts in state  
- handled loading + error  
- mapped posts into `<PostCard />`  

### Task 8 – Create a new post
In `NewPostPage.jsx`:
- read form values from the submitted form  
- sent POST request to `/api/posts` with JSON body  
- parsed the returned post  
- navigated to `/posts/:id` using `_id`  
- displayed error message on failure  

Create flow works and redirects correctly (Task 9 not implemented yet so the page is empty).


### Task 9

### Task 10