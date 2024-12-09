import { createContext, useEffect, useState } from "react";
import { collapseToast, toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/Config-file";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, startAfter, updateDoc, where } from "firebase/firestore";
import { database } from "../Firebase/Config-file";
import { useNavigate } from "react-router-dom";

export const Context = createContext();




export default function MyContextWraper({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [allcategory, setCategory] = useState([]);
    const [lastDoc, setDoc] = useState(null);
    const [allPost, setPost] = useState(null);
    const [dailyThought, setThought] = useState([]);
    const [carsoleNews, setCarsolNews] = useState(null);
    const [searchNewsLastDoc, setSearchNewsLastDoc] = useState(null);
    const [infocusNews, setInfocus] = useState(null);
    const [searchText, setSearchText] = useState('');
    async function signInWithGoogle() {
        setLoading(true);
        try {
            //first we register user;
            const user = await signInWithPopup(auth, provider);
            const userObj = {
                userId: user.user.uid,
                email: user.user.email,
                name: user.user.displayName,
                role: false
            }
            const userCollection = collection(database, "users");
            const q = query(userCollection, where("userId", "==", user.user.uid));
            const data = await getDocs(q);
            if (data.docs.length == 0) {
                //that means user is new;
                await addDoc(userCollection, userObj);
            }
            else {
                const userRole = data.docs[0].data().role;
                userObj.role = userRole;
            }
            localStorage.setItem("user", JSON.stringify(userObj));
            toast.success("User Logged In");
            setTimeout(() => {
                navigate("/")
            }, 1000)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Something  Went Wrong");
        }
        setLoading(false);
    }
    async function addCategory(name) {
        setLoading(true);
        try {
            const collectionRef = collection(database, "category");
            const obj = { name, time: serverTimestamp() };
            await addDoc(collectionRef, obj);
            toast.success("Added");
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
        setLoading(false);
    }
    async function getAllCategory() {
        setLoading(true);
        try {
            const collectionRef = collection(database, "category");
            const q = query(collectionRef, orderBy("time", "asc"));
            const data = await getDocs(q);
            setCategory(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));

        } catch (error) {
            toast.error("Something Weng Wrong");
        }
        setLoading(false);
    }
    async function deleteCategory(id) {
        setLoading(true);
        try {
            const collectionRef = doc(database, "category", id);
            await deleteDoc(collectionRef);
            toast.success("Succes");
        } catch (error) {
            toast.error("Something Went Wrong");
        }
        setLoading(false);
    }
    async function addPost(post) {
        setLoading(true);
        try {
            const collectionRef = collection(database, "posts");
            await addDoc(collectionRef, post);
            toast.success("Post Added Succesful");
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
        }
        setLoading(false);
    }
    async function getAllPosts() {
        setLoading(true);
        const resultPerPage = 8;
        try {
            if (lastDoc == null) {
                //means first time data;
                const ref = collection(database, "posts");
                const q = query(ref, where("approved", "==", true), orderBy("time", "desc"), limit(resultPerPage));
                const data = await getDocs(q);
                const last = data.docs[data.docs.length - 1];
                setDoc(last);
                setPost(data.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                }))
            }
            else {
                const ref = collection(database, "posts");
                const q = query(ref, where("approved", "==", true), orderBy("time", "desc"), startAfter(lastDoc), limit(resultPerPage));
                const data = await getDocs(q);
                const last = data.docs[data.docs.length - 1];
                setDoc(last);
                const nextPosts = data.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
                setPost([...allPost, ...nextPosts]);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
        setLoading(false);
    }
    async function addDailyThought(para) {
        setLoading(true);
        try {
            const collectionRef = collection(database, "thought");
            const obj = { name: para };
            obj.time = serverTimestamp();
            await addDoc(collectionRef, obj);
            toast.success("Added");
        } catch (error) {
            toast.success("Something Went Wrong");
        }
        setLoading(false);
    }
    async function createMessage(obj) {
        obj.time = serverTimestamp();
        setLoading(true);
        try {
            const collectionRef = collection(database, "messages");
            await addDoc(collectionRef, obj);
            toast.success("Succes");

        } catch (error) {
            toast.error("Something Went Wrong");
        }
        setLoading(false);
    }
    async function subscribeToEmail(email) {
        setLoading(true);
        try {
            const obj = { email };
            obj.time = serverTimestamp();
            const collectionRef = collection(database, "emails");
            await addDoc(collectionRef, obj);
            toast.success("Succesfully Subscribed");
        } catch (error) {
            toast.error("Something Went Wrong");
        }
        setLoading(false);

    }
    async function carsoleTopFiveNews() {
        setLoading(true);
        try {
            const collectionRef = collection(database, "posts");
            const q = query(collectionRef, limit(5));
            const data = await getDocs(q);
            const postData = data.docs.map((item) => {
                return { ...item.data(), id: item.id };
            })
            setCarsolNews(postData);

        } catch (error) {
            toast.error("Something Went Wrong");
        }
        setLoading(false);
    }
    // async function searchWithTags() {
    //     console.log(searchText);
    //     setLoading(true);
    //     try {
    //         if (searchNewsLastDoc == null) {
    //             const collectionRef = collection(database, "posts");
    //             const q = query(collectionRef, where("tags", "array-contains-any", searchText.split(" ")), limit(8), orderBy("time", "desc"));
    //             const data = await getDocs(q);
    //             setSearchNewsLastDoc(data.docs[data.docs.length - 1]);
    //             console.log(data);
    //             const posts = data.docs.map((item) => {
    //                 return { ...item.data(), id: item.id };
    //             })
    //             console.log(posts);
    //             setNews(posts);
    //         }
    //         else {
    //             const collectionRef = collection(database, "posts");
    //             const q = query(collectionRef, where("tags", "array-contains-any", searchText.split(' ')), orderBy("time", "desc"), startAfter(searchNewsLastDoc), limit(8));
    //             const data = await getDocs(q);
    //             console.log(data);
    //             setSearchNewsLastDoc(data.docs[data.docs.length - 1]);
    //             const posts = data.docs.map((item) => {
    //                 return { ...item.data(), id: item.id };
    //             })

    //             setNews((pre) => {
    //                 return [...pre, ...posts];
    //             })
    //         }



    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Something Went Wrong");
    //     }
    //     setLoading(false);
    // }
    async function approveNews(newId) {
        setLoading(true);
        try {
            const docRef = doc(database, "posts", newId);
            await updateDoc(docRef, { approved: true, time: serverTimestamp() });
            toast.success("News Approved");
            window.location.reload();
        } catch (error) {
            toast.error("Error Occured");
        }
        setLoading(false);
    }
    async function handleUpdateNews({ data, newsId }) {
        console.log(data);
        setLoading(true);
        try {
            const docRef = doc(database, "posts", newsId);
            await updateDoc(docRef, data);
            toast.success("news Updatted Succes");
            window.location.reload();


        } catch (error) {
            console.log(error)
            toast.error("Error Occured");
        }
        setLoading(false);


    }
    async function deleteNews(newsId) {
        setLoading(true);
        try {
            const docRef = doc(database, "posts", newsId);
            await deleteDoc(docRef);
            toast.success("Doc Deleted Succesfull");
            setTimeout(() => {
                navigate("/");
                
            }, 500);

        } catch (error) {
            toast.error("Error Occured");
        }
        setLoading(false);
    }

    async function inFocusNews() {
        setLoading(true);
        try {
            const collectionRef = collection(database, "posts");
            const q = query(collectionRef, orderBy("time", "desc"), where("tags", "array-contains", "infocus"), limit(3));
            const data = await getDocs(q);
            const p = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            })
            setInfocus(p);

        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");

        }
        setLoading(false);
    }
    useEffect(() => {
        getAllCategory();
        getAllPosts();
        carsoleTopFiveNews()
        inFocusNews()

    }, [])
    return (<Context.Provider
        value={{
            deleteNews,
            handleUpdateNews,
            approveNews,
            loading,
            setLoading,
            signInWithGoogle,
            addCategory,
            allcategory,
            deleteCategory,
            addPost,
            allPost,
            getAllPosts,
            addDailyThought,
            createMessage,
            subscribeToEmail,
            carsoleNews,
            infocusNews,
        }}
    >
        {children}
    </Context.Provider>)
}