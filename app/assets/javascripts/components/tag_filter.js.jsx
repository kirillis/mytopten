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

    handleActiveTagClick(event, tag) {
        location.search = App.removeTagFromFilter(tag.name);
    },

    getHeadline() {
        return(
            <h2>Lists with tags</h2>
        )
    },

    render: function () {
        var activeTagsList = this.state.activeTagsArray.map(function(item, index) {
            let tagData = {name: item};
            return (
                <Tag type="remove" key={index} data={tagData} tagClickHandler={ this.handleActiveTagClick } />
            )
        }.bind(this));

        var availableTagsList = this.state.tags.map(function (item) {

            if (
                this.state.activeTagsArray.indexOf(item.name) === -1 &&
                item.name.indexOf(this.state.filterValue) !== -1
            ) {
                return <Tag type="add" key={item.id} data={item} tagClickHandler={ this.addFilterHandler }/>;
            }
            return false;
        }.bind(this));

        return (
            <div className="container u-mt-3">

                <h2>Avilable tags</h2>
                <div className="Form u-d-inline-block">
                    <input
                        onChange={this.handleChange}
                        id="filter"
                        type="text"
                        name="filter"
                        placeholder="Search..." />
                </div>

                <div>{availableTagsList}</div>

                <div className="u-mt-2">
                    {activeTagsList.length > 0 ? this.getHeadline() : <Alert />}
                    <div>{activeTagsList}</div>
                </div>

            </div>
        );
    }
});
