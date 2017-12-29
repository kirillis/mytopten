var TagSuggestions = React.createClass({
  mixins: [FluxMixin],

  handleTagAddClicked: function(event, data) {
    this.props.onAddClicked(data.name);
  },

  render: function() {
    return (
      <div>
        <p className="u-fw-700">Tag suggestions</p>
        <p className="u-t-muted">{ this.props.tagSuggestions.length ? '' : 'Type in the searchbox above to see existing tags to choose from...' }</p>
        <ul className="Tags--list">
          { this.props.tagSuggestions.map(function (tag) {
              return (
                <Tag
                  type="add"
                  data={ tag }
                  tagClickHandler={ this.handleTagAddClicked }
                  key={ tag.id }
                />
              );
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});
