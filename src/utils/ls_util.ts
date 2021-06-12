export const setStorage = (key: string, value?: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key: string, defaultValue?: string): (string | undefined | null) => {
    return localStorage.getItem(key) ?? defaultValue
}