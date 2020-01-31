import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

// STYLED COMP
const Container = styled.ScrollView`
  flex-grow: 1;
  background: #f1f1f1;
  margin: 0;
`;
const StyledView = styled.View`
  margin: 5px 0;
  padding: 0 10px;
`;
const StyledRowView = styled.View`
  margin: 10px 0;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TextHeading = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1E1E1E;
  margin: 20px;  
  padding: 30px 0 20px 0;
  text-align: center;
  background: transparent;
  border: 7px solid #1E1E1E;
`;
const Text = styled.Text`
  font-size: 16px;
  color: #1E1E1E;
  margin: 0 0 5px 0;
  text-align: left;
`;
const TextBig = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1E1E1E;
  margin: 0 0 5px 0;
  text-align: left;
`;
const SearchBar = styled.TextInput`
  background-color: #fff;
  color: #1E1E1E;
  width: 80%;
  padding: 10px;
  height: 45px;
`;
const StyledSearchButton = styled.TouchableOpacity`
  height: 45px;
  width: 20%;
  padding: 10px;
  margin: 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  font-weight: bold;
  background: #25897D;
`;
const StyledButton = styled.TouchableOpacity`
  height: 40px;
  width: 30%;
  padding: 10px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  background: #25897D;
`;
const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-align: left;
`;

const App = () => {
  // State for shows
  const [shows, setShows] = useState([])
  // State for filtering shows on type
  const [filterShows, setFilterShows] = useState('')
  // State for search
  const [searchInput, setSearchInput] = useState("");
  //Loading state to show loading mean while API is fetched
  const [loading, setLoading] = useState(true)

  // Just started on it
  const handleSearch = () => {
    setSearchInput(searchInput)
    console.log('search for:', searchInput)
  }

  // Handle filter shows
  const handleTypeMovie = () => {
    setFilterShows('&&type=movie')
  }
  const handleTypeTvShow = () => {
    setFilterShows('&&type=tv-show')
  }
  const handleAll = () => {
    setFilterShows('')
  }

  //SCROLL
  const scroll = React.createRef();

  // FETCH ALL NETFLIXDATA
  useEffect(() => {
    setLoading(true)
    fetch(`https://nyblad-express-api.herokuapp.com/shows?limit=20${filterShows}`)
      .then(res => res.json())
      .then(json => setShows(json))
    setLoading(false)
  }, [filterShows])

  return (
    <Container ref={scroll}>
      <StatusBar hidden />
      <TextHeading>RECENT ADDED SHOWS ON NETFLIX</TextHeading>

      <StyledRowView>
        <SearchBar
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          // onClearText={handleSearch}
          onFocus={e => setSearchInput('')}
          clearTextOnFocus
          placeholder='Type Here...'
        />

        <StyledSearchButton onPress={handleSearch}>
          <ButtonText>?</ButtonText>
        </StyledSearchButton>
      </StyledRowView>

      <StyledRowView>
        <StyledButton onPress={handleTypeTvShow}>
          <ButtonText>TV</ButtonText>
        </StyledButton>

        <StyledButton onPress={handleTypeMovie}>
          <ButtonText>Movie</ButtonText>
        </StyledButton>

        <StyledButton onPress={handleAll}>
          <ButtonText>All</ButtonText>
        </StyledButton>
      </StyledRowView>

      <StyledView>
        {loading && <Text>Loading shows...</Text>}

        {!loading &&
          <>
            {shows.map(item => (
              <StyledView key={item.show_id}>
                <TextBig>{item.title}</TextBig>
                <Text>{item.type} released {item.release_year}</Text>
              </StyledView>
            ))}
          </>
        }
      </StyledView>

    </Container>
  )
}

export default App;
