import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StatusBar } from 'react-native';

// STYLED COMP
const Container = styled.ScrollView`
  flex-grow: 1;
  background: #f1f1f1;
  margin: 0;
`;
const StyledView = styled.View`
  margin: 0;
  padding: 1rem;
`;
const StyledRowView = styled.View`
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TextHeading = styled.Text`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1E1E1E;
  margin: 2rem 1.5rem 1.5rem 1.5rem;  
  padding: 1.5rem 1rem;
  text-align: center;
  background: transparent;
  border: 7px solid #1E1E1E;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
const Text = styled.Text`
  font-size: 1.2rem;
  color: #1E1E1E;
  margin: 0 0 0.5rem 0;
  text-align: left;
`;
const SearchBar = styled.TextInput`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: #1E1E1E;
  width: 100%;
  cursor: auto;
  padding: 2rem;
  height: 2rem;
`;
const StyledSearchButton = styled.TouchableOpacity`
  height: 2rem;
  padding: 1.5rem;
  margin: 1rem 0;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  font-weight: bold;
  background: #25897D;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
const StyledButton = styled.TouchableOpacity`
  height: 2rem;
  width: 45%;
  padding: 1.5rem;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  background: #25897D;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
const ButtonText = styled.Text`
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  text-align: left;
`;

const App = () => {
  // State for shows
  const [shows, setShows] = useState([])
  // State for filtering shows on type
  const [filterMovieShows, setFilterMovieShows] = useState('')
  // State for search
  const [searchInput, setSearchInput] = useState("");
  //Loading state to show loading mean while API is fetched
  const [loading, setLoading] = useState(true)

  // Just started on in
  const handleSearch = () => {
    setSearchInput(searchInput)
    console.log('search for:', searchInput)
    setSearchInput('')
  }

  // Not working now - do a new fetch?
  const handleTypeMovie = () => {
    setFilterMovieShows('&&type=movie')
    console.log(filterMovieShows)
  }

  //SCROLL
  const scroll = React.createRef();

  // FETCH ALL NETFLIXDATA
  useEffect(() => {
    setLoading(true)
    fetch(`https://nyblad-express-api.herokuapp.com/shows?limit=10${filterMovieShows}`)
      .then(res => res.json())
      .then(json => setShows(json))
    setLoading(false)
  }, [])

  return (
    <Container ref={scroll}>
      <StatusBar hidden />
      <TextHeading>MY NETFLIX API</TextHeading>
      <StyledView>

        <SearchBar
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          // onClearText={handleSearch}
          onFocus={e => setSearchInput('')}
          clearTextOnFocus
          placeholder='Type Here...'
        />

        <StyledSearchButton onPress={handleSearch}>
          <ButtonText>Search</ButtonText>
        </StyledSearchButton>
      </StyledView>

      <StyledRowView>
        <StyledButton onPress={handleTypeMovie}>
          <ButtonText>TV-Shows</ButtonText>
        </StyledButton>

        <StyledButton onPress={handleTypeMovie}>
          <ButtonText>Movies</ButtonText>
        </StyledButton>
      </StyledRowView>

      <StyledView>
        {loading && <Text>Loading shows...</Text>}

        {!loading &&
          <StyledView>
            <Text>Shows:</Text>
            {shows.map(item => (
              <StyledView key={item.show_id}>
                <Text>Title: {item.title}</Text>
                <Text>Type: {item.type}</Text>
              </StyledView>
            ))}
          </StyledView>
        }
      </StyledView>

    </Container>
  )
}

export default App;
