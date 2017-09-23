var ImageSearch = React.createClass({

    searchImages: function () {
        if(this.state.query === '') return;

        let searchquery = "/qwant.json?query=";
        searchquery = searchquery + this.state.query;

        $.ajax({
            url: searchquery,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log('success: ', data.data.result.items);
                this.setState({
                    results: data.data.result.items
                });
            }.bind(this),
            always: () => {
                this.setState({
                    isOpen: false
                });
            }
        })
    },

    getInitialState: function () {
        return {
            query: 'cars',
            isOpen: false,
            results: []
        };
    },

    openCloseClickHandler: function (event) {
        event.preventDefault();
        console.log('openCloseClickHandler');
        this.setState({ isOpen: !this.state.isOpen })
    },

    getResults: function() {
        return this.state.results.map((image, index) => {
            return (
                <img src={image.thumbnail} key={index} onClick={this.imageClicked.bind(this, image)} />
            )
        })
    },

    imageClicked: function(image) {
        this.props.onImagePicked(image.thumbnail, image.media_fullsize);
        this.setState({isOpen: false});
    },

    handleKeyUp: function(event) {
        event.preventDefault();
        console.log(event.target.value);

        this.setState({
            query: event.target.value
        });

        if(event.key == 'Enter') {
            this.searchImages();
        }
    },

    render: function () {
        var classes = classNames('Qwant Form', {
            'is-active': this.state.isOpen
        });

        let resultsList = this.getResults();

        return (
            <div>
                <div onClick={this.openCloseClickHandler} className="Button Button--withIcon">
                    <i className="material-icons">add_to_photos</i>
                    Imagesearch
                </div>
                <div className={classes}>
                    <input
                        type='text'
                        placeholder="Search..."
                        onKeyUp={ this.handleKeyUp }
                        />
                    <div onClick={this.searchImages} className="Button Button--withIcon">
                        <i className="material-icons">search</i>
                        Search
                    </div>
                    <div onClick={this.openCloseClickHandler} className="Button Button--withIcon">
                        <i className="material-icons">close</i>
                        Close
                    </div>
                    <div className="Qwant__results">
                        { resultsList }
                    </div>
                </div>
            </div>
        );
    }
});
