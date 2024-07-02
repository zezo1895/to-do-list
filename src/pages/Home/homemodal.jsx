import React from "react";
import Modal from "../../shared/Modal/modal";
import ReactLoading from "react-loading";

const Homemodal = ({
  close,
  add_title,
  title,
  details,
  details_input,
  add_details,
  array,
  Send_task,
  load,
}) => {
  return (
    <div>
      <Modal close={close}>
        <h3>New task</h3>
        <input
          type="text"
          placeholder="Add title"
          className="addeers-input"
          value={title}
          onChange={(eo) => {
            add_title(eo);
          }}
        />
        <div className="data-details flex">
          <input required
            type="text"
            placeholder="details"
            className="details-input"
            value={details}
            onChange={(eo) => {
              details_input(eo);
            }}
          />
          <button
            onClick={(eo) => {
              eo.preventDefault();
              add_details();
            }}
          >
            add
          </button>
        </div>
        <ul>
          {array.map((item) => {
            return (
              <>
                <li key={item}>{item}</li>
              </>
            );
          })}
        </ul>
        <button
          type="sumbit"
          onClick={(eo) => {
            eo.preventDefault();
            Send_task();
          }}
        >
          {load ? (
            <ReactLoading
              type={"bubbles"}
              color={"white"}
              height={40}
              width={40}
            />
          ) : (
            "Sumbit"
          )}
        </button>
      </Modal>
    </div>
  );
};

export default Homemodal;
