class ServiceError {
  constructor(status = 500, message = "iternal server error") {
    this.status = status;
    this.details = { error: message };
  }
}

export default ServiceError;
