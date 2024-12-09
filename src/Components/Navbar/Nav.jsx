'use client';

import { Button, Navbar } from "flowbite-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config-file";
import { Modal } from "flowbite-react";

export default function NavbarWithCTAButton() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { allcategory } = useContext(Context);
    const [modal, setModal] = useState(false);

    function handleSignOut() {
        try {
            signOut(auth);
            localStorage.clear();
            window.location.reload();

        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    function handleSearch() {
        setModal(false);
        if (search) {
           navigate(`/search?data=${search}`)
        }
    }
    const isAdmin = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : false;
    return (
        <div>
            <Navbar
                fluid

                className="bg-red-400"
            >
                <Navbar.Brand >
                    <Link to={'/'} className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Bharat Top
                    </Link>
                </Navbar.Brand>
                <div className="flex md:order-2 mx-2">
                    <Navbar.Toggle className="bg-red-400" />
                    <svg onClick={() => setModal(true)} class="w-4 h-4 hidden md:block text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search icon</span>

                </div>
                <Navbar.Collapse>

                    {
                        allcategory && allcategory.map((item, idx) => {
                            return <Link className="font-bold" id={item.id} to={`/category/${item.name}`}>{item.name}</Link>
                        })
                    }

                    {localStorage.getItem("user") && <Navbar.Link >
                        <button onClick={handleSignOut}>
                            Logout
                        </button>
                    </Navbar.Link>}


                    <Navbar.Link href="#">
                        <div onClick={() => setModal(true)} className="flex  justify-around md:hidden">
                            <p className="text-xs text-center">Serach</p>
                        </div>
                    </Navbar.Link>

                </Navbar.Collapse>
            </Navbar>
            <Modal show={modal} onClose={() => setModal(false)}>
                <Modal.Header>Search</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSearch} >Search</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


