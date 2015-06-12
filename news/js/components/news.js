"use strict";

var data = [
	{publisher : "apple", comments : [{author : "lanxna", comment : "the test."}]},
	{publisher : "china", comments : [{author : "lanxna", comment : "the test."}]},
	{publisher : "free", comments : [{author : "lanxna", comment : "the test."}]}
];

var NewsContainer = React.createClass({
	loadNewsPublisherFromServers: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				
				console.log(data);

				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.log(status, err);
				//console.log(this.props.url + ',' + status);
				//console.log(err.toString());
			}
		});
	},
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		this.loadNewsPublisherFromServers();
		//setInterval(this.loadNewsPaperPublisherFromServers, this.props.pollInterval);
	},
	render: function(){
		return (
			<div id="newsContainer">
				{this.state.data.map(function(news) {
					return [
						<NewsBox key={news.publisher} id={news.publisher} comments={news.comments} />,
						<br />
					];
				})}
			</div>
		);
	}
});

var NewsBox = React.createClass({

	handleCommentSubmit: function(comment) {
		//Optimization
		var comments = this.state.comments;
		var newComments = comments.concat([comment]);
		this.setState({comments: newComments});
		var jsonString = JSON.stringify({publisher : this.props.id, comment : comment});

		$.ajax({
			url: '../ajax/insertComment',
			dataType: 'json',
			type: 'POST',
			data: {jsonData : jsonString},
			success: function(data) {
				//this.setState({comments: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function(){
		return {comments: this.props.comments};
	},
    render: function(){
        return (
            <div className="newsBox">
				<NewsTitle editor={this.props.id} >The editor.</NewsTitle>
                <NewsContent />
                <NewsComments comments={this.state.comments}/>
				<NewsCommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

class NewsContent extends React.Component{
	render() {
        return (
            <div className="newsContent">
                Content.
            </div>
        );
	}
}

class NewsTitle extends React.Component{
    render() {
        return (
            <div className="newsTitle">
                {this.props.editor}時報
            </div>    
        );
    }
}

class NewsComments extends React.Component{
    render() {
		return (
            <div className="newsComments">
				{this.props.comments.map(function(comment) {
					return [
						<span>{comment.author} : {comment.comment}</span>,
						<br />
					];
				})}
            </div>
        );
    }
}

class NewsCommentForm extends React.Component{
	handleSubmit(e) {
		e.preventDefault();
		var author = React.findDOMNode(this.refs.author).value.trim();
		var comment = React.findDOMNode(this.refs.comment).value.trim();
		if( !comment || !author) {
			return;
		}
		//send request
		this.props.onCommentSubmit({author: author, comment: comment});

		React.findDOMNode(this.refs.author).value = '';
		React.findDOMNode(this.refs.comment).value = '';
		return;
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<input type="text" placeholder="Your name" ref="author" /><br />
				<input type="text" placeholder="Your comment" ref="comment" /><br />
				<input type="submit" value="post" />
			</form>
		)
	}
}

React.render(
    <NewsContainer url="../ajax/getComments" /*url="js/store/data.json"*/ pollInterval={2000}/>,
	document.getElementById('content')
);
