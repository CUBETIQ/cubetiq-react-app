import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutContextState {
    selectedSideMenuKeys: string[]
    setSelectedSideMenuKeys: React.Dispatch<React.SetStateAction<string[]>>
}

const LayoutContext = createContext<LayoutContextState>({
    selectedSideMenuKeys: [],
    setSelectedSideMenuKeys: () => {},
})

const LayoutProvider: React.FC = (props) => {
    const [selectedSideMenuKeys, setSelectedSideMenuKeys] = useState<
        LayoutContextState['selectedSideMenuKeys']
    >([])

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            setSelectedSideMenuKeys([])
        }
    }, [location.pathname])

    return (
        <LayoutContext.Provider
            value={{ selectedSideMenuKeys, setSelectedSideMenuKeys }}
        >
            {props.children}
        </LayoutContext.Provider>
    )
}

export const useLayout = () => useContext(LayoutContext)

export default LayoutProvider
