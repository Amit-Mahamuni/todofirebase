import React, { useState, useEffect } from "react";
import { Accordion, Badge, Dropdown, Modal } from "react-bootstrap";
import add from "../assets/images/add.png";
import filtericon from "../assets/images/filter.png";
import axios from "axios";

function Todo() {

    const [mainlist, setmainlist] = useState([]);
    const [serchlist, setserchlist] = useState([]);
    const [serchtxt, setserchtxt] = useState({ serching: false, value: "" });
    const [selectItem, setselectItem] = useState({ selected: false, data: {} });
    const [filterstate, setfilterstate] = useState({ filtering: false, data: {} });
    const [showModel, setshowModel] = useState(true);

    const test = {
        status: ["Select Priority", "Progress", "Done"],
        priority: ["Select Status", "Low", "Medium", "High"]
    }

    function getData() {
        axios({
            method: "get",
            url: "http://localhost:3001/"
        }).then((response) => {
            console.log(response.data)
            setmainlist(response.data.data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    function addToList(e) {
        let newdata = {
            title: e.target.inTitle.value,
            detail: e.target.inDetail.value,
            status: parseInt(e.target.instatus.value),
            priority: parseInt(e.target.inPriority.value),
            create_date: selectItem.selected ? selectItem.data.create_date : new Date().toISOString(),
            done_date: parseInt(e.target.instatus.value) === 2 ? new Date().toISOString() : null,
        }
        console.log(newdata)
        if (selectItem.selected) {
            setselectItem({ selected: false, data: {} });
            axios.post("http://localhost:3001/update/" + selectItem.data.id, newdata).then((response) => {
                getData()
            })
        } else {
            axios.post("http://localhost:3001/", newdata).then((response) => {
                getData()
            })
        }

        document.getElementById("todofrm").reset();
        setshowModel(false)
        e.preventDefault();
    }

    function updateItem(i) {
        setshowModel(true);
        let temp = mainlist.filter(item => item.id === i)[0];
        setselectItem({ selected: true, data: temp });
        console.log(selectItem);
    }

    function setfrmVal() {
        if (selectItem.selected) {
            document.getElementById("itemTitle").value = selectItem.data.title;
            document.getElementById("itemDetail").value = selectItem.data.detail;
            document.getElementById("inPriority").value = selectItem.data.priority;
            document.getElementById("instatus").value = selectItem.data.status;
        }
    }

    function removeItem(i) {
        axios.delete("http://localhost:3001/" + i).then((response) => {
            getData();
        })
    }

    function searchList(sertxt) {
        if (mainlist.length && sertxt.trim()) {
            setserchtxt({ ...serchtxt, serching: true, value: sertxt.trim() });
            let temp = mainlist;
            temp = temp.filter(item => (item.title).toLowerCase().includes(sertxt.trim().toLowerCase()));
            setserchlist(temp);
        } else {
            setserchtxt({ ...serchtxt, serching: false, value: sertxt.trim() });
            setserchlist([]);
        }
    }

    function filtersubmitfrm(e) {
        let filterdata = {
            start_date: e.target.strdate.value,
            end_date: e.target.enddate.value,
            status: parseInt(e.target.filtstatus.value),
            priority: parseInt(e.target.filtpriority.value)
        }
        setfilterstate({ filtering: true, data: filterdata })
        console.log(filterstate);
        e.preventDefault();
    }

    function convertDate(pass_date) {
        console.log(pass_date)
        pass_date = new Date(pass_date)
        var curr_date = new Date()
        

        if ((curr_date.getDate() - pass_date.getDate()) !== 0) {
            return (curr_date.getDate() - pass_date.getDate() + " Day Ago")
        } else {
            if ((curr_date.getHours() - pass_date.getHours()) !== 0) {
                return (curr_date.getHours() - pass_date.getHours()
                    + " Hour Ago")
            } else {

                if ((
                    curr_date.getMinutes()
                    - pass_date.getMinutes()
                ) !== 0) {
                    return (
                        curr_date.getMinutes()
                        - pass_date.getMinutes()
                        + " Min Ago")
                } else {
                    return ("Just Now")
                }

            }
        }

        // if ((curr_date.getDate() - pass_date.getDate()) !== 0) {
        //     return (curr_date.getDate() - pass_date.getDate() + " Day Ago")
        // } else {
        //     if ((curr_date.getHours() - pass_date.getHours()) !== 0) {
        //         return (curr_date.getHours() - pass_date.getHours()
        //             + " Hour Ago")
        //     } else {

        //         if ((
        //             curr_date.getMinutes()
        //             - pass_date.getMinutes()
        //         ) !== 0) {
        //             return (
        //                 curr_date.getMinutes()
        //                 - pass_date.getMinutes()
        //                 + " Min Ago")
        //         } else {
        //             return ("Just Now")
        //         }

        //     }
        // }
    }

    function DisplayList(props) {
        var temp = props.list;
        temp.sort((a, b) => {
            return a.status - b.status
        });

        if (filterstate.filtering) {
            if (filterstate.data.status) {
                temp = temp.filter((a) => a.status === filterstate.data.status)
            }
            if (filterstate.data.priority) {
                temp = temp.filter((a) => a.priority === filterstate.data.priority)
            }
            if (filterstate.data.start_date) {
                temp = temp.filter((a) => a.create_date.split("T")[0] >= filterstate.data.start_date)
            }
            if (filterstate.data.end_date) {
                temp = temp.filter((a) => a.create_date.split("T")[0] <= filterstate.data.end_date)
            }
        }

        return (
            temp.length ?
                <>
                    <div className="d-flex align-items-center w-100">
                        <h6 className="w-25">{"Total Item: " + temp.length}</h6>
                        {
                            filterstate.filtering ?
                                <div className="d-flex justify-content-end w-75">
                                    {
                                        Object.entries(filterstate.data).map(([key, val], i) => {
                                            return (val ?
                                                <button key={key + "-" + i} className="btn btn-sm btn-outline-dark rounded-pill ms-2">
                                                    {(key).split("_").join(" ") + " : "}{!val.isInteger && test[key] ? test[key][val] : val}</button>
                                                : null)
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
                    <Accordion defaultActiveKey="1" className="todolistsec" flush>
                        {
                            temp.map((item, i) =>
                                item ?
                                    <Accordion.Item eventKey={i} key={i} className="my-2">
                                        <Accordion.Header>
                                            <div className="d-flex justify-content-between w-100 me-2">
                                                <span>{item.title}</span>
                                                <span>
                                                    {item.status === 2 ?
                                                        <span className="me-2" style={{ "fontSize": "14px" }}>
                                                            <span style={{ "fontSize": "10px" }}>Completed </span>
                                                            <br />{convertDate(item.done_date)}
                                                        </span>
                                                        : <span className="me-2" style={{ "fontSize": "14px" }}>
                                                            <span style={{ "fontSize": "10px" }}>Added </span>
                                                            <br />{convertDate(item.create_date)}
                                                        </span>
                                                    }
                                                    <Badge pill bg={item.status === 1 ? "info" : "success"} className="me-2">
                                                        {item.status === 1 ? "Progress" : "Done"}
                                                    </Badge>
                                                    <Badge pill bg={item.priority === 1 ? "primary" : item.priority === 2 ? "warning" : "danger"}>
                                                        {item.priority === 1 ? "Low" : item.priority === 2 ? "Medium" : "High"}
                                                    </Badge>
                                                </span>
                                            </div>

                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {item.detail}
                                            <hr />
                                            <div>
                                                <button type="button" className="btn btn-sm btn-outline-dark rounded-0 fw-bold border-dark border-2"
                                                    onClick={() => updateItem(item.id)}>Edit</button>
                                                <button type="button" className="btn btn-sm btn-outline-dark rounded-0 fw-bold border-dark border-2"
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
                    <h3>{serchtxt.serching ? "No Result Found" : "No Work to Do..!"}</h3>
                </div>

        )
    }

    return (
        <>
            <div className="container bg-white p-3 my-md-3 mianContainer">
                <div className="row">
                    <div className="col-md-12 mt-md-0 mt-2">
                        {serchlist.length || mainlist.length ?
                            <>
                                <div className="row">
                                    <div className="col-12 d-flex align-item-center justify-content-between" >
                                        <input type="text" placeholder="Search" className="form-control w-100"
                                            onChange={e => searchList(e.target.value)} value={serchtxt.value} />
                                        {/* <button className="submitbtn ms-2 btn btn-dark rounded-0"
                                            onClick={() => setshowModel(true)}>Filter</button> */}
                                        <Dropdown>
                                            <Dropdown.Toggle className="filterbtn ms-2 btn btn-light rounded-0" id="dropdown-basic">
                                                <img src={filtericon} height="20px" width="20x" alt="filter icon" />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="p-3 shadow rounded-0">
                                                <form onSubmit={filtersubmitfrm}>
                                                    <div className="d-flex">
                                                        <input type="date" name="strdate" className="form-control w-50 me-2" placeholder="Date Start" />
                                                        <input type="date" name="enddate" className="form-control w-50" placeholder="Date Start" />
                                                    </div>
                                                    <div className="d-flex my-2">
                                                        <select className="form-select form-control w-50 me-2" id="filtpriority" name="filtpriority">
                                                            <option value="0" >Select Priority</option>
                                                            <option value="1" >Low</option>
                                                            <option value="2">Medium</option>
                                                            <option value="3">High</option>
                                                        </select>
                                                        <select className="form-select form-control w-50" id="filtstatus" name="filtstatus">
                                                            <option value="0" >Select Status</option>
                                                            <option value="1" >Progress</option>
                                                            <option value="2">Done</option>
                                                        </select>
                                                    </div>
                                                    <button type="submit" className="submitbtn btn btn-primary rounded-0">
                                                        Filter</button>
                                                    <button type="reset" className="btn rounded-0 ms-2" onClick={() => setfilterstate({ filtering: false, data: {} })} >Reset</button>
                                                </form>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <hr />
                            </>
                            : null}
                        <DisplayList list={serchtxt.serching ? serchlist : mainlist} />
                    </div>
                </div>
                <button className="addflotbtn shadow btn btn-light rounded-circle border-dark border-2 p-0"
                    onClick={() => setshowModel(true)}><img src={add} alt="add icon" /></button>
                <Modal show={showModel} onHide={() => { setselectItem({ selected: false, data: {} }); setshowModel(false) }}
                    onShow={() => setfrmVal()} centered>
                    <Modal.Header closeButton>
                        <Modal.Title> {selectItem.selected ? "Update" : "Add"} Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={addToList} id="todofrm">
                            <div className="d-flex">
                                <select className="form-select form-control w-50 me-1" id="inPriority" name="inPriority">
                                    <option value="1"  >Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                </select>
                                <select className="form-select form-control w-50" id="instatus" name="instatus" hidden={selectItem.selected ? false : true} >
                                    <option value="1" >Progress</option>
                                    <option value="2">Done</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Enter Title" id="itemTitle" name="inTitle" className="form-control my-1" required />
                            <textarea className="form-control my-1" id="itemDetail" name="inDetail" placeholder="Enter Detail" />
                            <button type="submit" className="submitbtn btn btn-primary rounded-0">
                                {selectItem.selected ? "Update" : "Add"}</button>
                            <button type="reset" className="btn rounded-0 ms-2" onClick={() => setselectItem({ selected: false, data: {} })}>CANCLE</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div >
        </>
    )
}

export default Todo;