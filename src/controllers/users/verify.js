const verify = async (req, res, next) => {
  res.json({ message: 'template message: auth - verify' });
};

module.exports = verify;
