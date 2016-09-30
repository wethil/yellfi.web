import { composeWithTracker } from 'react-komposer';
import  Comments  from '../../../../api/comments/comments.js';
import  RawCommentsList  from './RawCommentsList.jsx';
import CommentSub from './CommentsComponents/subsManager.js'
import LoadingCircle from './CommentsComponents/LoadingCircle.jsx'


const composer = ( props, onData ) => {
yellId = props.yellId


  const subscription = CommentSub.subscribe( 'thisYellComments',yellId );



  if ( subscription.ready() ) {
    const comments = Comments.find({yellId:yellId}).fetch()

   
    onData( null, { comments } );
  }
};

 const CommentComposer = composeWithTracker( composer,LoadingCircle )( RawCommentsList );
 export default CommentComposer