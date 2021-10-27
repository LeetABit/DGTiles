import React from 'react';
import * as gitVersion from './gitVersion.json';

function App() {
    return <>
        <div>Version: {gitVersion.version}+{gitVersion.branch}.{gitVersion.commitCount}+sha.{gitVersion.sha}</div>
        <div>Date: {gitVersion.buildTime}</div>
    </>

}

export default App;
