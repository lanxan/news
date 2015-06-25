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
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.log(status, err);
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
						<NewsBox key={news.publisher} id={news.publisher} link={news.link} title={news.title} comments={news.comments} />,
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
			success: function() {
				console.log('ok');
				//this.setState({comments: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err);
			}
		});
	},
	getInitialState: function(){
		return {comments: this.props.comments};
	},
    render: function(){
        return (
            <div className="newsBox">
				<NewsTitle id={this.props.id} title={this.props.title}>The editor.</NewsTitle>
                <NewsContent id={this.props.id} link={this.props.link}/>
                <NewsComments comments={this.state.comments}/>
				<NewsCommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

class NewsTitle extends React.Component{
    render() {
        return (
            <div className="newsTitle">
                {this.props.id}時報 - {this.props.title}
            </div>    
        );
    }
}

class NewsContent extends React.Component{
	render() {
        return (
            <div className="newsContent">
                <img src={"image/20150625-"+this.props.id+".jpg"} width = "600px" height = "400px" />
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
