import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchBtn from "../components/SearchBtn";
import { ResultList, ResultItem } from "../components/Results";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    results: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handleFormSubmit()");
    /*
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
    */

  };

  saveBook = (book) => {

    console.log(
      "---- SAVING TO LIST -------------" + "\n" +
      book.title  + "\n" +
      book.author  + "\n" +
      book.title  + "\n" +
      book.description  + "\n" +
      book.link  + "\n" +
      book.image  + "\n" +
      "---------------------------------");

    /*API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));*/
  };

  doGoogleBooksSearch = event =>
  {
    event.preventDefault();
    var searchText = this.state.title.trim();
    API.googleBooksSearch(searchText).then(res => 
      {
        console.log(res.data.items);
        this.setState({ books: res.data, title: "", author: "", synopsis: "" });

        var resDataItems = res.data.items;
        var searchResults = [];

        if(resDataItems.length > 0)
        {
          for(var i = 0; i < resDataItems.length; i++)
          {
            var tmpAuthor = "";
            var tmpImage = "";
           
            if (resDataItems[i].volumeInfo.authors)
            {
              tmpAuthor = resDataItems[i].volumeInfo.authors[0];
            }
            else
            {
              tmpAuthor = "UNKNOWN";
            }


            if (resDataItems[i].volumeInfo.imageLinks)
            {
              tmpImage = resDataItems[i].volumeInfo.imageLinks.thumbnail;
            }
            else
            {
              tmpImage = "no_thumbnail.png";
              //tmpImage = "no_thumbnail.png";
            }

            var tmpBook = {
              author: tmpAuthor,
              title: resDataItems[i].volumeInfo.title,
              description: resDataItems[i].volumeInfo.description,
              link: resDataItems[i].volumeInfo.infoLink,
              image: tmpImage
            };

            searchResults.push(tmpBook);

          }
        }
        else
        {
          var noResult = {
            author: "",
            title: "No results found.",
            description: "",
            link: "",
            image: ""
          };

          searchResults.push(noResult);

        }

        this.setState({ 
          books: res.data, 
          title: "", 
          author: "", 
          synopsis: "",
          results: searchResults
         });

      });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Find Books via Google</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              {/* 
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              */}
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.doGoogleBooksSearch}
              >
                Search Google Books
              </FormBtn>
            </form>
            <div>{/*
              <ResultList>
                {this.state.results.map(result => (
                  <ResultItem key={result.link} 
                    title={result.title}
                    author={result.author}
                    description={result.description}
                    link={result.link}
                    image={result.image}
                  />
                ))}
              </ResultList>
                */}
            </div>
          </Col>
          <Col size="md-6 sm-12">
          <ResultList>
                {this.state.results.map(result => (
                  <ResultItem key={result.link} 
                    title={result.title}
                    author={result.author}
                    description={result.description}
                    link={result.link}
                    image={result.image}
                  >
                      <SaveBtn onClick={() => this.saveBook(result)} />
                  </ResultItem>
                ))}
          </ResultList>



            {/*
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
