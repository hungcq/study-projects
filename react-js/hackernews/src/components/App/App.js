import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import Search from "../Search/Search";
import Table from "../Table/Table";
import Button from "../Button/Button";
import 'font-awesome/css/font-awesome.min.css';
import {DEFAULT_QUERY, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP} from "../../constants";

const Loading = () =>
    <div><i className="fa fa-spinner"/></div>;

const withLoading = (Component) => ({isLoading, ...rest}) =>
    isLoading
        ? <Loading/>
        : <Component {...rest} />;

const withErrorNoti = (Component) => ({error, ...rest}) =>
    error
        ? <div className="interactions">
            <p>Something went wrong.</p>
        </div>
        : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

const TableWithErrorNoti = withErrorNoti(Table);

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const {searchKey, results} = prevState;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    return {
        results: {...results, [searchKey]: {hits: updatedHits, page}},
        isLoading: false
    };
};

class App extends Component {
    _isMounted = false;
    state = {
        results: null,
        searchKey: '',
        searchTerm: DEFAULT_QUERY,
        error: null,
        isLoading: false,
    };

    needsToSearchTopStories = (searchTerm) => {
        return !this.state.results[searchTerm];
    };

    setSearchTopStories = (result) => {
        const {hits, page} = result;
        this.setState(updateSearchTopStoriesState(hits, page));
    };

    onSearchChange = (event) => {
        this.setState({searchTerm: event.target.value});
    };

    onDismiss = (id) => {
        const isNotId = item => item.objectID !== id;
        this.setState(prevState => {
            const {searchKey, results} = prevState;
            const {hits, page} = results[searchKey];
            const updatedHits = hits.filter(isNotId);
            return {results: {...results, [searchKey]: {hits: updatedHits, page}}}
        });
    };

    componentDidMount() {
        this._isMounted = true;
        this.setState(prevState => {
            const {searchTerm} = prevState;
            this.fetchSearchTopStories(searchTerm);
            return {searchKey: searchTerm}
        });
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onSearchSubmit = (event) => {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    };

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({isLoading: true});
        axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this._isMounted && this.setSearchTopStories(result.data))
            .catch(error => this._isMounted && this.setState({error}));
    }

    render() {
        const {searchTerm, results, searchKey, error, isLoading} = this.state;
        const page = results && results[searchKey] ? results[searchKey].page : 0;
        const list = results && results[searchKey] ? results[searchKey].hits : [];
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                <TableWithErrorNoti
                    list={list}
                    onDismiss={this.onDismiss}
                    error={error}
                />
                <div className="interactions">
                    <ButtonWithLoading
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
                        isLoading={isLoading}>
                        More
                    </ButtonWithLoading>
                </div>
            </div>
        );
    }
}

export default App;