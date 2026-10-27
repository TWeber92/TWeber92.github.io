import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class CabBookingRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  get entity() {
    return this.#entity;
  }

  getCabBookingCabsTableSchema() {
    return {
      columns: ["Cab No", "Model", "Driver Phone", "Availability"],
      rows: [
        {
          cab_no: 451678,
          model_name: "Honda",
          driver_phone_no: 9823478234,
          availability: "No",
        },
        {
          cab_no: 567897,
          model_name: "Mahindra",
          driver_phone_no: 9643345654,
          availability: "No",
        },
        {
          cab_no: 234987,
          model_name: "Toyota",
          driver_phone_no: 9643675654,
          availability: "No",
        },
        {
          cab_no: 456783,
          model_name: "Toyota",
          driver_phone_no: 9947835654,
          availability: "Yes",
        },
        {
          cab_no: 159723,
          model_name: "Maruti",
          driver_phone_no: 8744435654,
          availability: "Yes",
        },
      ],
    };
  }

  getCabBookingBookingsTableSchema() {
    return {
      columns: ["Booking ID", "Customer", "Phone", "Type", "Cab No"],
      rows: [
        {
          booking_id: 1001,
          customer_name: "Michel",
          phone_no: 9867542341,
          booking_type: "Shared",
          cab_no: 451678,
        },
        {
          booking_id: 1002,
          customer_name: "Robert",
          phone_no: 8745316754,
          booking_type: "Personal",
          cab_no: 567897,
        },
        {
          booking_id: 1003,
          customer_name: "Peter",
          phone_no: 9645336766,
          booking_type: "Shared",
          cab_no: 234987,
        },
      ],
    };
  }
}
