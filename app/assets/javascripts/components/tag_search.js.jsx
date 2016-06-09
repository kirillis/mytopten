var TagSearch = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      hasChanged: false,
      tagSuggestions: []
    };
  },

  componentDidMount: function() {
    var _this = this;
    var keyups = Rx.Observable.fromEvent(this.refs.searchTagsInput, 'keyup')
      .pluck('target', 'value')
      .filter(function (text) {
        return text.length > 2;
      }
    )
    .debounce(300)
    .distinctUntilChanged()
    .subscribe(
      function (query) {
        _this.searchForTags(query);
      }
    );

    Materialize.updateTextFields();
  },

  searchForTags: function(query) {
    $.ajax({
      url: '/tags/search/' + query,
      method: 'get',
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Tag search error:', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        this.props.onNewSuggestions(data);
      }.bind(this)
    });
  },

  onChangeHandler: function(event) {
    this.setState({
      hasChanged: true
    });
  },

  addNewButtonHandler: function() {
    var newTagName = this.refs.searchTagsInput.getDOMNode().value;
    this.props.onAddClicked(newTagName);
    this.setState({
      tagSuggestions: [],
      hasChanged: false
    });

    this.refs.searchTagsInput.getDOMNode().value = '';
  },

  getAddNewButton: function() {
    if(this.state.hasChanged) {
      return <a className="waves-effect waves-light btn" onClick={ this.saveData }><i className="material-icons left">cloud</i>Add new tag</a>
    } else {
      return <a className="waves-effect waves-light btn disabled"><i className="material-icons left">cloud</i>Add new tag</a>
    }
  },

  render: function() {
    return (
      <div className="TagSearch row">

        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="tag">Add new tag...</label>
            <input
              id="tag"
              type="text"
              name="tags"
              className="validate"
              required="required"
              onChange={ this.onChangeHandler }
              ref="searchTagsInput"
            />
          </div>
        </div>

        { this.getAddNewButton() }
      </div>
    );
  }
});
