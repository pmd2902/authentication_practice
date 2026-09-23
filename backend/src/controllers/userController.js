export const authMe = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const test = async (req, res) => {
    return res.status(204).json({
        message: 'test'
    })
}