import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Header() {
  return (
    <header>
      <h1>Bala's <span className="highlight-red">Kitchen</span>!</h1>
    </header>
  );
}

function Main() {
  return (
    <section>
      <p>We teach you how to serve delicious food</p>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <h3><span className="highlight-red">Thank you</span> for visiting<span className="highlight-red">!!</span></h3>
    </footer>
  );
}

function BasicExample({ Card_Title, Card_Description }) {
  return (
    <Card style={{ width: '12rem', margin: '10px' }}>
      <Card.Img variant="top" src="https://via.placeholder.com/100x180" />
      <Card.Body>
        <Card.Title>{Card_Title}</Card.Title>
        <Card.Text>{Card_Description}</Card.Text>
        <Button variant="primary" style={{ color: 'white' }}>
          <Link to={`/recipe/${Card_Title}`} style={{ color: 'white', textDecoration: 'none' }}>
            Show recipe
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

function Recipe() {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes?title=${title}`)
      .then(response => {
        // Assuming the server returns an array of recipes, we take the first one
        setRecipe(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setRecipe(null); // Set recipe to null in case of an error
      });
  }, [title]);


  // Display a loading message or similar until the data is fetched
  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>Recipe for {recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(response => {
        // The data is located in response.data
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setRecipes([]); // Set recipes to an empty array in case of an error
      });
  }, []);


  return (
    <Router>
      <div>
        <Header />
        <Main />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/recipe/:title" element={<Recipe />} />
          </Routes>
          <div className="row justify-content-around">
            {recipes.map((recipe) => (
              <div className="col-sm-auto" key={recipe.id}>
                <BasicExample Card_Title={recipe.title} Card_Description={recipe.description} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


function Home() {
  return <h2>Home</h2>;
}

export default App;
















//dummy json data
/*
{
"id": 4,
"title": "Chicken Tikka Masala",
"description": "Creamy and spicy Indian chicken dish with a tomato-based sauce.",
"image": "https://via.placeholder.com/150",
"ingredients": [ "Chicken thighs",
"Yogurt",
"Tomato sauce",
"Garam masala",
"Ginger",
"Garlic",
"Cream"
],
"instructions": "Marinate chicken in yogurt and spices, then grill or bake. Simmer in tomato sauce with cream..."
}

,
{
"id": 5,
"title": "Pad Thai",
"description": "Thai stir-fried noodles with tofu, shrimp, or chicken, flavored with tamarind and peanuts.",
"image": "https://via.placeholder.com/150",
"ingredients": [ "Rice noodles",
"Tofu",
"Shrimp",
"Bean sprouts",
"Eggs",
"Tamarind paste",
"Peanuts"
],
"instructions": "Soak rice noodles in warm water. Stir-fry tofu, shrimp, and eggs. Add noodles and sauce..."
}*/