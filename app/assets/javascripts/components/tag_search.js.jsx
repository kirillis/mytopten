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
    var newTagName = this.refs.searchTagsInput.getDOMNode().value;
    this.props.onAddClicked(newTagName);
    this.setState({
      tagSuggestions: [],
      hasChanged: false
    });

    this.refs.searchTagsInput.getDOMNode().value = '';
  },

  render: function() {
    var saveButton = this.state.hasChanged ? <button className="c-button" onClick={ this.addNewButtonHandler }>Add new tag</button> : '';
    return (
      <div className="TagSearch">
        <input
          type="text"
          name="tags"
          ref="searchTagsInput"
          onChange={ this.onChangeHandler }
        />
        { saveButton }
      </div>
    );
  }
});
