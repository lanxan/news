
var NewsBox = React.createClass({
    render: function(){
        return (
            <div className="newsBox"> 
                <NewsTitle />
                <NewsContent />
                <NewsComment />
            </div>
        );
    }
});

var NewsContent = React.createClass({
    render: function(){
        return (
            <div className="newsContent">
                "Content"
            <div>
        );
    }
});


var NewsTitle = React.createClass({
    render: function(){
        return (
            <div className="newsTitle">
                "XXX時報"
            </div>    
        );
    }
});

var NewsComment = React.createClass({
    render: function(){
        return (
            <div className="newsComment">
                "This is comments."
            </div>
        );
    }
});

React.render(
    <NewsBox />,
    document.getElementById('content');
);
