"use strict";

//css inline style
var style = {
	apple : {
		background : '#F3F781',
	},
	china : {
		background : '#58D3F7',
	}
}

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
					];
				})}
			</div>
		);
	}
});

class NewsBox extends React.Component{
	
	constructor (props) {
		super(props);
		this.state = {comments: this.props.comments};
	}

	handleCommentSubmit (comment) {
		//Optimization
		var comments = this.state.comments;
		var newComments = comments.concat([comment]);
		var jsonString = JSON.stringify({publisher : this.props.id, comment : comment});

		this.setState({comments: newComments});

		$.ajax({
			url: '../ajax/insertComment',
			dataType: 'json',
			type: 'POST',
			data: {jsonData : jsonString},
			success: function(data) {
				//this.setState({comments: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err);
			}
		});
	}
    render () {
        return (
            <div className="newsBox news">
		<NewsTitle id={this.props.id} title={this.props.title} link={this.props.link}>The editor.</NewsTitle>
		<NewsContent id={this.props.id} link={this.props.link} />
                <NewsComments comments={this.state.comments} />
		<NewsCommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

class NewsTitle extends React.Component{
    render() {
        return (
            <div className="newsTitle news">
                <a href={this.props.link} target="_blank"><span>{this.props.id}時報 - {this.props.title}</span></a>
            </div>    
        );
    }
}

class NewsContent extends React.Component{
	render() {
		var contentStyle = (this.props.id == 'china') ? style.china : style.apple;
        return (
            <div className="newsContent news" id={this.props.id} style={contentStyle}>
                <a href={this.props.link} target="_blank"><img src={"image/20150625-"+this.props.id+".jpg"} width = "100%" height = "100%" /></a>
            </div>
        );
	}
}

class NewsComments extends React.Component{
    render() {
	return (
            <div className="newsComments news">
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
			<form className="news" onSubmit={this.handleSubmit.bind(this)}>
				<input type="text" placeholder="Your name" ref="author" /><br />
				<input type="text" placeholder="Your comment" ref="comment" /><br />
				<input type="submit" value="post" />
			</form>
		)
	}
}

React.render(
    	<NewsContainer url="../ajax/getComments" />,
	document.getElementById('content')
);
