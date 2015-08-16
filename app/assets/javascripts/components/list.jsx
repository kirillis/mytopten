var List = React.createClass({
  componentWillMount:  function() {
    this.fetchListItems();
  },
  fetchListItems: function() {
    var _this = this;
    $.getJSON(
      this.props.listPath,
      function(data) {
        if(_this.isMounted()) {
          _this.setState({ 
            listItems: data.list_items,
            title: data.title
          });
        }
      }
    )
  },
  getInitialState: function() {
    return { 
      listItems: [],
      list: {},
      title: ''
    };
  },
  render: function() {
    var _this = this;
    var listItems = this.state.listItems.map(function(item) {
      return <ListItem data={ item } key={ item.id } />;
    })
    return (
      <div className="List">
        <h4>{ this.state.title }</h4>
        <ol>
          { listItems }
        </ol>
      </div>
    );
  }
});
