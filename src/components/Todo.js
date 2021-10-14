import React, { useState, useEffect } from "react";
import { Accordion, Badge, Dropdown } from "react-bootstrap";

function Todo() {

    const [mainlist, setmainlist] = useState([]);
    const [serchlist, setserchlist] = useState([]);
    const [serchtxt, setserchtxt] = useState({ serching: false, value: "" });
    const [selectItem, setselectItem] = useState({ selected: false, data: {} });
    const [filterstate, setfilterstate] = useState({ filtering: false, data: {} });

    const test = {
        status: ["Select Priority", "Progress", "Medium", "Done"],
        priority: ["Select Status", "Low", "Medium", "High"]
    }

    useEffect(() => {
        let temp = mainlist;
        temp.sort((a, b) => {
            return a.id - b.id
        });
        setmainlist(temp);
        console.log(temp)
    }, [mainlist])

    function addToList(e) {
        let newdata = {
            title: e.target.inTitle.value,
            detail: e.target.inDetail.value,
            status: parseInt(e.target.instatus.value),
            priority: parseInt(e.target.inPriority.value),
            create_date: selectItem.selected ? selectItem.data.create_date : new Date().toISOString(),
            done_date: e.target.instatus.value === 1 ? new Date().toISOString() : null,
        }

        if (selectItem.selected) {
            let temp = mainlist
            temp = temp.filter(item => item.id !== selectItem.data.id)
            setmainlist([...temp,
            {
                ...newdata,
                id: selectItem.data.id

            }]);
            setselectItem({ selected: false, data: {} })
        } else {
            setmainlist([...mainlist,
            {
                ...newdata,
                id: mainlist.length ? mainlist.length + 1 : 1
            }]);
        }

        document.getElementById("todofrm").reset();
        e.preventDefault();
    }

    function updateItem(i) {
        let temp = mainlist.filter(item => item.id === i)[0];
        document.getElementById("itemTitle").value = temp.title;
        document.getElementById("itemDetail").value = temp.detail;
        document.getElementById("inPriority").value = temp.priority;
        document.getElementById("instatus").value = temp.status;
        setselectItem({ selected: true, data: temp });
        console.log(selectItem)
    }

    function removeItem(i) {
        let temp = mainlist
        temp = temp.filter(item => item.id !== i)
        console.log(temp)
        setmainlist(temp)
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
                    <div className="col-md-4">
                        <form onSubmit={addToList} id="todofrm">
                            <div class="d-flex">
                                <select class="form-select form-control w-50 me-1" id="inPriority" name="inPriority">
                                    <option value="1" selected >Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                </select>
                                <select class="form-select form-control w-50" id="instatus" name="instatus" hidden={selectItem.selected ? false : true} >
                                    <option value="1" selected>Progress</option>
                                    <option value="2">Done</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Enter todo" id="itemTitle" name="inTitle" className="form-control my-1" required />
                            <textarea className="form-control my-1" id="itemDetail" name="inDetail" placeholder="Enter Detail" />
                            <button type="submit" className="submitbtn btn btn-primary rounded-0">
                                {selectItem.selected ? "Update" : "Add"}</button>
                            <button type="reset" className="btn rounded-0 ms-2" onClick={() => setselectItem({ selected: false, data: {} })}>CANCLE</button>
                        </form>
                    </div>
                    <div className="col-md-8 mt-md-0 mt-2">
                        {serchlist.length || mainlist.length ?
                            <>
                                <div className="row">
                                    <div className="col-12 d-flex align-item-center justify-content-between" >
                                        <input type="text" placeholder="Search" className="form-control w-100"
                                            onChange={e => searchList(e.target.value)} value={serchtxt.value} />
                                        {/* <button className="submitbtn ms-2 btn btn-dark rounded-0"
                                            onClick={() => setshowModel(true)}>Filter</button> */}
                                        <Dropdown>
                                            <Dropdown.Toggle className="submitbtn ms-2 btn btn-dark rounded-0" id="dropdown-basic">
                                                Filter
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="p-3 shadow rounded-0">
                                                <form onSubmit={filtersubmitfrm}>
                                                    <div className="d-flex">
                                                        <input type="date" name="strdate" className="form-control w-50 me-2" placeholder="Date Start" />
                                                        <input type="date" name="enddate" className="form-control w-50" placeholder="Date Start" />
                                                    </div>
                                                    <div class="d-flex my-2">
                                                        <select class="form-select form-control w-50 me-2" id="filtpriority" name="filtpriority">
                                                            <option value="0" selected>Select Priority</option>
                                                            <option value="1" >Low</option>
                                                            <option value="2">Medium</option>
                                                            <option value="3">High</option>
                                                        </select>
                                                        <select class="form-select form-control w-50" id="filtstatus" name="filtstatus">
                                                            <option value="0" selected>Select Status</option>
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
            </div >
        </>
    )
}

export default Todo;