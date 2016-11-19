import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const style = {
    backgroundColor: '#3f51b5'
};

const LoadLeftNavHead = () => (
  <AppBar style={style}
    title="yellfi"
    zDepth={0}
    iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
  
  />
);

export default LoadLeftNavHead;