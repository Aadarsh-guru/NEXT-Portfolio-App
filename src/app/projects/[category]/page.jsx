import React from 'react'

const Category = ({ params }) => {
    return (
        <div>
            {params?.category}
        </div>
    )
}

export default Category