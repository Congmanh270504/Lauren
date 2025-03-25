import Image from "next/image";
import React from "react";
import { pinata } from "@/utils/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { fetchProductImage } from "@/app/state/images/images";
const page = async () => {
  // // const files = await pinata.files.list().name("aaa");

  // // console.log(files);
  // const url = await pinata.gateways.private
  //   .createAccessLink({
  //     cid: "bafybeic72jidc5ucixab2kyytjqcqb74vlwheayfp6uoyqbho6gbvntiyq",
  //     expires: 30,
  //   })
 const { data, contentType } = await pinata.gateways.private.get(
   "bafkreig5tt5s3jmvn22gk6avgf52bympvakc22v7tdmewajph65czwesnu"
 );
  console.log(data);


  return (
    <div>
      <Image src={"/1.jpg"} alt="fdasfas" fill />
    </div>
  );
};

export default page;
