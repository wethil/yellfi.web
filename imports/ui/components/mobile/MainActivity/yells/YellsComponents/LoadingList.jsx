import React from 'react';
import  {bg,frameStyle} from './constant.js'

const LoadingList = () => (
			<div className="ui container center aligned grid" style={frameStyle} >	
				<div  style={loadingCard} className="ui card card--z-2">
					<div  className="content">
						<img src={bg} alt="" />
					</div>
				</div>
				<div  className="ui card card--z-2">
					<div  className="content">
						<img src={bg} alt="" />
					</div>
				</div>
				<div  className="ui card card--z-2">
					<div  className="content">
						<img src={bg} alt="" />
					</div>
				</div>
			</div>
		);
export default LoadingList;


loadingCard={
	height:'12em'
}