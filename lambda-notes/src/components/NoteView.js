import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class NoteView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchNote(id);
    }

    fetchNote = id => {
        axios
            .get(`https://fe-notes.herokuapp.com/note/get/${id}`)
            .then(response => {
                this.setState({ note: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (!this.state.note) {
            return (
                <div className="main-content">
                    <h2>(Loading)</h2>
                </div>
            );
        }
        return(
            <div className="main-content">
                <div className="edit-delete-links">
                    <Link to={`/edit/${this.state.note._id}`}>edit</Link>
                    <span onClick={() => this.props.delNote(this.state.note._id, this.props.history)}>delete</span>
                </div>
                <h2>{this.state.note.title}</h2>
                <p>{this.state.note.textBody}</p>
            </div>
        );
    }
}