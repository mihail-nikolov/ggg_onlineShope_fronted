import axios from "axios";
import CryptoJS from "crypto-js";

class PaymentsRepository {
    constructor() {
        this.http = axios.create({
            baseURL: "http://demo.epay.bg/",
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Expires: 0
            }
        });
    }

    paymentRequest(invoice, amount, expirationDate) {
        const min = process.env.VUE_APP_PAYMENT_MIN;
        const userSecret = process.env.VUE_APP_PAYMENT_SECRET;

        let paymentData = {
            MIN: min,
            INVOICE: invoice,
            AMOUNT: amount,
            EXP_TIME: expirationDate
        };
        let encoded = btoa(JSON.stringify(paymentData));
        let checksum = CryptoJS.HmacSHA1(encoded, userSecret);

        let formData = new FormData();
        formData.append("PAGE", "paylogin");
        formData.append("ENCODED", encoded);
        formData.append("CHECKSUM", checksum);

        axios
            .post("https://demo.epay.bg/", formData)
            .then(function(response) {
                //handle success
                console.log(response);
            })
            .catch(function(response) {
                //handle error
                console.log(response);
            });
    }
}

const paymentsRepository = new PaymentsRepository();

export default paymentsRepository;
