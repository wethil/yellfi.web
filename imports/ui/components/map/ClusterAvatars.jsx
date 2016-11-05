import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
 class ClusterAvatars extends Component {
	render() {
		return (
			<div style={styles.clusterAvatars}>
				<List>
					 <ListItem
					      disabled={true}
					      leftAvatar={<Avatar>A</Avatar>}/>
					  <ListItem
					      disabled={true}
					      leftAvatar={<Avatar>A</Avatar>}/>
					  <ListItem
					      disabled={true}
					      leftAvatar={<Avatar>A</Avatar>}/>
				</List>
			</div>
		);
	}
}
export default ClusterAvatars;

const styles = {
  clusterAvatars:{
    zIndex:2,
    position:'absolute'
  }
};


