exports.listUsers = async (req, res) => {
  res.json([
    { name: "John" },
    { name: "David" }
  ]);
};