var SearchContainer = React.createClass({
  handleKeyPressed: function(event) {
    if(event.key == 'Enter') {
      this.sendQuery();
    }
  },
  inputChange: function(event) {
    this.state.hasChanged = true;
    this.setState({ value: event.target.value });
  },
  sendQuery: function() {
    console.log('send query');
    $.ajax({
      url: '/search/amazon/?query=' + this.state.value,
      method: 'get',
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        console.log('success', data);
        this.setState({ listItems: data });
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      value: '',
      hasChanged: false,
      listItems: []
    }
  },
  render: function() {
    var searchButton = this.state.hasChanged ? <button onClick={ this.sendQuery } >Search</button> : '';
    var listItems = this.state.listItems.map(function(item) {
      return <SearchResultItem data={ item } key={ item.id } />;
    })
    return (
      <div className="Search">
        <h4>Search amazon books:</h4>
        <input value={ this.state.value } onChange={ this.inputChange } onKeyDown={ this.handleKeyPressed } />
        { searchButton }
        <hr />
        <ul>
          { listItems }
        </ul>
      </div>
    );
  }
});
