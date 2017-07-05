  var SearchResultItem = React.createClass({
  mixins: [FluxMixin],

  handleAddItemClick: function() {
    var normalizedData = App.normalizeItemData(this.props.data, 'AMAZON');
    this.getFlux().actions.listItem.add(normalizedData);
  },

  render: function() {
    return (
      <li className="SearchResult-item u-mb-2">
        <div className="Grid">

          <div className="Grid-cell 1-of-3">
            <img src={ this.props.data.thumbnail_url ? this.props.data.thumbnail_url : '' } />
          </div>
  
          <div className="Grid-cell 2-of-3">
            <p><strong>{ this.props.data.title }</strong></p>
            <p className="u-t-muted">{ this.props.data.author }</p>
            <button onClick={ this.handleAddItemClick } className="Button">Add to list</button>
          </div>
        </div>
      </li>
    );
  }
});
