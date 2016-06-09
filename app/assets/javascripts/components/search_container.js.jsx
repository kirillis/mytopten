var SearchContainer = React.createClass({
  sendQuery: function() {
    $.ajax({
      url: '/search/amazon/?query=' + this.state.searchQuery,
      method: 'get',
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Search error:', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        this.setState({ listItems: data });
      }.bind(this)
    });
  },

  handleUserInput: function(searchQuery) {
    this.state.hasChanged = true;
    this.setState({ searchQuery: searchQuery });
  },

  getInitialState: function() {
    return {
      searchQuery: '',
      hasChanged: false,
      listItems: []
    };
  },

  render: function() {
    var searchButton = this.state.hasChanged ? <button onClick={ this.sendQuery }>Search</button> : '';
    return (
      <div className="Search">
        <h4>Search amazon books:</h4>
        <SearchBox
          searchQuery={ this.state.searchQuery }
          onUserInput={ this.handleUserInput }
          onSendQuery={ this.sendQuery }
        />

        { searchButton }
        <hr />
        <SearchResultsList listItems={ this.state.listItems } />
      </div>
    );
  }
});

