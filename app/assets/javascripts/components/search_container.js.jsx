var SearchContainer = React.createClass({
  sendQuery: function() {
    if(this.state.searchQuery === '') { return; };

    this.setState({ isSearching: true });

    $.ajax({
      url: '/api/search/amazon/?query=' + this.state.searchQuery,
      method: 'get',
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Search error:', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        this.setState({
          listItems: data,
          isSearching: false
        });
      }.bind(this),
      always: function() {
        this.setState({ isSearching: false })
      }.bind(this)
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.searchQuery != nextProps.searchQuery) {
      this.setState({
        searchQuery: nextProps.searchQuery,
      })
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevState.searchQuery != this.state.searchQuery) {
      this.sendQuery();
    }
  },

  getInitialState: function() {
    return {
      searchQuery: this.props.searchQuery,
      listItems: [],
      isSearching: false
    };
  },

  render: function() {
    return (
      <div>
        <h2>Amazon suggestions</h2>
        <SearchResultsList listItems={ this.state.listItems } isSearching={ this.state.isSearching } />
      </div>
    );
  }
});

