const logout = async (req, res) => {
  try {
    res.status(200);
    res.type('json');
    res.send({
      result: 'OK',
    });
  } catch {
    res.status(400);
    res.type('json');
    res.send({
      result: 'NG',
    });
  }
};

module.exports = logout;