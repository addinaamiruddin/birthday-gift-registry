import React, { useState, useEffect } from "react";
import "./Cards.css";
import { db } from "./firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";

function Cards() {
  const [item, setItem] = useState({ name: "", price: 0, link: "" });
  const [items, setItems] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  //create
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      item: {
        name: item.name,
        price: item.price,
        link: item.link,
        uuid: uuid,
      },
    });
    setItem({ name: "", price: 0, link: "" });
  };

  // read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setItems([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setItems((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);

  // update
  const handleEdit = (item) => {
    setIsEdit(true);
    setTempUuid(item.uuid);
    setItem({
      name: item.item.name,
      price: item.item.price,
      link: item.item.link,
    });
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      item: {
        name: item.name,
        price: item.price,
        link: item.link,
        uuid: tempUuid,
      },
    });

    setItem({ name: "", price: 0, link: "" });
    setIsEdit(false);
  };

  //delete
  const handleDelete = (item) => {
    remove(ref(db, `/${item.uuid}`));
  };

  return (
    <div className="cards">
      <h1>Dina's 22nd Wishlist</h1>
      <div className="cards__container">
        <div className="cards__input">
          <input
            type="text"
            value={item.name}
            onChange={handleInputChange}
            placeholder="Item Name"
            name="name"
          />
          <input
            type="number"
            value={item.price}
            onChange={handleInputChange}
            placeholder="Item Price"
            name="price"
          />
          <input
            type="text"
            value={item.link}
            onChange={handleInputChange}
            placeholder="Item Link"
            name="link"
          />
          {isEdit ? (
            <>
              <button onClick={handleSubmitChange}>submit change</button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setItem({ name: "", price: 0, link: "" });
                }}
              >
                X
              </button>
            </>
          ) : (
            <button onClick={writeToDatabase}>Add Item</button>
          )}
        </div>
        <div className="cards__wrapper">
          <ul className="cards__items">
            {items.map((item) => (
              // <CardItem
              //   // key={item.uuid}
              //   item={item}
              //   onDelete={() => handleDelete(item)}
              //   onEdit={() => handleEdit(item)}
              // />
              <li className="cards__item" key={item.item.uuid}>
                <div className="cards__item__info">
                  <h5 className="cards__item__text">Name : {item.item.name}</h5>
                  <p className="cards__item__text">
                    Price : RM{item.item.price}
                  </p>
                  <a href={item.item.link} className="cards__item__link">
                    Buy Here
                  </a>
                </div>
                <button
                  className="btn--primary btn--medium"
                  onClick={() => handleEdit(item.item)}
                >
                  Edit
                </button>
                <button
                  className="btn--primary btn--medium"
                  onClick={() => handleDelete(item.item)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
