module.exports = (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const categoryId = req.body.categoryId;
    const userId = req.auth?.userId;

    console.log("CHECKWORK:", { title, categoryId, userId, fileExists: !!req.file });

    if (
      title &&
      categoryId &&
      userId &&
      req.file
    ) {
      next();
    } else {
      return res.status(400).json({ error: "Bad Request: missing fields" });
    }
  } catch (e) {
    console.error("CHECKWORK ERROR", e);
    return res.status(500).json({ error: "Middleware error" });
  }
};
