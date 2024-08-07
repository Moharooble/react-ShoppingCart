import { useEffect, useState } from "react";
import useShop from "../ShopContext";
import axios from "axios"
import toast from "react-hot-toast";
import { IoIosCheckmarkCircle } from "react-icons/io";


const Payment = () => {
	const {total,clearCart} = useShop();

    const initialPayment = {
		evc: false,
		zaad: false,
		sahal:false,
			
	}
	const [paymentMethod,setPaymentMethod] = useState(initialPayment);

	useEffect(() => {}, [paymentMethod]);

	const [updated, setUpdated] = useState(false);
	const [code,setCode] = useState("");
	const [phone,setPhone] = useState("");
	const [loading,setLoading] = useState(false);

	useEffect(() => {
		if (paymentMethod.zaad) {
			setCode("25263");
		} else if (paymentMethod.evc) {
			setCode("25261");
		} else if (paymentMethod.sahal) {
			setCode("25290");
		}
	}, [paymentMethod]);

	const fullPhone = code+phone;

	const handSubmit = (event) => {
		event.preventDefault()
		// clearCart();

		console.log(fullPhone)
		if (!phone || !code) {
			return toast.error("Phone is empty");
		  }
		processPayment()
	}


	const processPayment = async() => {
		try {
			const body = {
				schemaVersion: "1.0",
				requestId: "10111331033",
				timestamp: 1590587436057686,
				channelName: "WEB",
				serviceName: "API_PURCHASE",
				serviceParams: {
					merchantUid: process.env.REACT_APP_MERCHANT_U_ID,
					apiUserId: process.env.REACT_APP_MERCHANT_API_USER_ID,
					apiKey: process.env.REACT_APP_MERCHANT_API_KEY,
					paymentMethod: "mwallet_account",
					payerInfo: {
						accountNo: fullPhone,
					},
					transactionInfo: {
						referenceId: "12334",
						invoiceId: "7896504",
						amount: total,
						currency: "USD",
						description: "React Shopping Cart",
					},
				},
			};
			setLoading(true);

			const {data} = await axios.post("https://api.waafi.com/asm",body);

			setLoading(false);

			const info = data.responseMsg.split("ERRCODE");
			// success
			console.log(info);
			if (info.length === 1) {
				setUpdated(!updated);
				toast.success("Succefully ordered");
				clearCart();
			} else {
				// errro
				if (data.responseMsg.split("ERRCODE")[2].includes("4004")) {
					// toast.error("User rejected");
					toast.error("User rejected");
					setUpdated(!updated);
				}

				if (data.responseMsg.split("ERRCODE")[2].includes("6002")) {
					// toast.error("Numberka sirta ah waa khalad");
					toast.error("Numberka sirta ah waa khalad");
					setUpdated(!updated);
				}
			}


		}catch (err){
			setLoading(false);
			toast.error("Something wrong. Please try again.",{    style: {
				border: '1px solid #713200',
				padding: '10px',
				color: '#fff',
				backgroundColor: "rgba(255, 170, 110, 0.99)"
			  }});
			// console.error(err);
		}
	}


    return (

		<div>
			
			<div className="paymet-cards">
			<h2>Pay With</h2>
				<div
					className={`payment-card ${paymentMethod.zaad && "selected"}`}
					onClick={() => setPaymentMethod({ zaad: true })}>
					<h3>Zaad Service</h3>
					<IoIosCheckmarkCircle className={`check_icon ${paymentMethod.zaad && "check_selected"}`}/>

				</div>
				<div
					className={`payment-card ${paymentMethod.evc && "selected"}`}
					onClick={() => setPaymentMethod({  evc: true })}>
					<h3>Evc Plus</h3>
					<IoIosCheckmarkCircle className={`check_icon ${paymentMethod.evc && "check_selected"}`}/>
					
				</div>
				<div
					className={`payment-card ${paymentMethod.sahal && "selected"}`}
					onClick={() => setPaymentMethod({sahal: true })}>
					<h3>Sahal</h3>
					<IoIosCheckmarkCircle className={`check_icon ${paymentMethod.sahal && "check_selected"}`}/>
				</div>

				<form onSubmit={handSubmit}>
					<div className="inputs">
						{paymentMethod.zaad && <input type="text" value={"25263"} className="codes" placeholder="25263" readOnly />}
						{paymentMethod.evc && <input type="text" value={"25261"} className="codes" placeholder="25261" readOnly />}
						{paymentMethod.sahal&& <input type="text" value={"25290"} className="codes" placeholder="25290" readOnly />}
						<input type="text"className="form-control" onChange={(e) => setPhone(e.target.value)}/>	
					</div>

					<button className={loading ? "loading" : "btn-proceed"}>{loading ? "Loading..." : "Pay Now"}</button> 
				</form>
			</div>
		</div>
	);
};

export default Payment;