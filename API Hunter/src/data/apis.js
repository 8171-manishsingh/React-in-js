const apis = [
  {
    id: 1,
    name: "REST Countries",
    description: "Get information about countries via a RESTful API. Includes data like capital, population, currencies, languages, and more.",
    category: "Geography",
    url: "https://restcountries.com/v3.1/all",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://restcountries.com/"
  },
  {
    id: 2,
    name: "Cat Facts",
    description: "Daily cat facts API! Get random cat facts to entertain your users.",
    category: "Animals",
    url: "https://catfact.ninja/fact",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://catfact.ninja/"
  },
  {
    id: 3,
    name: "Dog API",
    description: "Thousands of dog images from breeds around the world. Random images, breed lists, and more.",
    category: "Animals",
    url: "https://dog.ceo/api/breeds/image/random",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://dog.ceo/dog-api/"
  },
  {
    id: 4,
    name: "PokeAPI",
    description: "All the Pokémon data you'll ever need! Includes Pokémon, moves, abilities, types, and evolution chains.",
    category: "Gaming",
    url: "https://pokeapi.co/api/v2/pokemon/ditto",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://pokeapi.co/"
  },
  {
    id: 5,
    name: "NASA APOD",
    description: "Astronomy Picture of the Day. Each day a different image or photograph of our fascinating universe.",
    category: "Science",
    url: "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
    auth: "API Key",
    cors: "Yes",
    pricing: "Free",
    docs: "https://api.nasa.gov/"
  },
  {
    id: 6,
    name: "OpenWeatherMap",
    description: "Access current weather data, forecasts, and historical data for any location worldwide.",
    category: "Weather",
    url: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY",
    auth: "API Key",
    cors: "Unknown",
    pricing: "Free Tier",
    docs: "https://openweathermap.org/api"
  },
  {
    id: 7,
    name: "JSONPlaceholder",
    description: "Free fake API for testing and prototyping. Perfect for tutorials and sample projects.",
    category: "Development",
    url: "https://jsonplaceholder.typicode.com/posts",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://jsonplaceholder.typicode.com/"
  },
  {
    id: 8,
    name: "JokeAPI",
    description: "Programmer jokes, general jokes, knock-knock jokes and more. Delivered in various formats.",
    category: "Entertainment",
    url: "https://v2.jokeapi.dev/joke/Any",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://jokeapi.dev/"
  },
  {
    id: 9,
    name: "CoinGecko",
    description: "Cryptocurrency market data including prices, trading volume, market cap, and blockchain data.",
    category: "Finance",
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    auth: "None",
    cors: "Yes",
    pricing: "Free Tier",
    docs: "https://www.coingecko.com/en/api"
  },
  {
    id: 10,
    name: "IPify",
    description: "A simple IP address lookup API. Get your public IP address or look up IP geolocation data.",
    category: "Tools",
    url: "https://api.ipify.org?format=json",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://www.ipify.org/"
  },
  {
    id: 11,
    name: "SpaceX Data",
    description: "Open source API for rocket, core, capsule, pad, and launch data from SpaceX.",
    category: "Science",
    url: "https://api.spacexdata.com/v4/launches/latest",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://github.com/r-spacex/SpaceX-API"
  },
  {
    id: 12,
    name: "Bored API",
    description: "Find a random activity to do when you're bored! Suggestions for things to do when you have free time.",
    category: "Entertainment",
    url: "https://www.boredapi.com/api/activity",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://www.boredapi.com/"
  },
  {
    id: 13,
    name: "Rick and Morty",
    description: "All character, location, and episode data from the Rick and Morty TV show.",
    category: "Entertainment",
    url: "https://rickandmortyapi.com/api/character",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://rickandmortyapi.com/"
  },
  {
    id: 14,
    name: "Unsplash",
    description: "Access to millions of free high-resolution photos. Search, get random photos, and more.",
    category: "Images",
    url: "https://api.unsplash.com/photos/random?client_id=YOUR_ACCESS_KEY",
    auth: "API Key",
    cors: "Yes",
    pricing: "Free Tier",
    docs: "https://unsplash.com/developers"
  },
  {
    id: 15,
    name: "Open Library",
    description: "Access book data, authors, subjects, and more. Search through millions of books in the Open Library.",
    category: "Books",
    url: "https://openlibrary.org/search.json?q=javascript",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://openlibrary.org/developers/api"
  },
  {
    id: 16,
    name: "News API",
    description: "Get breaking news headlines and search for articles from thousands of news sources worldwide.",
    category: "News",
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY",
    auth: "API Key",
    cors: "Unknown",
    pricing: "Free Tier",
    docs: "https://newsapi.org/"
  },
  {
    id: 17,
    name: "TheMealDB",
    description: "Recipes, meal categories, ingredients, and area-based cuisine data. Perfect for cooking apps.",
    category: "Food",
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://www.themealdb.com/api.php"
  },
  {
    id: 18,
    name: "GitHub API",
    description: "Access GitHub data including repositories, users, issues, commits, and more.",
    category: "Development",
    url: "https://api.github.com/users/octocat",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://docs.github.com/en/rest"
  },
  {
    id: 19,
    name: "Trivia API",
    description: "Generate trivia questions with categories, difficulty levels, and multiple choice formats.",
    category: "Gaming",
    url: "https://opentdb.com/api.php?amount=10",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://opentdb.com/api_config.php"
  },
  {
    id: 20,
    name: "Zippopotam",
    description: "Look up location data by zip/postal code. Get city, state, and coordinates for any US zip code.",
    category: "Tools",
    url: "https://api.zippopotam.us/us/90210",
    auth: "None",
    cors: "Unknown",
    pricing: "Free",
    docs: "https://www.zippopotam.us/"
  },
  {
    id: 21,
    name: "Advice Slip",
    description: "Get random advice slips for inspiration, motivation, or just a smile.",
    category: "Entertainment",
    url: "https://api.adviceslip.com/advice",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://api.adviceslip.com/"
  },
  {
    id: 22,
    name: "Faker API",
    description: "Generate massive amounts of fake data for testing and development purposes.",
    category: "Development",
    url: "https://fakerapi.it/api/v1/persons",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://fakerapi.it/"
  },
  {
    id: 23,
    name: "Agify",
    description: "Predict the age of a person given their name. Uses machine learning on millions of data points.",
    category: "Tools",
    url: "https://api.agify.io?name=michael",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://agify.io/"
  },
  {
    id: 24,
    name: "Nationalize",
    description: "Predict the nationality of a person given their name. Based on global name distribution data.",
    category: "Tools",
    url: "https://api.nationalize.io?name=john",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://nationalize.io/"
  },
  {
    id: 25,
    name: "Genderize",
    description: "Predict the gender of a person given their name. Simple and accurate machine learning API.",
    category: "Tools",
    url: "https://api.genderize.io?name=luca",
    auth: "None",
    cors: "Yes",
    pricing: "Free",
    docs: "https://genderize.io/"
  }
];

export const categories = [
  "All",
  "Animals",
  "Books",
  "Development",
  "Entertainment",
  "Finance",
  "Food",
  "Gaming",
  "Geography",
  "Images",
  "News",
  "Science",
  "Tools",
  "Weather"
];

export default apis;

