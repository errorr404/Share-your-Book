import React from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
class SharedBookList extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      currentEmail: "",
      number:""
    };
  }
  handleRequest = id => {
    axios
      .put("/request", {
        id: id,
        email: this.state.currentEmail
      })
      .then(res => {
        if (res.status === 203) {
          alert("Already requested!");
        } else {
          alert("request submitted");
        }
      })
      .catch(err => console.log(err));
  };
  handleLike = id => {
    // e.preventDefault()
    console.log(id);
    axios
      .put("/like", {
        id: id
      })
      .then(res => {
        if (res) {
          axios.get("/getbooks").then(res => {
            var books = res.data;
            // console.log(books)
            this.setState({ books: books });
            // console.log(res.data)
          });
        }
      })
      .catch(err => console.log(err));
  };
  handleDislike = id => {
    // e.preventDefault()
    console.log(id);
    axios
      .put("/dislike", {
        id: id
      })
      .then(res => {
        if (res) {
          axios.get("/getbooks").then(res => {
            var books = res.data;
            // console.log(books)
            this.setState({ books: books });
            // console.log(res.data)
          });
        }
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    axios.get("/getbooks").then(res => {
      var books = res.data;
      // console.log(books)
      this.setState({ books: books });
      // console.log(res.data)
    });
    // var id = localStorage.getItem('token')
    // axios.get('http://localhost:5000/me',{
    //   params: {
    //     id:id
    //   }
    // }).then(res=>{
    // this.setState({currentEmail:res.data.email})
    // }).catch(err=>console.log(err))
    this.setState({ currentEmail: localStorage.getItem("email") });
  }
  render() {
    console.log(this.state);
    // this thing cause a lot of stucking thing
    // var class_name
    // window.addEventListener('resize',()=>{
    //     if(window.innerWidth<991 && window.innerWidth>580) {
    //       class_name="col-lg-6 text-center"
    //       this.setState({number:Math.random()})
    //     }
    //     else {
    //       class_name="col-lg-4 text-center"
    //       this.setState({number:Math.random()})
    //     }
    // }) 
    return (
      <div
        style={{ fontFamily: "'Kaushan Script', cursive", fontSize: "25px",display:"flex",flexWrap:"wrap" }}
      >
        {localStorage.getItem("token") ? (
          <div className="row" style={{ padding: "10px"}}>
            {this.state.books.length === 0 ? (
              <h5>No book in the list, share the book now</h5>
            ) : (
              this.state.books.reverse().map((book, idx) => {
                return (
                  <div className="col-sm-6 col-lg-4 text-center" style={{display:"flex",paddingBottom:"1%"}}>
                    <Card key={idx} style={{flexWrap:"wrap"}}>
                      <Card.Img variant="top" src="book.png" />
                      <Card.Body>
                        <div className="container">
                          <div className="row">
                            <Card.Title className="col-6">
                              Book Name:
                            </Card.Title>
                            <Card.Title className="col-6">
                              {book.book_name}
                            </Card.Title>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <Card.Title className="col-6">
                              Author Name:
                            </Card.Title>
                            <Card.Title className="col-6">
                              {book.author}
                            </Card.Title>
                          </div>
                        </div>

                        <div className="container">
                          <div className="row">
                            <Card.Title className="col-6">Owner:</Card.Title>
                            <Card.Title className="col-6">
                              {book.name} ({book.room_no})
                            </Card.Title>
                          </div>
                        </div>
                        <div>
                          <Card.Title className="col-6">About Book:</Card.Title>
                          <Card.Text className="col-12">
                            {book.desciption}
                          </Card.Text>
                        </div>

                        <div className="container">
                          <div className="row">
                            <div className="col-6">
                              <i
                                className="far fa-thumbs-up"
                                onClick={e => this.handleLike(book._id)}
                              />
                              <Card.Text> {book.like}</Card.Text>
                            </div>
                            <div className="col-6">
                              <i
                                className="far fa-thumbs-down "
                                onClick={e => this.handleDislike(book._id)}
                              />
                              <Card.Text> {book.dislike}</Card.Text>
                            </div>
                          </div>
                        </div>
                        {this.state.currentEmail === book.email ? (
                        <div></div>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={e => this.handleRequest(book._id)}
                          >
                            Request the book
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <h5>Please login first</h5>
        )}
      </div>
    );
  }
}

export default SharedBookList;
