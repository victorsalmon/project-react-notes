var Note = React.createClass ({
  getInitialState() {
    return {editing: false}
  },
  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px')
    }
  },
  edit() {
    this.setState({editing: true})
  },
  randomBetween (x, y, s){
    return (x + Math.ceil(Math.random() * (y-x))) + s
  },
  remove(){
    this.props.onRemove (this.props.id);
  },
  renderForm(note) {
    return (
      <div  className="note"
            style={this.style}>
        <textarea ref="newText">{this.props.children}</textarea>
        <button className="buttonBox" onClick={this.save}>Save</button>
      </div>
    )
  },
  renderDisplay() {
    return (
      <div  className="note"
            style={this.style}>
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



var Box = React.createClass({
  
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
  add(text){
    console.log (this.state.notes.length);
    var notes = [
      ...this.state.notes,
      {
        id: this.nextId(),
        note: text
      }
    ]
    this.setState({notes})
  },
  getInitialState() {
    return {
      notes: [
        {id:0, note:"E-mail Susan about project"},
        {id:1, note:"Create new notes"},
        {id:2, note:"Delete sample notes"},
        {id:3, note:"Polish this app ;)"}
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
  nextId(){
    return this.state.notes.length;
  },
  remove (id) {
    var notes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes});
  },
  render() {
    return (
      <div className='board'>
        {this.state.notes.map(this.eachNote)}
        <div class="buttonBox">
          <button onClick={() => this.add()}>+</button>
        </div>
      </div>
    )
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
  }
})

ReactDOM.render(<Board></Board>,  document.getElementById('react-container'));