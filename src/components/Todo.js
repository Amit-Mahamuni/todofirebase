import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

function Todo() {

    const [userlist, setuserlist] = useState([]);
    const [serchlist, setserchlist] = useState([]);
    const [serchtxt, setserchtxt] = useState({ serching: false, value: "" });
    const [selectItem, setselectItem] = useState({ selected: false, data: {} });

    function addToList(e) {
        if (selectItem.selected) {
            let temp = userlist
            temp = temp.filter(item => item.id !== selectItem.data.id)
            setuserlist([...temp,
            {
                id: selectItem.id,
                title: e.target[0].value,
                detail: e.target[1].value
            }]);
            setselectItem({ selected: false, data: {} })
        } else {
            setuserlist([...userlist,
            {
                id: userlist.length++,
                title: e.target[0].value,
                detail: e.target[1].value
            }]);
        }
        document.getElementById("todofrm").reset();
        e.preventDefault();
    }

    function updateItem(i) {
        let temp = userlist.filter(item => item.id === i)[0];
        document.getElementById("itemTitle").value = temp.title;
        document.getElementById("itemDetail").value = temp.detail;
        setselectItem({ selected: true, data: temp });
        console.log(selectItem)
    }

    function removeItem(i) {
        let temp = userlist
        temp = temp.filter(item => item.id !== i)
        console.log(temp)
        setuserlist(temp)
    }

    function searchList(sertxt) {
        setserchtxt({ serching: true, value: sertxt.trim() });
        let temp = userlist;
        temp = temp.filter(item => (item.title).toLowerCase().includes(sertxt.trim().toLowerCase()));
        setserchlist(temp);
    }

    function DisplayList(props) {
        return (
            props.list.length ?
                <>
                    <h6>{"Total Item: " + props.list.length}</h6>
                    <Accordion defaultActiveKey="1" className="todolistsec" flush>
                        {
                            props.list.map((item, i) =>
                                item ?
                                    <Accordion.Item eventKey={i} key={i} className="my-2">
                                        <Accordion.Header>{item.title}</Accordion.Header>
                                        <Accordion.Body>
                                            {item.detail}
                                            <hr />
                                            <div>
                                                <button type="button" className="btn btn-sm btn-outline-dark rounded-0"
                                                    onClick={() => updateItem(item.id)}>Edit</button>
                                                <button type="button" className="btn btn-sm btn-outline-dark rounded-0"
                                                    onClick={() => removeItem(item.id)}>Remove</button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    : null
                            )
                        }

                    </Accordion>
                </>
                :
                <div className="text-center">
                    <h3>{serchtxt ? "No Result Found" : "No Work to Do..!" }</h3>
                </div>

        )
    }


    return (
        <div className="container bg-white p-3 my-md-3 mianContainer">
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={addToList} id="todofrm">
                        <input type="text" placeholder="Enter todo" id="itemTitle" className="form-control my-1" required />
                        <textarea className="form-control my-1" id="itemDetail" placeholder="Enter Detail" />
                        <button type="submit" className="submitbtn btn btn-primary rounded-0">
                            {selectItem.selected ? "Update" : "Add"}</button>
                        <button type="reset" className="btn rounded-0 ms-2" onClick={() => setselectItem({ selected: false, data: {} })}>CANCLE</button>
                    </form>
                </div>
                <div className="col-md-8 ">
                    <div className="row">
                        <div className="col-12 d-flex align-item-center justify-content-between" >
                            <input type="text" placeholder="Search" className=" form-control"
                                onChange={e => searchList(e.target.value)} value={serchtxt.value} />
                            <button className="submitbtn ms-2 btn btn-dark rounded-0">Filter</button>
                        </div>
                    </div>
                    <hr />
                    <DisplayList list={serchtxt.serching ? serchlist : userlist} />
                </div>
            </div>
        </div >
    )
}

export default Todo;