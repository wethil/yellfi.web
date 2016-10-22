import { composeWithTracker } from 'react-komposer';
import  Comments  from '../../../../api/comments/comments.js';
import  RawCommentsList  from './RawCommentsList.jsx';
import LoadingCircle from '../CommonComponents/LoadingCircle.jsx'

const CommentSub = new SubsManager()
const composer = ( props, onData ) => {
yellId = props.yellId
yellContent=props.yellContent

console.log(yellId)

  const subscription = CommentSub.subscribe( 'thisYellComments',yellId );



  if ( subscription.ready() ) {
    const comments = Comments.find({yellId:yellId}).fetch()

   
    onData( null, { comments,yellContent } );
  }
};

 const CommentComposer = composeWithTracker( composer,LoadingCircle )( RawCommentsList );
 export default CommentComposer