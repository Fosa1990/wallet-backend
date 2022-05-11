const current = async (req, res, next) => {
  res.json({ message: 'template message: auth - current' });
};

module.exports = current;
