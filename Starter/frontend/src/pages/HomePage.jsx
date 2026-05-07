import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

// Fetch all posts from the backend and render them.

// 1) Keep local state for posts, loading, and error.
function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 2) In useEffect, call GET /api/posts.
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/posts', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      // 3) Show loading and error states.
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })
    
    return () => controller.abort()
  }, [])

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet.</p>
      ) : (
        <ul className="post-list">
          {/* 4) Map posts into PostCard components.*/}
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
