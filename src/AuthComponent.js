import { useContext, createContext, useEffect, useState } from 'react'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthComponent = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const verifyToken = async () => {
            const res = await fetch(`http://localhost:8000/auth/jwt-verify`, {
                credentials: "include"
            })
            setIsAuth(res.ok)
        }
        verifyToken()
    }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthComponent