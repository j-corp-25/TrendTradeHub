import React from 'react'
import { Image } from "react-bootstrap";

const Message = ({ myMessage }) => {
  return (
    <div className={`d-flex align-items-center mb-2 ${myMessage ? 'justify-content-end' : ''}`}>
      {!myMessage && (
        <Image
          src="https://via.placeholder.com/150"
          roundedCircle
          style={{ width: "3rem", height: "3rem", marginRight: "10px" }}
        />
      )}
      <div className="text-start bg-black bg-opacity-10 p-2 " style={{ width: "400px" }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam ab similique fugiat, aliquam temporibus vel quas! Deleniti architecto necessitatibus ipsa quaerat excepturi non modi, soluta iste, atque explicabo eveniet aspernatur.
      </div>
      {myMessage && (
        <Image
          src="https://via.placeholder.com/150"
          roundedCircle
          style={{ width: "3rem", height: "3rem", marginLeft: "10px" }}
        />
      )}
    </div>
  )
}

export default Message
