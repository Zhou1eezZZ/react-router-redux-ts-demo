import * as React from 'react'
import { Link } from 'react-router-dom'

class notFound extends React.Component {
    render() {
        return (
            <div>
                <p>sorry , we can not get to you page.</p>
                <Link to='/home'><span role="img" aria-label="back">🚐</span>Back to Home</Link>
            </div>
        )
    }
}

export default notFound