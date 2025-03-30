"use client";
import Image from "next/image";
import React from "react";
import { pinata } from "@/utils/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import SkeletionImages from "@/components/custom/loading";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
const page = () => {
  const { data: session } = useSession();
  console.log(session, "session");
  return (
    <>
      <div>
        <Button
          onClick={() => {
            signIn("github");
          }}
        >
          login{" "}
        </Button>
      </div>
      {session ? (
        <div>
          {session.user?.name}
          {
            <Image
              src={session.user?.image!}
              alt="user"
              width={50}
              height={50}
            />
          }
        </div>
      ) : (
        <div>bbbb</div>
      )}
      : <div>bbbb</div>
    </>
  );
};

export default page;
