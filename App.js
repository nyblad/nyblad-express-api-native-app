import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StatusBar, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

// STYLED COMP
const Container = styled.ScrollView`
  flex-grow: 1;
  background: #0C0C0C;
  margin: 0;
`;
const StyledView = styled.View`
  margin: 5px 0;
  padding: 0 10px;
`;
const StyledCenterView = styled.View`
  margin: 0 auto;
  padding: 10px 10px;
`;
const StyledRowView = styled.View`
  margin: 10px 0;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TextHeading = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #f1f1f1;
  margin: 20px 10px;  
  padding: 20px 0;
  text-align: center;
`;
const Text = styled.Text`
  font-size: 16px;
  color: #f1f1f1;
  margin: 0 0 5px 0;
  text-align: left;
`;
const TextSmall = styled.Text`
  font-size: 12px;
  color: #f1f1f1;
  margin: 0 0 5px 0;
  text-align: left;
`;
const TextBig = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #f1f1f1;
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
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  background: #D8863E;
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
  background: #6B0000;
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
  // States for pagination
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState()
  // State for filtering shows on type
  const [filterShows, setFilterShows] = useState('?')
  // State for search
  const [searchInput, setSearchInput] = useState('');
  //Loading state to show loading mean while API is fetched
  const [loading, setLoading] = useState(true)

  // Scroll
  const scroll = React.createRef();

  // Vibe
  const vibeDuration = 200;

  // Handle search
  const handleSearch = () => {
    setPage(0)
    setFilterShows(`?title=${searchInput}&`)
    Vibration.vibrate(vibeDuration)
  }

  // Handle filters
  const handleTypeMovie = () => {
    setPage(0)
    setFilterShows('/movies?')
  }
  const handleTypeTvShow = () => {
    setPage(0)
    setFilterShows('/tv-shows?')
  }
  const handleAll = () => {
    setPage(0)
    setFilterShows('?')
  }

  // Fetch all data
  useEffect(() => {
    setLoading(true)
    fetch(`https://nyblad-express-api.herokuapp.com/shows${filterShows}page=${page}`)
      .then(res => res.json())
      .then(json => {
        setShows(json.filteredShows)
        setTotalPages(json.filteredPages)
        setLoading(false)
      })
  }, [page, filterShows]) //Putting second argument to fetch new list on changes

  return (
    <Container ref={scroll}>
      <StatusBar hidden />
      <TextHeading>SHOWS ON NETFLIX</TextHeading>

      <StyledRowView>
        <SearchBar
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          onFocus={() => setSearchInput('')}
          clearTextOnFocus
          placeholder='Search for a title..'
        />

        <StyledSearchButton onPress={handleSearch}>
          <Icon name="search" size={20} color="white" />
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
        {loading &&
          <StyledCenterView>
            <Text>Loading shows...</Text>
          </StyledCenterView>
        }

        {!loading &&
          <>
            {shows.map(item => (
              <StyledView key={item.show_id}>
                <TextBig>{item.title}</TextBig>
                <Text>
                  {item.type} released {item.release_year} ({item.duration})</Text>
              </StyledView>
            ))}
          </>
        }

        {!loading &&
          <StyledCenterView>
            <TextSmall>Showing page {page + 1} of {totalPages + 1}</TextSmall>
          </StyledCenterView>
        }

        <StyledRowView>
          {page > 0 &&
            <StyledButton onPress={() => setPage(page - 1)}>
              <ButtonText>Prev</ButtonText>
            </StyledButton>
          }

          {page < totalPages &&
            <StyledButton onPress={() => setPage(page + 1)}>
              <ButtonText>Next</ButtonText>
            </StyledButton>
          }
        </StyledRowView>

      </StyledView>

    </Container>
  )
}

export default App;
