export class CabBookingDTO {
  #result;
  constructor(result) {
    this.#result = result;
  }

  to() {
    return {
      bookings: [
        {
          name: "bookings",
          columns: ["Booking ID", "Customer", "Phone", "Type", "Cab No"],
          rows: this.#result.map((b) => ({
            id: b.bookingId,
            customer: b.customerName,
            phone: b.phoneNo,
            type: b.bookingType,
            cab: b.cabDTO?.cabNo,
          })),
        },
      ],
    };
  }

  static from(data) {
    return new CabBookingDTO(data);
  }
}
