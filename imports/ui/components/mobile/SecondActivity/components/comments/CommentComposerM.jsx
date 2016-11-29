import { composeWithTracker } from 'react-komposer';
import  Comments  from '../../../../../../api/comments/comments.js';
import  RawCommentListM  from './RawCommentListM.jsx';
//import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'

const CommentSub = new SubsManager()
const composer = ( props, onData ) => {
yellId = props.yellId
yellOwnerId = props.yellOwnerId


//console.log(yellId)

  const subscription = CommentSub.subscribe( 'thisYellComments',yellId );



  if ( subscription.ready() ) {
    const comments = Comments.find({yellId:yellId},{sort: {'created_at': -1}}).fetch()

   
    onData( null, {comments,yellOwnerId,yellId} );
  }
};

 const CommentComposerM = composeWithTracker( composer )( RawCommentListM );
 export default CommentComposerM