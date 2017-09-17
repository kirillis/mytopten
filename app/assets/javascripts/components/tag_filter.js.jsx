var TagFilter = React.createClass({

    getInitialState: function () {
        return {
            tags: this.props.tags,
            filterValue: '',
            activeTagsArray: App.getQueryArray(location.search)
        };
    },

    handleChange(event) {
        this.setState({ filterValue: event.target.value });
    },

    addFilterHandler(event, data) {
        newSearchUrl = App.addTagToFilter(data.name);
        location.search =newSearchUrl;
    },

    handleActiveTagClick(tag) {
        location.search = App.removeTagFromFilter(tag);
    },

    render: function () {
        var activeTagsList = this.state.activeTagsArray.map(function(tag, index) {
            return (
                <span
                    key={index}
                    className='Tag u-p-05 u-bg-gamma u-color-white u-mb-05 u-mr-05'
                    onClick={this.handleActiveTagClick.bind(this, tag)}>
                    {tag}
                </span>
            )
        }.bind(this));

        var availableTagsList = this.state.tags.map(function (item) {

            if (
                this.state.activeTagsArray.indexOf(item.name) === -1 &&
                item.name.indexOf(this.state.filterValue) !== -1
            ) {
                return <Tag type="filter" key={item.id} data={item} addFilterHandler={ this.addFilterHandler }/>;
            }
            return false;
        }.bind(this));

        return (
            <div>

                <div className="u-bg-beta u-mb-3">
                    <div className="container u-py-2">
                        <div className="Grid">
                            <div className="Grid-cell 2-of-3--desk">

                                <h2>{activeTagsList.length > 0 ? 'Filtering for these tags' : 'Filter all lists by tags.'}</h2>
                                <div>{activeTagsList.length > 0 ? activeTagsList : 'Click a tag to start filtering.'}</div>
                                <p className="u-t-muted">{activeTagsList.length === 0 ? '' : 'Click a tag to remove it from the filter.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="Grid">
                        <div className="Grid-cell 1-of-4">
                            <div className="Form">
                                <label htmlFor="filter">Search all tags for:</label>
                                <input
                                    onChange={this.handleChange}
                                    id="filter"
                                    type="text"
                                    name="filter" />
                            </div>
                        </div>
                    </div>
                    <div>{availableTagsList}</div>
                    <p className="u-t-muted">Click a tag to add it to the filter.</p>
                </div>
            </div>
        );
    }
});
