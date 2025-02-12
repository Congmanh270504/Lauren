import { create } from "@/app/action/toDoAction";
import Button from "@/components/own/Button";
import Form from "@/components/own/Form";
import Input from "@/components/own/Input";
import React from "react";

const page = () => {
  return (
    <Form action={create} className="w-1/2 m-auto">
      <div className="flex">
        <Input name="productName" type="text" placeholder="Add Todo..." />
        <Input name="price" type="number" placeholder="Add Todo..." />
        <Input name="categoryId" type="number" placeholder="Add Todo..." />
        <Button type="submit" text="Add" />
      </div>
    </Form>
  );
};

export default page;
