import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import { grey400, grey700, darkBlack, grey800, lightBlue900 } from 'material-ui/styles/colors';
import CustomScroll from 'react-custom-scroll';
import NoUserYell from './YellsComponents/NoUserYell.jsx'
import NoYell from './YellsComponents/NoYell.jsx'
import { browserHistory } from 'react-router'
import  verge from 'verge'; 
import _ from 'lodash';
import emitter from '../../emitter.js'
import Snackbar from 'material-ui/Snackbar';
import {plans} from '../../constants.js';
import i18n from 'meteor/universe:i18n';

i18n.setOptions({
  hostUrl: 'http://'+window.location.hostname+':3000/'
});



 class RawYellList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       snackbarState:false,
        snackbarMessage:"",
        snackbarType:"",
        snackbarData:"",
        propDuplicate:1,
        yells:[]
    };
  }

  componentDidMount() {
     

  }

componentWillMount(){
  this.makePropState(this.props.yells)
}

componentWillReceiveProps(nextProps){
  this.makePropState(nextProps.yells)
  if(nextProps.yells.length>=9) {
    this.checkProps(nextProps.yells, nextProps.limit)
  }
}



makePropState(data){
  this.setState({yells:data})
}

checkProps(newP,limit){
  if(newP.length<limit) {
  
         this.setState({propDuplicate:this.state.propDuplicate + 1})
      } else {
        this.setState({propDuplicate:0})
      }

}


handleScroll(lastId){
  var lastElement = document.getElementById(lastId);
   if (verge.inViewport(lastElement)==true  ) {    
        if(this.props.component==0){
        emitter.emit('userYellInfinite') // will go UserFragment
      } else {
      
         emitter.emit('incLimit') //will go OthersYells
      }
  } 
}


toogleYellCard(yellId) {

  browserHistory.push('/yell/'+yellId)
// emitter.emit('toogleDrawerForCard',yellId) //make left drawer yell card state
}


undoAction(type,data) {
    switch(type) {
      case 'yell':
          Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              this.closeSb()
              browserHistory.push('/yell/'+data)
            }
          });
          break;
      case 'comment':
            Meteor.call('undoDeleteYell',data,error=> {
            if (error) {
              console.log(error)
            } else {
              console.log('ok')
            }
          });
          break;
      
  }
}

	render() {

if(this.state.yells && this.state.yells.length != 0) {
  last = _.last(this.state.yells);
 lastId= last._id
} else {
  lastId=""
}



    
//listHeight = this.props.heightforBottomNav ? this.props.heightforBottomNav : '80.6vh'




     const styles = {
        list:{
          height: '80.6vh',
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
        }

    }




	if (this.state.yells && this.state.yells.length > 0) {
      var yells = []
      this.state.yells.forEach((yell) => {

        let time = ` ${moment(yell.time).calendar()} `




        switch(yell.publicity) {
        case 0 : 
           publicity = i18n.__('common.publicity.alone')
           break;
		    case 1:
		        publicity = i18n.__('common.publicity.everyone')
		        break;
		    case 2:
		        publicity = i18n.__('common.publicity.elected')
		        break;		   
		}
    
if (yell.publicity == 0) {
  publicityLabel =  <span>  <a className="ui mini circular label"><i className="user icon"></i> {publicity}</a>  </span>  
  timeLabel =""
} else {
  publicityLabel= <span>  <a className="ui mini circular label"><i className="users icon"></i> {publicity}</a>  </span>  
  timeLabel = <span style={styles.timeDate}> <a className="ui mini circular label"><i className="wait icon"></i> {time}</a> </span>
                         
   
                          
                         
}
if (yell.keyword) {
  keyword = <span> -- <span style={styles.keywords}>  {yell.keyword} </span> </span>
} else {
  keyword ="" 
}
prePlan=Number(yell.plan)
if ( prePlan<0 || prePlan>9  ||  isNaN(prePlan)  ) {
  plan = yell.plan
} else {
  plan =i18n.__(plans[prePlan].content)
}

		 yells.push(
          <div  id={yell._id} key={yell._id}>
            <ListItem
                  onTouchTap={()=>this.toogleYellCard(yell._id)}
                  leftAvatar={<Avatar src={yell.owner.profile.avatar} />}
                  primaryText={ <div style={styles.username}>{yell.owner.username} <span style={styles.subhead}> </span> {publicityLabel}  {timeLabel}  </div>}
                  secondaryText={
                      	<p>   
                        <span style={styles.plan}>{plan} </span> 
                        {keyword}
                  		</p>
                  }
                  secondaryTextLines={1}
              />
            <Divider  inset={true} />
          </div>
        );

      });
    } else {
          

        switch(this.props.component) {
    case 0:
        emitter.emit('noUserYellAnim')
        yells = <NoUserYell />
        break;
    case 1:
        yells = "no yell"
        break;
      case 2:
        yells = <NoYell />
        break;
    default:
         yells="error"
}

    }


		return (
  <div className="sixteen wide column">
    <CustomScroll
      onScroll={this.handleScroll.bind(this,lastId)}
    > 
      <List style={styles.list} > 
      {yells}
      </List> 
    </CustomScroll>
  


    {/* if add drawer here, it will rendered on left column itself */}
  </div>  
		);
	}
}
export default RawYellList;