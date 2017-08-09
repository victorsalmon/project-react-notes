var StickyNote = React.createClass ({
  getInitialState() {
    return {editing: false}
  },
  edit() {
    alert ("Editing Note");
    this.setState({editing: true})
  },
  remove(id) {
    var notes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes});
  },
  renderForm() {
    return (
      <div className="note">
        <textarea ref="newText"></textarea>
        <button className="buttonBox" onClick={this.save}>Save</button>
      </div>
    )
  },
  renderDisplay() {
    return (
      <div className="note">
        <p>{this.props.children}</p>
        <div className="buttonBox">
          <button onClick={this.edit}>Edit</button>
          <button onClick={this.remove}>Remove</button>
        </div>
      </div>
    )
  },
  render() {
    return (this.state.editing) ? this.renderForm()
                                : this.renderDisplay();
  },
  save() {
    var val = this.ref.val;
    alert (val);
    this.setState({editing: false})
  }
})

var Board = React.createClass({
  propTypes: {
    count: function (props, propName) {
      if (typeof props[propName] !== "number") {
        return new Error("The count must be a number!")
      }

      if (props[propName] > 100) {
        return new Error("Creating " + props[propName] + " notes is too many!")
      }
    }
  },
  getInitialState() {
    return {
      notes: [
        {id:0, note:"Call Bob"},
        {id:1, note:"E-mail Sara"},
        {id:2, note:"Eat lunch"},
        {id:3, note:"Finish proposal"}
      ]
    }
  },
  eachNote(note) {
    return (<Note key={note.id}
                  id={note.id}
                  onChange={this.update}
                  onRemove={this.remove}>
                  {note.note}
            </Note>)
  },
  update (newText, id) {
    var notes = this.state.notes.map(
      note => (note.id !== id) ?
        note :
          {
            ...note,
            note: newText
          }
    )
  },
  render() {
    return (
      <div className='board'>
      {this.state.notes.map((note, i) => {
        return <StickyNote key={i}>{note}</StickyNote>
      })}
      </div>
    )
  }
})

ReactDOM.render(<Board></Board>,  document.getElementById('react-container'));