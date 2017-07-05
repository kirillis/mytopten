var SearchResultsList = React.createClass({
  render: function() {
    var listItems = this.props.listItems.map(function(item) {
      return <SearchResultItem data={ item } key={ App.makeId() } />;
    });
    return (
      <div>
        { listItems }
      </div>
    );
  }
});