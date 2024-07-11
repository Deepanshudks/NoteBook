import React from 'react'

const Spinner = () => {
    return (
        <button type="submit" className="btn btn-primary">  
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </button >
    )
}

export default Spinner