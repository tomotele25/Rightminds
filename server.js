const app = require("./api/server");
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at  ${PORT}`);
});
