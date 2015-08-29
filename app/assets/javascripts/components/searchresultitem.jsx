  var SearchResultItem = React.createClass({
  render: function() {
    return (
      <li className="SearchResult-item">
        <div className="Arrange">
          <div className="Arrange-sizeFit">
            <img src={ this.props.data.thumbnail_url } />
          </div>

          <div className="Arrange-sizeFill">
            <h4>{ this.props.data.title }</h4>
            <p>
              { this.props.data.author }
            </p>
          </div>
        </div>
        <button>Add to list</button>
      </li>
    );
  }
});
