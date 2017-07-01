var Tags = React.createClass({
  mixins: [FluxMixin],

  renderTags: function() {
    return (
      <ul className="Tags--list">
        { this.props.tags.map(function(tag) {
          return (
            <Tag
              data={ tag }
              removeClickHandler={ this.handleTagRemoveClicked }
              key={ tag.id }
            />
          );
        }.bind(this))
      }
      </ul>
    );
  },

  handleTagRemoveClicked: function(event, data) {
    this.getFlux().actions.list.removeTag({
      listId: this.props.listId,
      tagToRemove: data.name
    });
  },

  render: function() {
    return (
      <div className="Tags">
        <h2>Tags</h2>
        { this.renderTags() }
        <TagSearchController listId={ this.props.listId } />
      </div>
    );
  }
});
