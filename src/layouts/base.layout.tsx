import React from 'react'

const BaseLayout: React.FC<{
    renderSideMenu: () => React.ReactNode
}> = (props) => {
    const { renderSideMenu } = props
    return (
        <div>
            {renderSideMenu()}
            <div>{props.children}</div>
        </div>
    )
}

export default BaseLayout
