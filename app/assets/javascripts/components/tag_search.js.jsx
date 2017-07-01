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
    var newTagName = this.refs.searchTagsInput.value;
    this.props.onAddClicked(newTagName);
    this.setState({
      tagSuggestions: [],
      hasChanged: false
    });

    this.refs.searchTagsInput.value = '';
  },

  getAddNewButton: function() {
    if(this.state.hasChanged) {
      return <a className="Button Button--withIcon" onClick={ this.addNewButtonHandler }><i className="material-icons left">add</i>Create tag</a>
    } else {
      return <span className="Button Button--withIcon Button--disabled"><i className="material-icons left">add</i>Create tag</span>
    }
  },

  render: function() {
    return (
      <div className="TagSearch Form">

        <label htmlFor="tag">Tag name</label>

        <div className="Grid">
          <div className="Grid-cell 1-of-2--desk">
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
          <div className="Grid-cell 1-of-2--desk">
          { this.getAddNewButton() }
          </div>
        </div>

      </div>
    );
  }
});
