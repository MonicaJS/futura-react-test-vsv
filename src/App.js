import React, {useState, useEffect}  from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this
const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

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

const CategoryButton = ({ title, onClick }) => {
  return null
  // <button className="Cat-button" ... >
  //   <code>{title}</code>
  // </button>
}


const CategoriesList = ({ categories, onCategoryClick }) => {
  return null
  // per ciascun elemento di 'categories' renderizzare il componente <CategoryButton />
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

  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [testoInput, setTestoInput] = useState('')
  const [fetchedJoke, setFetchedJoke] = useState("")
  const [loading, setLoading] = useState(false)


  // funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
  const getAllCategories = async () => {
    //variabili d'appoggio

  }

  // onCategoryClick
  // funzione richiamata al click del componente CategoryButton

  // funzione che recupera una singola barzelletta e la salva
  const getRandomJokeByCat = (event) => {

   
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

      //let response = await fetch(ALLLJOKESBYKEYWORD + testoInput)
      const response = await fetch(url)
      let data = await response.json()
      //se qualcosa non va -> errore, da gestire
      if (data.error) throw new Error(data.error)

      quote = {...data.result}
      //vedo qual'è il dato
      console.log(quote)
      console.log(quote[0].value)



    } catch (err) {
      //console.log('Sono nel catch: ', err)
      //&#128165
      errorX = true
    } finally {

      //non sono più in fase di caricamento
      setLoading(false)
      //salvo la variabile d'appoggio nello stato dell'errore:
      setError(errorX)
      //setCurrentQuote(errorX ? {} : quote)

      //setCitTag([...quote._embedded.tag])
      //console.log(quote._embedded.tag)

      //abilito il pulsante per salvare la citazione:
  
      setFetchedJoke(quote[0].value)
      console.log(quote)
      console.log(fetchedJoke)

    }
  }


  // 1 - handler per l'input di testo
  const onInputTextChange= (event) => {
    setTestoInput(event.target.value)
    console.log(event.target.value)
    
    //this.setState({[event.target.name]: event.target.value}) 
    //currentCit={currentQuote}
  }

  //const onInputTextChange = (event) => setInputText(event.target.value)
  

  // qui i lifecycle methods

  useEffect(() => {
    console.log('useEffect con deps vuoto')
  }, [])

    //si esegue quando cambia selectedTag
    useEffect(() => {
      console.log('useEffect agganciato a selectedTag: ', fetchedJoke)
    }, [fetchedJoke])
    useEffect(() => {
      console.log('useEffect agganciato a selectedTag: ', loading)
    }, [loading])


  // render () {
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
            // ...
          />
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          <code>
            <h2>
              SELECTED CATEGORY:
              <span className="Selected-Cat">
              {testoInput}
              </span>
            </h2>
          </code>
          <button
            className="Random-Button"
            // ...
          >
            <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
          </button>
          <Joke
            value={fetchedJoke}
            categories={testoInput}
          />
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: </code>
        </div>
      </div>
    );
  // }
};

export default App;
