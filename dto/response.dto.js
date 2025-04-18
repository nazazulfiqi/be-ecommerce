// response.dto.js
class ResponseDTO {
  constructor(statusCode, message, data = null) {
    this.status_code = statusCode;
    this.message = message;
    if (data !== null) {
      this.data = data; // Hanya tambahkan data jika ada
    }
  }

  static success(message, data = null) {
    return new ResponseDTO(200, message, data);
  }

  static error(message, statusCode = 500) {
    return new ResponseDTO(statusCode, message);
  }

  static notFound(message) {
    return new ResponseDTO(404, message);
  }

  static conflict(message) {
    return new ResponseDTO(409, message);
  }
}

export default ResponseDTO;
