import React, {useState, useEffect}  from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      className={`App-logo${loading ? ' App-logo-spinning' : ''}`}
      alt='interactive-logo'
    />
  )
}

// 8
const CategoryButton = ({ title, onClick }) => {
  return (
    <div>
  <button className="Cat-button" onClick={onClick} id={title}>
    <code>{title}</code>
  </button>
  </div>
  )
}

// 8
const CategoriesList = ({ categories, onCategoryClick }) => {

  return (
  // per ciascun elemento di 'categories' renderizzare il componente <CategoryButton />

  <div>
      {categories.map((category, index) => 

          <CategoryButton
          key={`tag-${index}`}
          title={category}
          onClick={onCategoryClick}
          />

      )}
  </div>
  )
}


const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{categories}</code><br/>
      <span className={`Dont-View-Cat${categories === "" ? "Selected-Cat" : "" }`} >
         <code >{value}</code>
       </span>
      </div>
  )
}

function App() {
  // qui tutto ciò che serve al componente per essere inizializzato
  const [testoInput, setTestoInput] = useState('')
  const [fetchedJoke, setFetchedJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')


  const launchErrorAlert = (errorX) => {
    console.log("launchErrorAlert")
    if (errorX === true) { 
      (testoInput === "") ? alert("valore di ricerca non settato") : alert("la ricerca non ha trovato nulla")
      setTestoInput("")
    }
  }


  // 10 funzione che recupera una singola barzelletta e la salva
  const getRandomJokeByCat= async () => {
    //variabili d'appoggio
    let quote = {}
    let errorX = false
    let url =""


    try {
      setLoading(true)
     
      url = `${RANDOMJOKEBYCATURL}${selectedCategory}`
      console.log(url)
      //let response = await fetch(ALLLJOKESBYKEYWORD + testoInput)
      const response = await fetch(url)
      let data = await response.json()
      //se qualcosa non va -> errore, da gestire
      if (data.error) throw new Error(data.error)

      quote = {...data}

    } catch (err) {

      errorX = true
      console.log("L'errore dice: " , err)

    } finally {

      //non sono più in fase di caricamento
      setLoading(false)
      //salvo la variabile d'appoggio nello stato dell'errore:
      setError(errorX)

      if (errorX === true){
        console.log("errorX dentro")
        launchErrorAlert(errorX)
      } else {
        console.log("setFetchedJoke")
        setFetchedJoke(quote.value)
      }

    }
  }

 
  // 9 funzione richiamata al click del componente CategoryButton
  const onCategoryClick = (event) => {

    setTestoInput(event.currentTarget.id )
    setFetchedJoke("")
    setSelectedCategory(event.currentTarget.id)

  }


  // 7 funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
  const getAllCategories = async () => {
    //variabili d'appoggio
    let quote = {}
    let errorX = false
    var categ=[]

    try {
      setLoading(true)
     
      //const response = await fetch(ALLCATEGORIESURL+"2")
      const response = await fetch(ALLCATEGORIESURL)
      let data = await response.json()
      //se qualcosa non va -> errore, da gestire
      if (data.error) throw new Error(data.error)

      quote = {...data}

    } catch (err) {

      errorX = true
      console.log("L'errore dice: " , err)

    } finally {

      //non sono più in fase di caricamento
      setLoading(false)
      //salvo la variabile d'appoggio nello stato dell'errore:
      setError(errorX)

      if (errorX === true){
        console.log("url delle categorie errato")
        //launchErrorAlert(errorX)
      } else {
        
        for (var cat in quote){
         categ.push(quote[cat]);
        }
        console.log(Array.isArray(categ))
        setCategories(categ)

      }
    }
  }


  // 2 - funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  const getJokeByKeyword = async () => {
    //variabili d'appoggio
    let quote = {}
    let errorX = false
    let url =""


    try {
      setLoading(true)
     
      url = `${ALLLJOKESBYKEYWORD}${testoInput}`

      const response = await fetch(url)
      let data = await response.json()
      //se qualcosa non va -> errore, da gestire
      if (data.error) throw new Error(data.error)

      quote = {...data.result}
      //vedo qual'è il dato
      console.log(quote)
      console.log(data.result)
      console.log(quote[0].value)

    } catch (err) {

      errorX = true
      console.log("L'errore dice: " , err)

    } finally {

      //non sono più in fase di caricamento
      setLoading(false)
      //salvo la variabile d'appoggio nello stato dell'errore:
      setError(errorX)

      if (errorX === true){
        console.log("errorX dentro")
        launchErrorAlert(errorX)
      } else {
        setFetchedJoke(quote[0].value)
      }

    }
  }


  // 1 - handler per l'input di testo
  const onInputTextChange= (event) => {
    setTestoInput(event.target.value)
    console.log(event.target.value)
    setFetchedJoke("")
  }

  // qui i lifecycle methods
  useEffect(() => {
    getAllCategories()
  }, [])


    return (
      <div className="App">
        <div className="App-header">
        
          <Logo
            loading={loading}
          />

          <input
            type="search"
            id="search"
            name="search"
            placeholder="Enter keyword here"
            value={testoInput}
            onChange={onInputTextChange}
          />

          <button
            className="Search-Button"           
            onClick={getJokeByKeyword}
          >
          <code>CLICK TO SEARCH!</code>

          </button>
          <code>or: </code>
          <CategoriesList
             categories={categories}
             onCategoryClick={onCategoryClick}
          />
        </div>

        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />

          <code>
          { !error && (
            <h2>
              SELECTED CATEGORY:
              <span className="Selected-Cat">
              {testoInput}
              </span>
            </h2>
          )}
          </code>

          <button
            className="Random-Button"
            onClick={getRandomJokeByCat}
          >
            <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
          </button>

          {testoInput !== "" && (
          <Joke
            value={fetchedJoke}
            categories={testoInput}
          />
          )}

        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Monica Schiavina</code>
        </div>
      </div>
    );

};

export default App;
