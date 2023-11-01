function globalExceptionHandler(err, req, res, next) {


  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Veri doğrulama hatası', error: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Geçersiz ID hatası', error: err.message });
  }

  res.status(500).json({ message: 'Bir hata oluştu', error: err.message });

  next();
}

module.exports = globalExceptionHandler;