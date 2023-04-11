import React, { useEffect, useState } from "react";

import { BsCurrencyRupee } from "react-icons/bs"



const Crud = () => {

    const [product, setProduct] = useState([]);
    const [pname, setPname] = useState("");
    const [fprice, setFprice] = useState("");
    const [dprice, setDprice] = useState("");
    const [dis, setDis] = useState("");
    const [pic, setPic] = useState("");
    const [id, setId] = useState(null)
    const [btn, setBtn] = useState(true);
    const [formheding, setFormheding] = useState("Product Add Form")

    const showData = () => {



        const url = "https://641de2980596099ce156c24d.mockapi.io/crud"

        const promise = fetch(url)

        promise.then((res) =>
            res.json()).then((data) =>
                setProduct(data)).catch((error) =>
                    console.log(error))
    }

    useEffect(() => { showData(); }, [])

    const AddProduct = () => {
        const obj = {
            pname: pname,
            fprice: fprice,
            dprice: dprice,
            dis: dis,
            pic: pic
        }



        if (obj.pname && obj.fprice && obj.dprice && obj.dis && obj.pic) {

            const url = "https://641de2980596099ce156c24d.mockapi.io/crud/"

            const promise = fetch(url, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(obj)
            }).then((res) =>
                res.json).then((data) =>
                    alert("Data Adding Successfully !"),
                    setInterval(function () { window.location.reload() }, 5000)
                ).catch((error) =>
                    console.log(error))


        }
        else {
            alert("Please Fill All Fields !")
        }
    }

    function DeleteProduct(id) {


        const confirmBox = window.confirm("Are You Sure We want to delete data ?")

        if (confirmBox == true) {

            const url = "https://641de2980596099ce156c24d.mockapi.io/crud/" + id

            const promise = fetch(url, {
                headers: { "Content-Type": "application/json" },
                method: "DELETE"
            }).then((res) => {
                if (res.ok) {
                    alert("Delete Successfully !");
                    window.location.reload();
                }
            })

        }

    }

    function EditProduct(id) {

        alert("Card Data is sending in Update Form !")

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        const comingData = product[id - 1]
        setPname(comingData.pname)
        setFprice(comingData.fprice)
        setDprice(comingData.dprice)
        setDis(comingData.dis)
        setPic(comingData.pic)

        setId(id)
        setBtn(false)

        if (formheding == "Product Add Form") {
            setFormheding("Product Update Form")
        } else {
            setFormheding("Product Add Form")
        }
    }

    function UpdateProduct() {
        const obj = {
            pname: pname,
            fprice: fprice,
            dprice: dprice,
            dis: dis,
            pic: pic,
            id: id
        }

        const url = "https://641de2980596099ce156c24d.mockapi.io/crud/" + id

        const promise = fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(obj)
        }).then((res) =>
            res.json).then((data) =>
                console.log(data), alert("Data Updating Successfully !"), window.location.reload()).catch((error) =>
                    console.log(error))
    }

    return (

        <>
            <div className="container-fluid">
                <div className="row">

                    {/* start form code */}


                    <div className="col-sm-4 p-5">
                        <div className="border rounded-4 p-4">
                            <h2 className="text-center fw-bold text-success">{formheding}</h2><hr className="mb-5" />
                            Product Name : <input type="text" value={pname} className="form-control" onChange={(event) => setPname(event.target.value)} /><br />
                            Before Discount Price : <input type="text" value={fprice} className="form-control" onChange={(event) => setFprice(event.target.value)} /><br />
                            After Discount Price : <input type="text" value={dprice} className="form-control" onChange={(event) => setDprice(event.target.value)} /><br />
                            Product Description : <textarea type="text" value={dis} className="form-control" onChange={(event) => setDis(event.target.value)} ></textarea><br />
                            Product Image URL : <input type="text" value={pic} className="form-control" onChange={(event) => setPic(event.target.value)} /><br />


                            <center>
                                {
                                    btn ? <button className="btn btn-success fw-bold form-control w-50 " onClick={AddProduct} >Add Product</button> : <button className="btn btn-outline-success fw-bold form-control w-50" onClick={UpdateProduct} >Update Product</button>
                                }
                            </center>



                        </div>
                    </div>


                    {/* end card code */}


                    {/* start card code */}

                    <div className="col-sm-8 p-5">
                        <h1 className="text-center text-success fw-bold mb-5">Card Data is Coming Api</h1>
                        {
                            product.map((data) =>

                                <div className="card mb-3 p-3" style={{ width: "100%" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={data.pic} className="img-fluid rounded-start" style={{ height: "100%" }} alt="..." />
                                        </div>
                                        <div className="col-md-8 ">
                                            <div className="card-body px-5 ">
                                                <h1 className="card-title border-bottom fw-bold ">{data.pname}</h1>
                                                <p className="fs-4 fw-bold text-danger">
                                                    <span className="fs-3 fw-bold text-dark"><BsCurrencyRupee /></span> {data.dprice}/-
                                                    <s className="ms-4 fs-6 text-secondary ">
                                                        <span className="fw-bold "><BsCurrencyRupee /></span> {data.fprice}/- </s>
                                                </p>
                                                <p className="card-text">{data.dis}</p>

                                                <button className="btn btn-danger w-25" onClick={() => DeleteProduct(data.id)} >Delete</button>
                                                <button className="btn btn-warning ms-5 w-25 text-white" onClick={() => EditProduct(data.id)} >Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            )

                        }

                    </div>

                    {/* end card code */}

                </div>
            </div>
        </>
    );
}

export default Crud;