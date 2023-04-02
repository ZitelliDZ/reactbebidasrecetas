import { Button, Form, Row, Col, Alert } from "react-bootstrap"
import useCategoria from "../hooks/useCategoria"
import useBebidas from "../hooks/useBebidas"
import { useState } from "react"


const Formulario = () => {
    const { categorias } = useCategoria()
    const { obtenerBebidas } = useBebidas()

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })
    const [alerta, setAlerta] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son Obligatorios.')
            return
        }
        setAlerta('')
        obtenerBebidas(busqueda)
    }

    return (
        <Form onSubmit={handleSubmit}>.
            {alerta && <Alert variant="danger">{alerta}</Alert>}
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nombre">Nombre Bebidas</Form.Label>
                        <Form.Control
                            id="nombre"
                            type="text"
                            placeholder="Ej: Tequila, Vodka, etc."
                            name="nombre"
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </Form.Group>

                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="categoria">Categoria: </Form.Label>
                        <Form.Select
                            id="categoria"
                            name="categoria"
                            value={busqueda.categoria}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                            <option value="">-- Seleccione Categoria --</option>
                            {categorias.map(categoria => (
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-end">
                <Col md={3}>
                    <Button variant="danger"
                        type="submit"
                        className="text-uppercase w-100 "
                    >
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulario