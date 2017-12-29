  var SearchResultItem = React.createClass({
  mixins: [FluxMixin],

  handleAddItemClick: function() {
    var normalizedData = App.normalizeItemData(this.props.data, 'AMAZON');
    this.getFlux().actions.listItem.add(normalizedData);
  },

  render: function() {
    return (
      <li className="SearchResult-item u-mb-2 u-pb-2">
        <div className="Grid">

          <div className="Grid-cell 1-of-3">
            <img src={this.props.data.thumbnail_url ? this.props.data.thumbnail_url : ''} className="SearchResult-image" />
          </div>
  
          <div className="Grid-cell 2-of-3">
            <p className="u-mb-0"><strong>{ this.props.data.title }</strong></p>
            <p>{ this.props.data.author }</p>
            <button onClick={this.handleAddItemClick} className="Button Button--withIcon">
              <i className="material-icons">add</i>
              Add
            </button>
          </div>
        </div>
      </li>
    );
  }
});
