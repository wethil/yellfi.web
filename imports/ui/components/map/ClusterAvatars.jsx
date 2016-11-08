import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory } from 'react-router'
import {plans} from '../constants.js'
import Badge from 'material-ui/Badge';
 class ClusterAvatars extends Component {
	render() {
		avatars=[]
		const {active,publicYells}=this.props
		if (publicYells && publicYells.length>0 && active){
					this.props.publicYells.forEach(function (publicYell) {
			avatars.push(<span id="avatars"  className="animated bounceInRight"
							 style={{cursor:'pointer'}} 
							key={publicYell._id}
							 onClick={()=>browserHistory.push('/yell/'+publicYell.refYellId)}>
				<ListItem
						
				 			//onTouchTap={()=>browserHistory.push('/yell/'+publicYell.refYellId)}
							style={{marginBottom:'5px'}}
							//innerDivStyle={{padding:0}}
							disabled={true}
							leftAvatar={
							  	  <Badge
							      badgeContent={<FontIcon  style={styles.avatarBadge} className="material-icons">{plans[publicYell.yell.plan].icon}</FontIcon>}
							      primary={true}
							      //style={styles.badge}
							      badgeStyle={styles.badgeInLine}

							    >
							    	<Avatar 
									  	src ={publicYell.yell.owner.profile.avatar}
									  	/>
							</Badge> 
					      }/>

				</span>
					      )
		});
		content=<div className="animated bounceInRight" style={styles.clusterAvatars}>
				<List>
				{avatars}
				</List>
			</div>


				} else {
			content =<span id="avatars" className="className"></span>
				}

		return (
			<span className="className">{content}</span>
		);
	}
}
export default ClusterAvatars;

const styles = {
  clusterAvatars:{
    zIndex:2,
    position:'absolute'
  },
  avatar:{
  	borderStyle:'solid',
  	borderWidth:0.1
  },
  badge:{
  	zIndex:123
  },
  badgeInLine:{
  	bottom:9,
  	right:10,
  	top:'initial',
  	backgroundColor:'#e0e7e7'
  },
  avatarBadge:{
  	color :'#757575',
  	fontSize:13
  }
};


