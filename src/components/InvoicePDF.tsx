import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    backgroundColor: "#f7f8fa",
    color: "#333",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: "30%",
    alignItems: "flex-start",
  },
  logo: {
    width: 80,
  },
  companyDetailsContainer: {
    width: "70%",
    alignItems: "flex-end",
    textAlign: "right",
  },
  titleContainer: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  companyDetails: {
    fontSize: 10,
    color: "#2c3e50",
    lineHeight: 1.2,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 5,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#2980b9",
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
    color: "#2c3e50",
  },
  footer: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#bdc3c7",
    textAlign: "center",
    fontSize: 10,
    color: "#2c3e50",
  },
  termsConditions: {
    fontSize: 9,
    color: "#7f8c8d",
    marginTop: 5,
    fontStyle: "italic",
  },
});

const Invoice = ({ bookingData, bookingId }:any) => {

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
          
          </View>
          <View style={styles.companyDetailsContainer}>
            <Text style={styles.companyDetails}>
              RP ROYALITY TOURS AND TRAVEL SOLUTIONS PVT LTD
            </Text>
            <Text style={styles.companyDetails}>
              POICKATTUSERY, CHENGAMANAD POST
            </Text>
            <Text style={styles.companyDetails}>
              NEAR COCHIN INTERNATIONAL AIRPORT, KOCHI
            </Text>
            <Text style={styles.companyDetails}>Kerala, India - 683578</Text>
            <Text style={styles.companyDetails}>GSTIN: 32AAMCR3886N1ZN</Text>
            <Text style={styles.companyDetails}>PAN: AAMCR3886N</Text>
            <Text style={styles.companyDetails}>Phone: +91 80787 83984</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Invoice</Text>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <Text style={styles.bold}>Booking Details:</Text>
          <Text style={styles.text}>Booking ID: {bookingId}</Text>
          <Text style={styles.text}>
            Pickup Location:{" "}
            {bookingData?.bookingDetails?.tripStartingDestination}
          </Text>
          {bookingData?.bookingDetails?.tripType == "rental" ? (
            <></>
          ) : (
            <Text style={styles.text}>
              Drop Location:{" "}
              {bookingData?.bookingDetails?.tripEndingDestination}
            </Text>
          )}
          <Text style={styles.text}>
            Pickup Date: {bookingData?.bookingDetails?.tripPickupdate}
          </Text>
          {bookingData?.bookingDetails?.tripType == 'round'&&(
             <Text style={styles.text}>
             Drop Date: {bookingData?.bookingDetails?.tripDropdate}
           </Text>
          )}
          <Text style={styles.text}>
            Pickup time: {bookingData?.values?.time}
          </Text>
          {bookingData?.bookingDetails?.tripType == "rental" && (
            <Text style={styles.text}>
              Trip Type:{" "}
              {`${bookingData?.bookingDetails?.tripType} (${bookingData?.bookingDetails?.tripDistance}KM/${bookingData?.bookingDetails?.tripRange}hrs)`}
            </Text>
          )}
          {bookingData?.bookingDetails?.tripType == "oneWay" && (
            <Text style={styles.text}>
              Trip Type:{" "}
              {`${bookingData?.bookingDetails?.tripType} (${bookingData?.bookingDetails?.tripDistance}KMs)`}
            </Text>
          )}
           {bookingData?.bookingDetails?.tripType == "round" && (
            <Text style={styles.text}>
              Trip Type:{" "}
              {`${bookingData?.bookingDetails?.tripType} (${bookingData?.bookingDetails?.tripDistance}KMs)`}
            </Text>
          )}
          <Text style={styles.text}>
            Car Type: {bookingData?.bookingDetails?.vehicleName}
          </Text>
        </View>

        {/* Billing Details */}
        <View style={styles.section}>
          <Text style={styles.bold}>Billing Details:</Text>
          <Text style={styles.text}>
            Total Amount: {bookingData?.bookingDetails?.tripTotalFare}
          </Text>
          <Text style={styles.text}>
            a) Base Fare: {bookingData?.bookingDetails?.baseFare}
          </Text>
          <Text style={styles.text}>
            b) GST: {bookingData?.bookingDetails?.taxes }
          </Text>
          <Text style={styles.text}>
            Payment Method: {bookingData?.bookingDetails?.tripTotalFare} (to be
            paid to the driver)
          </Text>
        </View>

        {/* Extra Charges */}
        <View style={styles.section}>
          <Text style={styles.bold}>
            Extra Charges, if applicable (to be paid to the driver during the
            trip):
          </Text>
          <Text style={styles.text}>
            a) Extra Km: ₹{bookingData?.bookingDetails?.vehicleperKM}/KM
          </Text>{bookingData?.bookingDetails?.tripType == "round" && 
          <Text style={styles.text}>
            b) Extra Hr: ₹{bookingData?.bookingDetails?.vehicleperHour}/hr
          </Text>}
          <Text style={styles.text}>
            c) Toll & Parking: {"As per actuals"}
          </Text>
          <Text style={styles.text}>
            d) Night Driver Allowance:{" "}
            {
              "Rs. 300.00 per night (If the trip extends beyond 09:45 PM)"}
          </Text>
        </View>

        {/* Important T&C */}
        <View style={styles.section}>
          <Text style={styles.bold}>Important T&C:</Text>
          <Text style={styles.text}>
            • Your Trip has a KM limit as well as an Hours limit. If your usage
            exceeds these limits, you will be charged for the excess KM and/or
            hours used.
          </Text>
          <Text style={styles.text}>
            • The KM and Hour(s) usage will be calculated based on the distance
            from your pick-up point and back to the pick-up point.
          </Text>
          <Text style={styles.text}>
            • All road toll fees, parking charges, state taxes etc. are charged
            extra and need to be paid to the concerned authorities as per
            actuals.
          </Text>
          <Text style={styles.text}>
            • For driving between 09:45 PM to 06:00 AM on any of the nights, an
            additional allowance will be applicable and is to be paid to the
            driver.
          </Text>
          <Text style={styles.text}>
            • Any discrepancies regarding bill amount will be considered within
            24 hrs of Invoice.
          </Text>
          {/* <Text style={styles.text}>
            Details T&C: <Link src="">click here</Link>
          </Text> */}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>In case of any queries reach out to us :</Text>
          <Text>rproyality632@gmail.com | 8078783984 </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
