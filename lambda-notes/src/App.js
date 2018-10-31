import React, { Component } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";

import './App.css';

import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteView from "./components/NoteView";
import EditForm from "./components/EditForm";
import NewNoteForm from "./components.NewNoteForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(response => this.setState({ notes: response.data }))
      .catch(error => console.log(error));
  }

  finishEdit(note) {
    const id = note._id;
    axios
      .put(`https://fe-notes.herokuapp.com/note/edit/${id}`, note)
      .then(() => {
        axios
          .get("https://fe-notes.herokuapp.com/note/get/all")
          .then(response => this.setState({ notes: response.data }))
          .catch(error => console.log(error));
        }
      )
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <Sidebar />
        <Route exact path="/" render={props => <NoteList {...props} noteList={this.state.notes} />} />
        <Route path="/note/:id" render={props => <NoteView {...props} />} />
        <Route path="/edit/:id" render={props => <EditForm {...props} finishEdit={this.finishEdit} />} />
        <Route path="/add" render={props => <NewNoteForm {...props} finishAdd={this.finishAdd} />} />
      </div>
    );
  }
}

export default App;
