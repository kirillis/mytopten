var SearchResultsList = React.createClass({
  getEmptyCopy: function() {
    if (!this.props.isSearching && this.props.listItems.length === 0) {
      return "Type into the title box on the left to see suggestions."
    } else if(this.props.isSearching) {
      return "Searching amazon for items..."
    } else {
      return "";
    }
  },

  render: function() {
    var listItems = this.props.listItems.map(function(item) {
      return <SearchResultItem data={ item } key={ App.makeId() } />;
    });
    return (
      <div>
        <p className='u-t-muted'>
          { this.getEmptyCopy() }
        </p>
        { listItems }
      </div>
    );
  }
});