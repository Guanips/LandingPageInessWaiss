import "./BtnMP.css"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-f19a3da1-ac12-4f86-aeb7-faaa3f4c5192', { locale: 'es-AR' });

const mercadoPago = () => {


    return(
        <>
            <Wallet initialization={{ preferenceId: 'prodPrueba' }} customization={{ texts:{ valueProp: 'smart_option'}}} />
        </>
    )
}

export default mercadoPago