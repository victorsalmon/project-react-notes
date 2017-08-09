var Note = React.createClass ({
  getInitialState() {
    return {editing: false}
  },
  edit() {
    this.setState({editing: true})
  },
  remove(){
    this.props.onRemove (this.props.id);
  },
  renderForm(note) {
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
    this.props.onChange(this.refs.newText.value, this.props.id)
    this.setState ({editing: false})
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
        {id:0, note:"E-mail Susan about project"},
        {id:1, note:"Confirm lunch with Mark"},
        {id:2, note:"Update gym membership"},
        {id:3, note:"Finish UI components"}
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
    );
    this.setState({notes});
  },
  remove (id) {
    var notes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes});
  },
  render() {
    return (
      <div className='board'>
        {this.state.notes.map(this.eachNote)}
      </div>
    )
  }
})

ReactDOM.render(<Board></Board>,  document.getElementById('react-container'));