var TagSearchController = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      hasChanged: false,
      tagSuggestions: []
    };
  },

  handleNewTagSuggestions: function(newTagSuggestions) {
    this.setState({
      tagSuggestions: newTagSuggestions
    });
  },

  saveNewTag: function(tagData) {
    this.getFlux().actions.list.updateTags({
      listId: this.props.listId,
      newTag: tagData
    });
  },

  render: function() {
    return (
      <div className="TagSearchController">
        <TagSearch
          onNewSuggestions={ this.handleNewTagSuggestions }
          onAddClicked={ this.saveNewTag }
        />
        <br />
        <TagSuggestions
          tagSuggestions={ this.state.tagSuggestions }
          onAddClicked={ this.saveNewTag }
        />
        <br />
      </div>
    );
  }
});
