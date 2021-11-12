import * as React from 'react'
// import axios from 'axios'
import MovieList from './components/MovieList'
import MovieShow from './components/MovieShow'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Nav from './components/Nav'
import Register from './components/Register'
import MovieAdd from './components/MovieAdd'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getToken } from './helpers/auth'


function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Home />
      </main>
    </>
  )
}

function Movies() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieList />
      </main>
    </>
  )
}

function ShowOneMovie() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieShow />
      </main>
    </>
  )
}

function AddOneMovie() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieAdd />
      </main>
    </>
  )
}


function UserLogIn(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Login {...props} setIsLoggedIn={setIsLoggedIn} />
      </main>
    </>
  )
}

function UserRegister() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Register />
      </main>
    </>
  )
}

function NotFoundPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <NotFound />
      </main>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<Movies />}/>
        <Route path="/movies/:id" element={<ShowOneMovie />} />
        <Route path="/movies/new" element={<AddOneMovie />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/register" element={<UserRegister />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App