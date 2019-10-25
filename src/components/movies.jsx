import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import _ from "lodash";
import { Paginate } from "./common/paginate";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchInput from "./common/searchInput";
import { toast } from "react-toastify";
import { getCurrentUser } from "../services/authService";

class Movies extends Component {
  state = {
    movies: [],
    geners: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    const { data } = await getGenres();

    const geners = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      movies,
      geners,
      selectedGenre: geners[0]
    });
  }
  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = async movie => {
    toast("Deleting...");
    const originalMovies = [...this.state.movies];
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    let currentPage = this.state.currentPage;
    const pageSize = this.state.pageSize;
    const itemsCount = movies.length;
    const totalPage = Math.ceil(itemsCount / pageSize);

    if (currentPage > totalPage) {
      currentPage = totalPage;
    }

    this.setState({
      movies,
      pageSize: 4,
      currentPage
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("The movie has already been deleted!");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",

      currentPage: 1,
      pageSize: 4
    });
  };
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies,
      sortColumn,

      pageSize,
      currentPage,
      selectedGenre,
      searchQuery
    } = this.state;

    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter(movie => movie.genre._id === selectedGenre._id);
    }

    const sorted = sortColumn
      ? _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
      : filtered;

    const allMovies = Paginate(sorted, currentPage, pageSize);

    return { allMovies, totalCount: filtered.length };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      sortColumn,
      geners,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery
    } = this.state;
    const user = getCurrentUser();
    if (count === 0) return <p>There are no movies in the database.</p>;
    const { allMovies, totalCount } = this.getPageData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={geners}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-10">
            {user && (
              <p>
                <Link
                  to="/movies/new"
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                >
                  New Movie
                </Link>
              </p>
            )}
            <p>Showing {totalCount} movies in the database.</p>

            <SearchInput value={searchQuery} onChange={this.handleSearch} />

            <MoviesTable
              movies={allMovies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onLiked={this.handleLiked}
              onDelete={this.handleDelete}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
