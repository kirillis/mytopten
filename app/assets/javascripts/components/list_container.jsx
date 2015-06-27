var ListContainer = React.createClass({
  componentWillMount:  function() {
    this.fetchListItems();
  },
  fetchListItems: function() {
    var _this = this;
    $.getJSON(
      this.props.listPath,
      function(data) {
        _this.setState({ 
          listItems: data.list_items,
          list: data
        });
      })
  },
  getInitialState: function() {
    return { 
      listItems: [],
      list: {}
    };
  },
  render: function() {
    return (
      <div className="ListContainer">
        <List 
          title={ this.state.list.title }
          items={ this.state.listItems } />
      </div>
    );
  }
});
