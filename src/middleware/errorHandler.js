const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "PrismaClientKnownRequestError") {
    if (err.code === "P2002") {
      res.status(400).json({ message: "Unique constraint failed", details: err.meta });
    }
    if (err.code === "P2025") {
      res.status(404).json({ message: "Record not found", details: err.meta });
    }
    res.status(400).json({ message: "Data handling error", details: { name: err.name, code: err.code, meta: err.meta } });
  }
  console.error("Error details:", err.status, err.message, err.name);

  if (err.status && err.status !== 500) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default errorHandler;
