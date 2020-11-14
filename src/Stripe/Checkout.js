import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Logo from ".././Assets/logov.2.png";
import axios from "axios";

const Checkout = () => {
    const STRIPE_SECRET_TEST_KEY =
        "pk_test_51HXHnxCxFnhPgdxLfMn77enlPnZPWGh1qgwF1ViJKp0xPJDq4o4AjTpVcoo0ur7BUiky6WpYD4yPtZU1dCBUodWI00VfROeGGf";
    const onToken = (token) => {
        const body = {
            amount: 999,
            token: token,
        };

        axios
            .post("/payment", body)
            .then((response) => {
                console.log(response);
                alert("Payment Success");
            })
            .catch((error) => {
                console.log("Payment Error: ", error);
                alert("Payment Error");
            });
    };

    return (
        <StripeCheckout
            label="Subscribe"
            name="Connect"
            description="Subscribe to get stripe today."
            panelLabel="Subscribe"
            amount={1000}
            token={onToken}
            stripeKey={STRIPE_SECRET_TEST_KEY}
            image={Logo}
            billingAddress={false}
        />
    );
};

export default Checkout;
