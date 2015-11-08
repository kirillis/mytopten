var TagSuggestions = React.createClass({
  mixins: [FluxMixin],

  handleTagAddClicked: function(event, data) {
    this.props.onAddClicked(data.name);
  },

  saveNewTag: function(tagData) {
    this.getFlux().actions.list.updateTags({
      listId: this.props.listId,
      newTag: tagData
    });
  },

  render: function() {
    return (
      <ul>
        { this.props.tagSuggestions.map(function (tag) {
            return (
              <Tag
                isSuggestion="true"
                data={ tag }
                addClickHandler={ this.handleTagAddClicked }
                key={ tag.id }
              />
            );
          }.bind(this))
        }
      </ul>
    );
  }
});
