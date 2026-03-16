"use client";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
export default function Lab4() {
  function sayHello() {
    alert("hello!");
  }
  return (
    <div>
      <h2> Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
    </div>
  );
}
