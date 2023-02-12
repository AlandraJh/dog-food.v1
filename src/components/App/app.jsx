import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './index.css';
import SeachInfo from '../SeachInfo';
import Button from '../Button/button';
import api from '../../Api';
import useDebounce from '../../useDebounce';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceValue = useDebounce(searchQuery, 500);

  const handleRequest = () => {
		api.search(searchQuery)
			.then(data => {
				setCards(prevState => data)
			})
			.catch( err => console.log(err))
	}
  
  
  
  // const handleRequest = async () => {
  //   if (!debounceValue) {
  //     const allCards = await api.getProductList();
  //     setCards(allCards.products);
  //   } else {
  //     const filterCards = await api.search(debounceValue);
  //     setCards(filterCards);
  //   }
  // }

  useEffect(() => {
    handleRequest()
    console.log("INPUT", debounceValue);
  },[debounceValue])


  useEffect(() => {
      Promise.all([api.getProductList(), api.getUserInfo()])
         .then(([productData, userData]) => {
           setCurrentUser(userData);
           setCards(productData.products);
         });
     }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdate) {
		api.setUserInfo(userUpdate).then((newUserData) => {
			setCurrentUser(newUserData);
		  });
	}

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
      <SeachInfo searchCount={cards.length} searchText={debounceValue}/>
       <Sort/>
        <div className='content__cards'>
         <CardList goods={cards}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;
