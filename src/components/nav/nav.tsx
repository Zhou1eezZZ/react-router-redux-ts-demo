import * as React from 'react'
import { NavLink } from 'react-router-dom'

import style from './nav.module.scss'

class nav extends React.Component {
    render() {
        return (
            <nav className={style['container']}>
                <NavLink to='/home' activeStyle={{ 'color': 'deepPink' }}>Home</NavLink>
                <NavLink to='/article' activeStyle={{ 'color': 'deepPink' }}>Article</NavLink>
                <NavLink to='/joke' activeStyle={{ 'color': 'deepPink' }}>Joke</NavLink>
                <NavLink to='/color' activeStyle={{ 'color': 'deepPink' }}>Color</NavLink>
            </nav>
        )
    }
}

export default nav