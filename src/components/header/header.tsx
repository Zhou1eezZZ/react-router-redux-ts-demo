import * as React from 'react'

import style from './header.module.scss'

class header extends React.Component{
    render(){
        return (
            <header className={style['head']}><span role="img" aria-label="peanut">🥜</span>PeanuTn-T</header>
        )
    }
}

export default header