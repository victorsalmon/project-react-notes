var Note = React.createClass ({
  getInitialState() {
    return {editing: false}
  },
  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 500, 'px'),
      top: this.randomBetween(50, window.innerHeight, 'px')
    }
  },
  componentDidUpdate() {
    if (this.state.editing){
      this.refs.newText.focus()
      this.refs.newText.select()
    }
  },
  edit() {
    this.setState({editing: true})
  },
  randomBetween (x, y, unit){
    return (x + Math.ceil(Math.random() * (y-x))) + unit
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
    return  <ReactDraggable>
              {(this.state.editing) ? this.renderForm()
                                    : this.renderDisplay()} 
            </ReactDraggable>
  },
  save() {
    this.props.onChange(this.refs.newText.value, this.props.id)
    this.setState ({editing: false})
  },
  shouldComponentUpdate(nextProps, nextState){
    return this.props.children !== nextProps.children || this.state !== nextState
  }
})

// var Box = React.createClass({
// })

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
  componentWillMount(){
    if (this.props.count) {
      var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
      fetch (url)
        .then(results => results.json())
        .then(array => array [0])
        .then(text => text.split('. '))
        .then (array => array.forEach(
          sentence => this.add(sentence)))
        .catch(function(err){
          console.log ("Problem connecting to the API: ", err)
          });
    }
  },
  getInitialState() {
    return {
      notes: []
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

ReactDOM.render(<Board count={5}></Board>,  document.getElementById('react-container'));