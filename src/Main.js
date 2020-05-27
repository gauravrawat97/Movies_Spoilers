import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import _ from "lodash";

class Main extends Component {
  state = {
    data: [],
    isLoading: true
  };

  search(val) {
    console.log(val);
    console.log(`https://moviesspoilers.herokuapp.com/movies/${val}`);

    fetch(`https://moviesspoilers.herokuapp.com/movies/${val}`)
      .then(response => response.json())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  onChange = event => {
    /* signal to React not to nullify the event object */
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        this.search(searchString);
      }, 1000);
    }
    this.debouncedFn();
  };

  render() {
    const { isLoading, data, error } = this.state;

    return (
      <div className="container center" style={{ marginTop: "12rem" }}>
        <h3>
          <span style={{ fontWeight: "bold", fontSize: "10rem" }}>S</span>POIL
          ME
        </h3>
        <div style={{ padding: "10%" }}>
          <input onChange={this.onChange} placeholder="eg: Extraction" />
        </div>
        <div>{!isLoading ? <Post data={data} /> : ""}</div>

        <div className="container center" style={{ padding: "2rem" }}>
          Movies Spoiler By
          <a className="grey-text " href="https://gauravrawat97.github.io/">
            {" "}
            Gaurav Rawat
          </a>
        </div>
      </div>
    );
  }
}

function Post(prop) {
  const d = prop.data.map((data, id) => (
    <div className="col s12 m6 l4" key={id}>
      <div className="card large z-depth-5">
        <div className="card-image">
          <img className="responsive-img" src={data.Poster} alt="Movie" />
        </div>
        <div className="card-content">
          <div className="card-title" style={{ fontSize: "1rem" }}>
            {data.Name}
          </div>

          <Link
            to={"/spoil/" + data.Name}
            className="btn btn-primary center-align"
          >
            Spoiler
          </Link>
        </div>
      </div>
    </div>
  ));
  return <div className="row">{d}</div>;
}

export default Main;
