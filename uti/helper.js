exports.handleError = (req, res, err) => {
	return res.status(500).json({
		status: 'error'
	})
}
