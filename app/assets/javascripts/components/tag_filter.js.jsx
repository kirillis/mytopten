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
                <span className="Tag-wrapper">
                    <span
                        key={index}
                        className='Tag Tag--withButton u-p-05 u-bg-gamma u-color-white u-mb-05 u-mr-05'
                        onClick={this.handleActiveTagClick.bind(this, tag)}>
                        {tag}
                    </span>
                    <i className="Tag-removeButton material-icons">remove_circle</i>
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
                <div>{activeTagsList}</div>
                <div className="Grid">
                    <div className="Grid-cell 1-of-4">
                        <div className="Form">
                            <label htmlFor="filter">Filter tags</label>
                            <input
                                onChange={this.handleChange}
                                id="filter"
                                type="text"
                                name="filter" />
                        </div>
                    </div>
                </div>
                <div>{availableTagsList}</div>
            </div>
        );
    }
});
