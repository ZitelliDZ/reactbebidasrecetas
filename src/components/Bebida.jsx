import { Col, Card, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"


const Bebida = ({ bebida }) => {


    const { handleModalClick,handleBebidaIdClick } = useBebidas()


    return (
        <Col sm={4} md={3} lg={3} className="mt-5">
            <Card className="mb-4">
                <Card.Img
                    variant="top"
                    src={bebida.strDrinkThumb}
                    alt={`Imagen de ${bebida.strDrink}`}
                />
                <Card.Body>
                    <Card.Title>{bebida.strDrink}</Card.Title>
                    <Button
                        onClick={() => {
                            handleModalClick()
                            handleBebidaIdClick(bebida.idDrink)
                        }}
                        variant={'warning'}
                        className="w-100 text-uppercase mt-2 text-white"
                    >Ver Bebida</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Bebida