import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

class Spoil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: null
    };
    this.url =
      "https://moviesspoilers.herokuapp.com/spoil/" + props.match.params.id;
  }
  fetchData() {
    console.log(this.url);
    fetch(this.url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { isLoading, data, error } = this.state;
    //const val = this.state.data["Genre"].map((data, id) => <li>{data}</li>);
    //console.log(this.state.data);
    if (!isLoading) {
      return (
        <React.Fragment>
          <div className="container z-depth-5" style={{ padding: "1rem" }}>
            <div className="row">
              <Link className="right" to="/">
                <i style={{ fontSize: "2rem" }} className="material-icons">
                  keyboard_backspace
                </i>
              </Link>
            </div>
            <div className="row">
              <Name name={data} />
            </div>
            <div className="row">
              <div style={{ padding: "5% 0" }}>
                <Poster pic={data} />

                <Story story={data[0].Spoiler} />
              </div>
            </div>
          </div>
          <div className="container center" style={{ padding: "2rem" }}>
            Movies Spoiler By
            <a className="grey-text " href="https://gauravrawat97.github.io/">
              {" "}
              Gaurav Rawat
            </a>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div
          className="progress"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%"
          }}
        >
          <div className="indeterminate" />
        </div>
      );
    }
  }
}

function Name(prop) {
  const d = prop.name.map((data, id) => (
    <h2 style={{ fontSize: "3rem" }} className="center" key={id}>
      {data.Name}
    </h2>
  ));
  return <div className="col s12">{d}</div>;
}

function Poster(prop) {
  const d = prop.pic.map((data, id) => (
    <img
      key={id}
      className="responsive-img"
      style={{ width: "100%" }}
      src={data.Poster}
      alt="Poster"
    />
  ));
  return <div className="col s4">{d}</div>;
}

function Story(prop) {
  const d = prop.story.map((data, id) => <p key={id}>{data}</p>);
  return <div>{d}</div>;
}

export default Spoil;
