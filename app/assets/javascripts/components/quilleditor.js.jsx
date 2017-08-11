var QuillEditor = React.createClass({
    componentDidMount: function() {
        let self = this;
        Quill.prototype.getHtml = function() {
            return this.container.querySelector('.ql-editor').innerHTML;
        };

        this.initQuillEditor();

        this.quill.clipboard.dangerouslyPasteHTML(this.props.text);

        this.quill.on('text-change', function(delta, oldDelta, source) {
          if (source == 'user') {
            self.props.handleInput(self.quill.getHtml());
          }
        });
    },

    initQuillEditor: function() {
      this.quill = new Quill('#editor-container', {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'link']
          ],
          clipboard: true
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      });
    },

    render:function(){
        return (
            <div>
               <div id="editor-container">
               </div>
            </div>
        )
    }
});