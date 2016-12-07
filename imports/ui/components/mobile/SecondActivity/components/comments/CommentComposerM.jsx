import { composeWithTracker } from 'react-komposer';
import  Comments  from '../../../../../../api/comments/comments.js';
import  RawCommentListM  from './RawCommentListM.jsx';
import Loading from '../others/Loading.jsx'

const CommentSub = new SubsManager()
const composer = ( props, onData ) => {
	const {yellId,yellOwnerId,plan,suggestions} = props



//console.log(yellId)

  const subscription = CommentSub.subscribe( 'thisYellComments',yellId );



  if ( subscription.ready() ) {
    const comments = Comments.find({yellId:yellId},{sort: {'created_at': -1}}).fetch()

   
    onData( null, {comments,yellOwnerId,yellId,plan,suggestions} );
  }
};

 const CommentComposerM = composeWithTracker( composer,Loading )( RawCommentListM );
 export default CommentComposerM