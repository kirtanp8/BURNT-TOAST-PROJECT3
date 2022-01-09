# BURNT-TOAST--Movie-Review-Site

An application for reviewing and discussing movies.

Feel free to browse the application at: http://burnt-toast-ga.herokuapp.com/ 

* Username: Burnt Toast
* Password: admin

# Team Members 

* [Arthur](https://github.com/arthur-ruxton)
* [Shahrukh](https://github.com/shak-h)

# Overview 

The Brief for this project was to build a MERN stack application utilising:

* **M**ongoDB - document database
* **E**xpress(.js) - Node.js web framework
* **R**eact(.js) - a client-side JavaScript framework
* Node(.js) - the premier JavaSCript web server

Working in a group of 3, it was decided that we create a website similar to Rotten Tomatoes with the sole focus allowing a user to discuss movies, comment on them, add movies to a Database and delete and edit what they have added. 

# Languages/Technologies Used

* HTML5, CSS3
* SASS, Bootstrap
* JavaScript ES6+
* React
* Node.js, Express.js
* MongoDB
* Axios
* Yarn, NPM
* Git, GitHub
* Font Awesome

# Approach / Planning

We thought it would be a good idea to start off by using a wireframe to picture something to aim for and used trello to plan what needed to be done in order to reach the MVP.

Below I have attached a copy of one of our wireframes which was the homepage to use as an example:
![Screenshot 2022-01-08 at 22 47 09](https://user-images.githubusercontent.com/83728526/148662437-f827e0ae-3e96-43b6-a8e7-0c29fc0d9fa7.png)


Below I have attached a copy of our Trello Board: 
![Screenshot 2022-01-08 at 22 43 23](https://user-images.githubusercontent.com/83728526/148662363-45a84bb0-4ac6-4989-8cf0-676afeb9a923.png)


# Teamwork

We used VSCode's LiveShare extension from my desktop most days and we would all work on seperate elements, when one of us got stuck, we would tackle the problems together.  

# Individual Tasks

I was tasked with more work in the front-end than the back-end as I felt that I wasn't completely strong with it and I would only slow the team down if I were to allocate most of my time to it, even though I wanted to. However, this did not stop me from getting completely stuck in. 

Listed below are some of the things I worked on individually: 

**Back-end**
* Add a Movie to the Data Base
* Remove Movie from the Data Base
* Edit Movie in the Data Base

**Front-end**
* Search Bar 
* The Carousel on the Home Page
* The Add Movie Form
* The Remove Movie Function 
* The Edit Movie Form

# Back-end Individual Tasks

To get the user Create, Update and Delete functions To Work in the back-end I created the below functions:

 
**Delete** 

The delete a movie function below:
* First checks which movie has been deleted by grabbing the id from the request url. 
* Then with the line here -> `if (!movieToDelete.owner.equals(req.currentUser._id))`, it checks to see if the user was the one who added it to the database.
* If not the function throws an error. 

```
export const removeMovie = async (req, res) => {
  try {
    const { id } = req.params
    const movieToDelete = await Movie.findById(id)
    if (!movieToDelete) throw new Error()
    if (!movieToDelete.owner.equals(req.currentUser._id)) throw new Error()
    await movieToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found'})
  }
}

```
**Create**

The add a movie function below:
* Requires a logged in user, in order to add a user to the database. 
* It will then take in the details provided in the form on the front-end, if a user isn't logged in or the correct details haven't been provided. The function will throw an error.

```
export const addMovie = async (req, res) => {
  try {
    const newMovie = { ...req.body, owner: req.currentUser._id }
    const movieToAdd = await Movie.create(newMovie)
    return res.status(201).json(movieToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}
```

**Edit**

The edit a movie function below: 
* First checks which movie is being edited through the url provided.
* Then takes in the changes and returns the updated movie.
* However, it will throw an error if the user who makes the request is not the owner. 


```
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params
    await Movie.findByIdAndUpdate(id, req.body)
    const updatedMovie = await Movie.findById(id)
    return res.status(202).json(updatedMovie)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found'})
  }


```

# Front-end Individual Tasks

**Search Bar**

To get the Search Bar to work I created the below functions:
* The first step was to be able access all of the movies listed in our database, I did this by using a get request and a `useEffect()` function.
* Then I stored all of the movies from the get request which returns an array of objects containing details of film in each object.

```
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const config = {
          method: 'get',
          url: '/api/movies',
          headers: {}
        }
        const { data } = await axios(config)
        setInfo(data)
        console.log(info)
        console.log('Info', info)
      } catch (err) {
        console.log(err)
      }
    }
    fetchMovie()
  }, [film])

```

* I then use the below `for loop` to push all of the films in to an empty array called `arrayOfAllFilms`.

```
for (let i = 0; i < info.length; i ++) {
    arrayOfAllFilms.push(info[i].title)
  }

  arrayOfAllFilms.sort()
```

* We then find out what the user has searched for with the below functions.
* The `handleSubmit()` funciton finds out what the user has searched for.
* `if` the film exists in the database it navigates to the film's page.
*  `else if` the user types a film that does not yet exist the search bar just keeps the user on the home page or sends them there if they are not there already. 

```

  const handleChange = (event) => {
    setSearch(event.target.value)
    console.log('Search', search)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    setFilm(search)
    if (!arrayOfAllFilms.includes(search)) {
      navigate('/')
    }
    const filmObject = info.filter(item => item.title === search)
    if (filmObject[0]._id === null || filmObject[0]._id === undefined) {
      return 
    } else {
      const filmObjectId = filmObject[0]._id
      console.log('Film Object Id', filmObjectId)
      navigate(`/movies/${filmObjectId}`)
      setSearch('')
    }
  }


```

**Edit Movie Form**

To get the Edit a Movie Form to work we used the following functions:

* The Edit Form requires the following list of fields to be filled out in the form `title`, `director`, `releaseYear`, `description`, `image`, `genre`, `cast` 

```

  const [movie, setMovie] = useState({
    title: '',
    director: '',
    releaseYear: '',
    description: '',
    image: '',
    genre: '',
    cast: ''
  })
  
  
```

* The below function `fethchOneMovie(id)` is imported from another file in our front-end.
* We use the `fethchOneMovie(id)` function to find out which film page the user is on after collecting the id from `const { id } = useParams()`.
* `.then(setMovie)` is used to fill the required fields with the data already in the database.
* Meaning the user will be able to play with the information already there. 

```

  useEffect(() => {
    fetchOneMovie(id).then(setMovie)
  }, [id])
  
```

* The below function then collects the data which has been added in by the user and amended the `[movie]` variable above. 

```

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setMovie({
      ...movie,
      [name]: value
    })
  }

```
* However it only updates with the use of the `handleSubmit()` function below.

```
  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = getAxiosRequestConfig(`/movies/${id}`, movie, 'put')

    try {
      const response = await axios(config).catch(handleError)

      console.log(response.data)
      setIsError(false)
      navigate(`/movies/${response.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

```


# Home Page 

Below is a picture of our home page, where users can immediately see films being displayed with an automatic Carousel right in the middle of their screen + they can see its possible to search for a film through a search bar, however, it would have been impossible to add every single film to the database so we just added our favourites.  

![Screenshot 2022-01-01 at 17 21 14](https://user-images.githubusercontent.com/83728526/147856266-5e0a6b69-40c0-4dca-8cb0-ab93bb35b0f3.png)

# Secure Routes 

In order to use all of Burnt Toast's features, the user must be logged in with an existing account which they can obtain from using the sign up form the website provides. 

https://user-images.githubusercontent.com/83728526/147856929-9b63cb02-3d24-4756-8216-026ba4c155f1.mp4

# Comments

One of the most interesting features of our website is being able to like comments + being able to comment and rate a move with the use of a form. I think here we could have made it so that the user can make the comment on the same page instead of being taken to a different page where they have to fill out a form. 

https://user-images.githubusercontent.com/83728526/147858698-c934adeb-f73e-4fb8-8ed5-1cacc4548f14.mp4

# Search Bar

The implementation of a search bar is another cool feature to include and one that I'm very proud of, it's definitely necessary and is also a feature used in the Rotten Tomatoes website. 

I also think the use of a dropdown menu is required here because we don't have every single film in our database, although this wouldn't be seen on most mainstream websites. 

https://user-images.githubusercontent.com/83728526/147858994-5ddcdc00-f8df-4cd2-a949-db0a55c93df3.mp4


# Further Pages

Some further pages, include a user Profile page, an Edit form and a Delete Button where users can edit and delete the movies they have added to the database. 


# Challenges 

* Learning how to use 'bcrypt' for the first time to store and hash passwords was a very enjoyable challenge! 
* Getting used to working with the backend and seeing how both the front-end and back-end interact with one another. 
* Experiencing how to use Git development branches when working in a team, it was completely new to me but honestly something I'm glad I have now got some experience with. 
* **React had an update** React Router 6 came in during the time we started our project and `Redirect` was replaced with `useNavigate`, so finding out the changes through documentation was probably a small glimpse of what industry practice could be like. 

# Wins 

* The design is really good, the colour schemes, the styling, the use of React Bootstrap, I can tell a lot of websites I use regularly most likely use it too. I wish I had found out about it when doing project two :sob:.  
* Working with Arthur and Shahrukh, I feel like I've made some good friends in those two. Time can go by very quickly when you have colleagues who are fun to work with. Not everything was pitch perfect of course, we had our disagreements but being able to compromise and respect one another's opinions/methods is what it means to be a good team.
* I had more chances to problem solve and debug errors.
* Working with Shahrukh and Arthur was a really fun experience, I would definitely enjoy working with them in the near future too as we all worked really hard and had a lot of fun doing so, some days we worked 9.00am - 1.00am with a few food breaks in between, but I personally never felt burnt out doing so, as I was doing what I loved and had company doing so, I feel time can go a lot faster with great company. 

# Future Enhancements

* Being able to edit the user profile would be a cool addition to have.
* Users being able to follow one another would be cool. 

# Key Learnings

* CRUD: Learning how to implement CRUD functionalities and testing if they work in the back-end with the use of Postman and Insomnia.
* Learning how the back-end interacts with the front-end. For example: the data we retrieve from the Register Form (front-end) and how it sends the data to the back-end if the user has correctly added in their details.

