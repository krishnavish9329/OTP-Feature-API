import React,{useState} from 'react'

const page = () => {

    const [otp, setOtp] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState("");



    const checkOtp = () => {
         console.log("otp is " + otp + "& " + generatedOtp);
    
        if (otp === generatedOtp) {
          setShowOtpModal(false);
          console.log("OTP is Same")
          return;
        } else {
          console.log("missmatch OTP")
          setShowOtpModal(false);
        }
      };

      const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
        try {
          console.log(" i am in sendOtpEmail ");
          const response = await fetch("/api/OTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp }),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            console.log("Success:", result);
          } else {
            console.error("Error:", result.error);
          }
        } catch (error) {
          console.error("Network or parsing error:", error);
        }
      };

    const handleSubmit = async (e : any) => {
          
    
          const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
          console.log(newOtp ," OTP");
          setGeneratedOtp(newOtp);
          setShowOtpModal(true);
          await sendOtpEmail("userEmail@gmail.com", newOtp);
        
      };
    

  return (
    <>

    <button onClick={handleSubmit}>Send Email with OTP</button>

    {showOtpModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 z-10 flex justify-center items-center animate-fade-in">
          <div className="bg-softBg1 p-8 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
            <p className="text-lg font-semibold mb-4">Enter OTP sent to your Email</p>
            <input
              type="text"
              className="text-lg font-semibold mb-4 w-full p-2 border rounded"
              // onChange={(e) => setOtp(e.target.value)}
              onChange={(e) => setOtp(e.target.value.replace(/\s/g, ''))}
              placeholder="XXXXXX"
            />
            <div className="flex justify-between items-center gap-4">
              <button
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
                onClick={checkOtp}
              >
                Submit
              </button>

              <button
                className="border border-gray-300 py-2 px-4 text-gray-700 rounded hover:bg-gray-100 transition-colors duration-300"
                onClick={() => {
                  setShowOtpModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}</>
  )
}

export default page