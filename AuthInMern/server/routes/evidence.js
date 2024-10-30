const router = require("express").Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.post("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).send({ message: "User not found" });

        if (user.userType !== 'police' && user.userType !== 'forensic') {
            return res.status(403).send({ message: "Access denied. Not authorized to submit evidence." });
        }

        // Here you would typically save the evidence to your database
        // For now, we'll just send a success message
        res.status(200).send({ message: "Evidence submitted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;