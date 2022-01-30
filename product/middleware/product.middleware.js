exports.validateTextFields = (req, res, next) => {
  const request = req.body;
  if (
    !request.name ||
    !request.price ||
    !request.description ||
    !request.category
  ) {
    res.send("400 Bad Request basic fields not available");
  } else {
    next();
  }
};

exports.validateImageFieldOnAdd = (req, res, next) => {
  const requestFile = req.file;
  if (!requestFile) {
    res.send("400 Bad Image field not available");
  } else {
    next();
  }
};

exports.validateImageFieldOnEdit = (req, res, next) => {
  const requestFile = req.file;
  const imageCheck = req.body.previousImage;
  if (requestFile || imageCheck) {
    next();
  } else {
    res.send("400 Bad Image field not available");
  }
};
