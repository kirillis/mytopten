var Tags = React.createClass({
  mixins: [FluxMixin],

  renderTags: function() {
    return (
      <ul>
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
        { this.renderTags() }
        <br />
        <TagSearchController listId={ this.props.listId } />
      </div>
    );
  }
});
