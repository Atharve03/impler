
export const placeOrder = (req, res) => {
    try {
        const { firstName, lastName, address, items } = req.body;

        if (!firstName || !lastName || !address) {
            return res.status(400).json({
                success: false,
                message: "First name, last name, and address are required."
            });
        }

  

        return res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            orderDetails: { firstName, lastName, address, items }
        });

    } catch (error) {
        console.error("Error in placeOrder function:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to place order."
        });
    }
};
