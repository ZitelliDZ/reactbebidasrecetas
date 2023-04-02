import { useState, useEffect, createContext } from "react";
import axios from "axios";

const BebidasContext = createContext()

const BebidasProvider = ({ children }) => {

    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [receta, setReceta] = useState({})
    const [cargando, setCargando] = useState(false)


    const obtenerBebidas = async (busqueda) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`

            const { data } = await axios(url)
            
            setBebidas(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClick = () => {
        setModal(!modal)
    }
    
    const handleBebidaIdClick = (id) => {
        setBebidaId(id)
    }
    
    useEffect(() => {
        const obtenerReceta = async () => {
            setCargando(true)

            if (!bebidaId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`

                const { data } = await axios(url)
                
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
            
        }

        obtenerReceta()

    
    }, [bebidaId])
    


    return (
        <BebidasContext.Provider
            value={{
                obtenerBebidas,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta,
                cargando

            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext