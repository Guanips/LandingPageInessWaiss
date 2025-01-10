import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalPayment = (props) => {
    const [message, setMessage] = useState("");

    const initialOptions = {
		clientId: "ASi71AOE8p2i2MQxlJ6Bs9StmK-rZO-sz_-tioidU4JxEKgnkpwpQdJIGkfBlANOGEKHYHQsqM319gO1",
		currency: "USD",
		intent: "capture",
	};

    return(
        <>
            <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                    createOrder={async () => {
                        try {
                            
                            const response = await fetch("  https://3b49-181-97-71-112.ngrok-free.app/api/orders", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    product_id: props.idProd,
                                }),
                            });

                            const orderData = await response.json();

                            if (orderData.id) {
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Could not initiate PayPal Checkout...${error}`
                            );
                        }
                    }} 

                    onApprove={async (data, actions) => {
                        try {
                            const response = await fetch(
                                `  https://3b49-181-97-71-112.ngrok-free.app/api/orders/${data.orderID}/capture`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            );

                            const orderData = await response.json();
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message

                            const errorDetail = orderData?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            } else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                throw new Error(
                                    `${errorDetail.description} (${orderData.debug_id})`
                                );
                            } else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                const transaction =
                                    orderData.purchase_units[0].payments
                                        .captures[0];
                                setMessage(
                                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                );
                                actions.redirect(` https://3b49-181-97-71-112.ngrok-free.app/resultadoCompra?paypal_payment_id=${transaction.id}`);
                                console.log(
                                    "Capture result",
                                    orderData,
                                    JSON.stringify(orderData, null, 2)
                                );
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Sorry, your transaction could not be processed...${error}`
                            );
                        }
                    }} 
                />
            </PayPalScriptProvider>
        </>
    ) 
}
export default PayPalPayment