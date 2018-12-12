import React, { Component } from "react";
import PropTypes from "prop-types";

//semantic-ui Components
import { Container } from "semantic-ui-react";

//Components
import MoreButton from "components/Buttons/More";
import InlineLoader from "components/Loader/Inline";
import Notice from "components/Error/Notice";
import FullLoader from "components/Loader/Full";
import IssuesTable from "components/Issues/Table";
/**
 *
 * Fetch and display list of issues
 * @class App
 * @extends {Component}
 */
class App extends Component {
  state = {
    page: 1,
    loading: true,
    data: []
  };
  /**
   * fetch json from api.github.com with issues of facebook
   * @param number page
   */
  fetch(page) {
    this.setState({
      ...this.state,
      page: page,
      loading: true
    });
    fetch(
      "https://api.github.com/repos/" +
        this.props.repository +
        "/react/issues?page=" +
        page
    )
      .then(response => response.json())
      .then(data => {
        if (data.message) throw new Error(data.message);
        this.setState({
          ...this.state,
          loading: false,
          //Filter fields for saving space in state
          data: this.state.data.concat(
            data.map(el => ({
              number: el.number,
              title: el.title,
              updated_at: el.updated_at.split("T")[0],
              created_at: el.created_at.split("T")[0],
              // we need just label names
              labels: el.labels.map(label => label.name),
              state: el.state
            }))
          )
        });
      })
      .catch(error =>
        this.setState({
          ...this.state,
          error: error + "",
          loading: false
        })
      );
  }
  componentDidMount() {
    //Fetch first page
    this.fetch(1);
  }
  render() {
    if (this.state.loading && this.state.page === 1) return <FullLoader />;
    if (this.state.error) return <Notice text={this.state.error} />;
    return (
      <>
        <IssuesTable list={this.state.data} />
        <Container textAlign="center">
          {//on loading hide more button
          this.state.loading ? (
            <InlineLoader />
          ) : (
            <MoreButton onClick={() => this.fetch(this.state.page + 1)} />
          )}
        </Container>
      </>
    );
  }
}
App.propTypes = {
  repository: PropTypes.string.isRequired
};
export default App;
