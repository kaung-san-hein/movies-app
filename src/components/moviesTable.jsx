import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "liked",
      content: movie => (
        <Like liked={movie.liked} onLiked={() => this.props.onLiked(movie)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    )
  };

  constructor(props) {
    super(props);
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        movies={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
