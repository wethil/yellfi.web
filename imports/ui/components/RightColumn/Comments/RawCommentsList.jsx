import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import NoYellComment from './CommentsComponents/NoYellComment.jsx'
import SearchButton from './CommentsComponents/SearchButton.jsx'
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router'




 class RawCommentsList extends Component {




	render() {



     const styles = {
        list:{
          backgroundColor:'white'
        },
      username: {
        color: lightBlue900
        },
      plan: {
        color: grey800
        },
      timeDate: {
        color: grey800
        },  
       keywords:{
        fontSize:12
        },
        subhead:{
          fontSize:11,
          color:'#9E9E9E'
        },
        searchIcon:{
          color:'#B71C1C'
        }


    }




	if (this.props.comments && this.props.comments.length > 0) {
      var comments = []
      this.props.comments.forEach((comment) => {
        let STL = comment.content.length >113 ? 2 : 1
        let content = comment.content.replace(/ /g, "+")

let searchOnGoogle =  <SearchButton searchUrl="http://www.google.com/search?q=" searchContent={content} iconClass="google icon" />
let searchOnYoutube =  <SearchButton searchUrl="https://www.youtube.com/results?search_query=" searchContent={content} iconClass="youtube icon" />
		 comments.push(
          <div key={comment._id}>
            <ListItem
                  //onTouchTap={()=>this.toogleYellCard(comments)}
                  disabled={true}
                  leftAvatar={<Avatar src={comment.owner.profile.avatar} />}
                  primaryText={ <div style={styles.username}>{comment.owner.username} <span style={styles.subhead}> suggested </span>  {searchOnGoogle} | {searchOnYoutube} </div>}
                  secondaryText={
                      	<p>   
                          <span style={styles.keywords}> {comment.content}  </span>
                  		</p>
                  }
                  secondaryTextLines={STL}
              />
            <Divider  inset={true} />
          </div>
        );

      });
    } else {
          

comments = <NoYellComment />

    }


		return (
  <div className="className">

      <List style={styles.list} > 
        {comments}
      </List> 


{/* if add drawer here, it will rendered on left column itself */}
  </div>  
		);
	}
}
export default RawCommentsList;

