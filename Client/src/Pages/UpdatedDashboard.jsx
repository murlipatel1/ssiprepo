import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import { nanoid } from "nanoid";
import EditableRow from "./EditableRow";
import data from "./mock-data.json";
import SideBar from "../Elements/SideBar";
import './UpdatedDashboard.css';

const UpdatedDashboard = () => {
    const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    ID: "",
    productName: "",
    Quantity: "",
    Date: "",
    ISBN : "",
  });

  const [editFormData, setEditFormData] = useState({
    ID: "",
    productName: "",
    Quantity: "",
    Date: "",
    ISBN : ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      ID: addFormData.ID,
      productName: addFormData.productName,
      Quantity: addFormData.Quantity,
      Date: addFormData.Date,
      ISBN : addFormData.ISBN
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      ID : editFormData.ID,
      productName: editFormData.productName,
      Quantity: editFormData.Quantity,
      Date: editFormData.Date,
      ISBN: editFormData.ISBN,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      ID: contact.ID,
      productName: contact.productName,
      Quantity: contact.Quantity,
      Date: contact.Date,
      ISBN : contact.ISBN
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <>
    <SideBar />
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Product ID </th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>ISBN Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add an Product</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="ID"
          required="required"
          placeholder="Enter a Product ID"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="productName"
          required="required"
          placeholder="Enter an Product Name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="Quantity"
          required="required"
          placeholder="Enter a Quantity"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="Date"
          required="required"
          placeholder="Enter an Date"
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="ISBN"
          required="required"
          placeholder="Enter ISBN Number"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    </>
    );
}
export default UpdatedDashboard;