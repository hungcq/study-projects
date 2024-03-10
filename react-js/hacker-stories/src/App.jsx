import React, {useState} from "react";
import axios from "axios";
import './App.css'
import { sortBy } from 'lodash';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(item => item.objectID !== action.payload.objectID)
      }
    default:
      throw new Error();
  }
}

const getSumComments = (stories) => {
  console.log('C');
  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  );
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  console.log('B:App');
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {data: [], isLoading: false, isError: false}
  );
  const handleRemoveStory = React.useCallback((item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);
  const [searchTerm, setSearchTerm] = useStorageState('searchTerm', '');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(searchTerm)

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(searchTerm)
  }

  const fetchData = React.useCallback(async () => {
    dispatchStories({type: 'STORIES_FETCH_INIT'});
    try {
      const res = await axios.get(`${API_ENDPOINT}${submittedSearchTerm}`)
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: res.data.hits,
      });
    } catch (e) {
      console.error(e)
      dispatchStories({type: 'STORIES_FETCH_FAILURE'})
    }
  }, [submittedSearchTerm])

  React.useEffect(() => {
    console.log('fetching')
    fetchData()
  }, [fetchData])

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const sumComments = React.useMemo(
    () => getSumComments(stories),
    [stories]
  );

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories with {sumComments} comments.</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveStory={handleRemoveStory}/>
      )}
    </div>
  );
};

const SearchForm = ({
                      searchTerm,
                      onSearchInput,
                      onSearchSubmit,
                    }) => (
  <form onSubmit={onSearchSubmit} className="search-form">
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button type="submit" disabled={!searchTerm} className="button button_large">
      Submit
    </button>
  </form>
);

const InputWithLabel = ({
                          id,
                          value,
                          type = 'text',
                          onInputChange,
                          children,
                        }) => (
  <>
    <label htmlFor={id} className="label">{children}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
      className="input"
    />
  </>
);

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse(),
};

const List = React.memo(({list, ...props}) => {
  const [sort, setSort] = React.useState('NONE');
  const handleSort = (sortKey) => {
    setSort(sortKey);
  };
  console.log('B:List')
  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);
  return (
    <ul>
      <li style={{display: 'flex'}}>
        <span style={{width: '40%'}}>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span style={{width: '30%'}}>
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span style={{width: '10%'}}>
          <button type="button" onClick={() => handleSort('COMMENT')}>
            Comments
          </button>
        </span>
        <span style={{width: '10%'}}>
          <button type="button" onClick={() => handleSort('POINT')}>
            Points
          </button>
        </span>
        <span style={{width: '10%'}}>
          Actions
        </span>
      </li>
      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} {...props} />
      ))}
    </ul>
  )
})

const Item = ({item, onRemoveStory}) => (
  <li className="item">
    <span style={{width: '40%'}}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{width: '30%'}}>{item.author}</span>
    <span style={{width: '10%'}}>{item.num_comments}</span>
    <span style={{width: '10%'}}>{item.points}</span>
    <span style={{width: '10%'}}/>
    <button
      className="button button_small" type="button"
      onClick={() => onRemoveStory(item)}>Delete
    </button>
  </li>
);

// custom hook
const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) == null ? initialState : localStorage.getItem(key)
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

export default App;
export {storiesReducer, SearchForm, InputWithLabel, List, Item};