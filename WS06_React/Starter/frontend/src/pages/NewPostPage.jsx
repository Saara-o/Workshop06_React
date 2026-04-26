import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// Implement create flow (POST /api/posts).

function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // TODO (student): Implement this submit logic.
    // 1) Read form values in handleSubmit.
    const form = e.target
    const title = form.title.value
    const author = form.author.value
    const content = form.content.value

    // 2) POST JSON body to /api/posts.
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json',},
        body: JSON.stringify({title, author, content})
      })
      // 4) Show an error message on failure.
      if (!res.ok) {
        throw new Error('Failed to create a new post')
      }
      // 3) On success, navigate to /posts/:id.
      const data = await res.json()
      navigate(`/posts/${data._id}`)

    } catch (error) {
      setError(error.message)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
